// Array de comparações para BeforeAfterSection
export const comparisons = [
  {
    id: "prop-drilling",
    title: "Prop Drilling vs Context",
    category: "React Patterns",
    problem: "Componentes profundamente aninhados precisam passar props por vários níveis",
    before: {
      code: `// ❌ Prop Drilling - Ruim
function App() {
  const [user, setUser] = useState(null)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />
}

function Sidebar({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />
}

function UserMenu({ user, setUser }) {
  return <div>{user.name}</div>
}`,
      issues: [
        "Props passadas por múltiplos níveis",
        "Componentes intermediários acoplados",
        "Difícil manutenção e refatoração",
        "Código verboso e repetitivo"
      ]
    },
    after: {
      code: `// ✅ Context API - Bom
const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  )
}

function Layout() {
  return <Sidebar />
}

function Sidebar() {
  return <UserMenu />
}

function UserMenu() {
  const { user } = useContext(UserContext)
  return <div>{user.name}</div>
}`,
      improvements: [
        "Sem prop drilling",
        "Componentes desacoplados",
        "Fácil manutenção",
        "Código limpo e escalável"
      ]
    },
    metrics: {
      readability: "+40%",
      maintainability: "+60%"
    }
  },
  {
    id: "useeffect-deps",
    title: "useEffect Dependencies",
    category: "React Hooks",
    problem: "useEffect sem dependências corretas causa bugs e re-renders desnecessários",
    before: {
      code: `// ❌ Dependências incorretas
function SearchComponent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    // ⚠️ Falta 'query' nas deps!
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(setResults)
  }, []) // Array vazio = roda só 1x

  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}`,
      issues: [
        "Busca não atualiza quando query muda",
        "ESLint warning ignorado",
        "Bug difícil de debugar",
        "Comportamento inesperado"
      ]
    },
    after: {
      code: `// ✅ Dependências corretas + Debounce
function SearchComponent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery) return

    const controller = new AbortController()

    fetch(`/api/search?q=${debouncedQuery}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setResults)
      .catch(err => {
        if (err.name !== 'AbortError') throw err
      })

    return () => controller.abort()
  }, [debouncedQuery]) // ✅ Dep correta

  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}`,
      improvements: [
        "Dependências corretas",
        "Debounce para performance",
        "Cleanup com AbortController",
        "Sem race conditions"
      ]
    },
    metrics: {
      performance: "+70%",
      readability: "+30%"
    }
  },
  {
    id: "fetch-error",
    title: "Error Handling em Fetch",
    category: "API & Async",
    problem: "Fetch sem tratamento de erro adequado deixa app quebrando silenciosamente",
    before: {
      code: `// ❌ Sem error handling
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()
  return data
}

// Uso:
const user = await getUser(123)
// ⚠️ Se der erro, app quebra sem feedback`,
      issues: [
        "Não verifica se response.ok",
        "Erros HTTP não tratados",
        "Sem feedback ao usuário",
        "App pode quebrar silenciosamente"
      ]
    },
    after: {
      code: `// ✅ Com error handling robusto
async function getUser(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      )
    }
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return { 
      data: null, 
      error: error.message 
    }
  }
}

// Uso:
const { data, error } = await getUser('123')
if (error) {
  showToast('Erro ao carregar usuário')
}`,
      improvements: [
        "Verifica response.ok",
        "Try/catch para erros de rede",
        "Retorno estruturado",
        "Fácil mostrar feedback ao usuário"
      ]
    },
    metrics: {
      maintainability: "+80%",
      readability: "+50%"
    }
  },
  {
    id: "type-safety",
    title: "Type Safety com TypeScript",
    category: "TypeScript",
    problem: "Uso de 'any' remove os benefícios do TypeScript",
    before: {
      code: `// ❌ Usando 'any' - perde type safety
function processData(data: any) {
  // TypeScript não ajuda aqui
  return data.items.map((item: any) => ({
    id: item.id,
    name: item.name.toUpperCase(),
    // ⚠️ Se 'name' não existir, quebra em runtime
  }))
}

const result = processData(apiResponse)
// Sem autocomplete, sem type checking`,
      issues: [
        "Perde autocomplete do IDE",
        "Erros só em runtime",
        "Difícil refatorar",
        "Documentação implícita perdida"
      ]
    },
    after: {
      code: `// ✅ Types explícitos e seguros
interface ApiItem {
  id: string
  name: string
  email?: string
}

interface ApiResponse {
  items: ApiItem[]
  total: number
}

function processData(data: ApiResponse) {
  return data.items.map(item => ({
    id: item.id,
    name: item.name.toUpperCase(),
    // ✅ TypeScript valida tudo
  }))
}

const result = processData(apiResponse)
// Autocomplete funciona, erros em compile time`,
      improvements: [
        "Autocomplete total no IDE",
        "Erros detectados ao escrever",
        "Fácil refatorar com confiança",
        "Auto-documentação do código"
      ]
    },
    metrics: {
      maintainability: "+90%",
      readability: "+70%"
    }
  }
];