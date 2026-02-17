import type { DevLevel } from "./types";

export interface Comparison {
  id: string;
  title: string;
  category: string;
  level: DevLevel;
  problem: string;
  before: {
    code: string;
    issues: string[];
  };
  after: {
    code: string;
    improvements: string[];
  };
}

export const comparisons: Comparison[] = [
  {
    id: "key-prop",
    title: "Index como Key vs Key Estável",
    category: "React Fundamentals",
    level: "junior",
    problem:
      "Usar index como key em listas causa bugs visuais silenciosos quando itens são reordenados, removidos ou inseridos",
    before: {
      code: `function TodoList({ todos, onRemove }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // ❌ index como key — React perde track dos itens
        <li key={index}>
          <input
            type="checkbox"
            defaultChecked={todo.done}
          />
          <span>{todo.text}</span>
          <button onClick={() => onRemove(index)}>
            Remover
          </button>
        </li>
      ))}
    </ul>
  )
}

// Bug: remove o item 1, mas o checkbox do item 2
// continua marcado — React reutilizou o DOM errado!
// O estado interno do input ficou "preso" no index antigo.`,
      issues: [
        "Index muda quando itens são reordenados ou removidos",
        "React reutiliza o DOM do index antigo — estado visual fica errado",
        "Checkboxes, inputs e animações quebram silenciosamente",
        "Bug aparece só em runtime — impossível pegar em code review",
      ],
    },
    after: {
      code: `function TodoList({ todos, onRemove }) {
  return (
    <ul>
      {todos.map((todo) => (
        // ✅ ID único e estável — React rastreia corretamente
        <li key={todo.id}>
          <input
            type="checkbox"
            defaultChecked={todo.done}
          />
          <span>{todo.text}</span>
          <button onClick={() => onRemove(todo.id)}>
            Remover
          </button>
        </li>
      ))}
    </ul>
  )
}

// Cada item mantém seu estado correto
// mesmo após reordenação, inserção ou remoção.
// O React sabe exatamente qual DOM pertence a qual item.

// Quando index é OK:
// • Lista estática que nunca muda
// • Lista sem estado interno nos itens
// • Lista que só adiciona no final (append-only)`,
      improvements: [
        "Key estável (id) garante rastreamento correto do DOM",
        "Checkboxes, inputs e animações preservam estado",
        "Remoção e reordenação funcionam sem bugs visuais",
        "Regra simples: se o item tem id, use como key",
      ],
    },
  },
  {
    id: "early-returns",
    title: "Conditional Rendering Limpo",
    category: "React Patterns",
    level: "junior",
    problem:
      "Ifs aninhados e ternários encadeados tornam o JSX ilegível e difícil de manter",
    before: {
      code: `function UserProfile({ user, isLoading, error }) {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">
          {error.status === 404 ? (
            <p>Usuário não encontrado</p>
          ) : error.status === 403 ? (
            <p>Sem permissão</p>
          ) : (
            <p>Erro desconhecido</p>
          )}
        </div>
      ) : user ? (
        <div>
          <h1>{user.name}</h1>
          {user.role === 'admin' ? (
            <AdminBadge />
          ) : user.role === 'mod' ? (
            <ModBadge />
          ) : null}
          {user.bio ? <p>{user.bio}</p> : null}
        </div>
      ) : null}
    </div>
  )
}`,
      issues: [
        "Ternários aninhados em 4+ níveis",
        "Difícil rastrear qual condição leva a qual resultado",
        "Adicionar um novo estado exige reescrever a árvore inteira",
        "Code review vira pesadelo — ninguém confia no diff",
      ],
    },
    after: {
      code: `function UserProfile({ user, isLoading, error }) {
  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <RoleBadge role={user.role} />
      {user.bio && <p>{user.bio}</p>}
    </div>
  )
}

function ErrorMessage({ error }: { error: ApiError }) {
  const messages: Record<number, string> = {
    404: 'Usuário não encontrado',
    403: 'Sem permissão',
  }

  return (
    <p className="text-red-500">
      {messages[error.status] ?? 'Erro desconhecido'}
    </p>
  )
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'admin') return <AdminBadge />
  if (role === 'mod') return <ModBadge />
  return null
}`,
      improvements: [
        "Early returns eliminam todo aninhamento",
        "Cada estado (loading/error/empty) tratado em 1 linha",
        "Componentes extraídos são testáveis isoladamente",
        "Adicionar novo estado = 1 linha, sem tocar no resto",
      ],
    },
  },
  {
    id: "custom-hooks",
    title: "useEffect Kitchen Sink vs Custom Hooks",
    category: "React Hooks",
    level: "pleno",
    problem:
      "Toda lógica jogada num useEffect gigante torna o componente intestável e impossível de reutilizar",
    before: {
      code: `function ProductPage({ id }: { id: string }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(\`/api/products/\${id}\`)
      .then(res => {
        if (!res.ok) throw new Error('Falhou')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)

        // Verifica favorito também aqui...
        const favs = JSON.parse(
          localStorage.getItem('favorites') || '[]'
        )
        setIsFavorite(favs.includes(id))
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const toggleFavorite = () => {
    const favs = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    )
    const next = isFavorite
      ? favs.filter(f => f !== id)
      : [...favs, id]
    localStorage.setItem('favorites', JSON.stringify(next))
    setIsFavorite(!isFavorite)
  }

  // 40+ linhas de lógica antes de qualquer JSX...
  return (/* ... */)
}`,
      issues: [
        "useEffect mistura fetch + localStorage + state — 3 responsabilidades",
        "Impossível testar o fetch separado do componente",
        "Lógica de favoritos não é reutilizável em outras páginas",
        "Componente com 60+ linhas antes do return",
      ],
    },
    after: {
      code: `// hooks/use-product.ts
function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    fetchAPI<Product>(\`/api/products/\${id}\`, {
      signal: controller.signal
    })
      .then(setProduct)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [id])

  return { product, loading, error }
}

// hooks/use-favorite.ts
function useFavorite(id: string) {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    'favorites', []
  )
  const isFavorite = favorites.includes(id)

  const toggle = () => setFavorites(
    isFavorite
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
  )

  return { isFavorite, toggle }
}

// Componente limpo — só composição
function ProductPage({ id }: { id: string }) {
  const { product, loading, error } = useProduct(id)
  const { isFavorite, toggle } = useFavorite(id)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  return (/* JSX limpo, sem lógica */)
}`,
      improvements: [
        "Cada hook tem 1 responsabilidade — testável com renderHook()",
        "useFavorite reutilizável em qualquer página",
        "AbortController previne race conditions e memory leaks",
        "Componente final tem ~10 linhas — só composição",
      ],
    },
  },
  {
    id: "error-handling",
    title: "Try/Catch Genérico vs Error Boundaries + Result Pattern",
    category: "Error Handling",
    level: "pleno",
    problem:
      "Try/catch genérico esconde erros e dificulta recovery — o usuário vê tela branca ou mensagem inútil",
    before: {
      code: `async function submitForm(data: FormData) {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const json = await res.json()
    toast.success('Salvo!')
    return json
  } catch (error) {
    // Qual erro? Network? Validação? 500?
    console.error(error)
    toast.error('Algo deu errado')
    // Sem recovery — o usuário não sabe o que fazer
  }
}

// No componente:
function Form() {
  const handleSubmit = async (data) => {
    const result = await submitForm(data)
    if (result) router.push('/success')
    // Se deu erro, nada acontece...
  }
}`,
      issues: [
        "catch genérico trata network error, 400 e 500 da mesma forma",
        "Mensagem 'Algo deu errado' não ajuda o usuário a resolver",
        "Console.error em produção — ninguém vê",
        "Sem distinction entre erro recuperável e fatal",
      ],
    },
    after: {
      code: `// lib/result.ts — Result pattern type-safe
type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E }

type ApiError =
  | { type: 'validation'; fields: Record<string, string> }
  | { type: 'unauthorized' }
  | { type: 'server'; message: string }
  | { type: 'network' }

async function submitForm(
  data: FormData
): Promise<Result<Response, ApiError>> {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (res.status === 422) {
      const body = await res.json()
      return { ok: false, error: { type: 'validation', fields: body.errors } }
    }
    if (res.status === 401) {
      return { ok: false, error: { type: 'unauthorized' } }
    }
    if (!res.ok) {
      return { ok: false, error: { type: 'server', message: res.statusText } }
    }

    return { ok: true, data: await res.json() }
  } catch {
    return { ok: false, error: { type: 'network' } }
  }
}

// No componente — cada erro tem tratamento específico
function Form() {
  const handleSubmit = async (data) => {
    const result = await submitForm(data)

    if (result.ok) {
      router.push('/success')
      return
    }

    switch (result.error.type) {
      case 'validation':
        setFieldErrors(result.error.fields)
        break
      case 'unauthorized':
        router.push('/login')
        break
      case 'network':
        toast.error('Sem conexão. Tente novamente.')
        break
      case 'server':
        toast.error('Erro no servidor. Tente em alguns minutos.')
        break
    }
  }
}`,
      improvements: [
        "Result pattern força tratamento explícito de sucesso e erro",
        "Cada tipo de erro tem recovery específico (redirect, retry, field errors)",
        "TypeScript garante que todos os tipos de erro foram tratados (exhaustive switch)",
        "Sem throw — fluxo previsível, sem surpresas em produção",
      ],
    },
  },
  {
    id: "zod-validation",
    title: "API sem Validação vs Zod Schema",
    category: "TypeScript",
    level: "senior",
    problem:
      "Confiar que a API retorna o formato correto causa crashes em produção quando o backend muda",
    before: {
      code: `// Confia cegamente no retorno da API
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  const data = await res.json()
  return data // sem nenhuma validação
}

// Em produção, o backend mudou "role" para "type"
// e adicionou "role" como número...
const user = await getUser('123')
console.log(user.role.toUpperCase())
// TypeError: Cannot read properties of undefined
// (reading 'toUpperCase')
// 💥 App crashou em produção`,
      issues: [
        "Interface TypeScript só existe em compile time — zero proteção em runtime",
        "Backend muda um campo e o frontend crashou silenciosamente",
        "Erro aparece longe da causa real (no .toUpperCase, não no fetch)",
        "Sem mensagem útil — stack trace aponta pro lugar errado",
      ],
    },
    after: {
      code: `import { z } from 'zod'

// Schema = validação runtime + tipo TypeScript
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
})

// Tipo inferido automaticamente do schema
type User = z.infer<typeof UserSchema>

async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  const data = await res.json()

  // Valida em runtime — falha aqui, não no componente
  const parsed = UserSchema.safeParse(data)

  if (!parsed.success) {
    console.error('API response inválida:', parsed.error.issues)
    throw new Error('Formato de dados inesperado')
  }

  return parsed.data // tipo seguro garantido
}

// Se o backend mudar, o erro é claro e imediato:
// "Expected 'admin' | 'user', received number at 'role'"`,
      improvements: [
        "Validação em runtime — catch no ponto exato do problema",
        "Tipo TypeScript inferido do schema — single source of truth",
        "Mensagem de erro descritiva (campo, valor esperado vs recebido)",
        "safeParse não crashou a app — você decide como tratar",
      ],
    },
  },
  {
    id: "typed-context",
    title: "Estado Espalhado vs Context Tipado",
    category: "React Patterns",
    level: "senior",
    problem:
      "useState espalhado em múltiplos componentes causa dessincronização e props drilling",
    before: {
      code: `// Estado espalhado por N componentes
function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Header
      user={user}
      theme={theme}
      setTheme={setTheme}
      notifications={notifications}
      setNotifications={setNotifications}
    />
    <Sidebar
      open={sidebarOpen}
      setOpen={setSidebarOpen}
      user={user}
      theme={theme}
    />
    <Main
      user={user}
      setUser={setUser}
      theme={theme}
      notifications={notifications}
    />
    <Footer theme={theme} />
  )
}

// Cada componente filho recebe 4-6 props
// que só repassa para componentes mais internos...`,
      issues: [
        "App component vira um 'God component' com todo o estado",
        "Props drilling em cascata — 3+ níveis de repasse",
        "Adicionar um novo estado global = mudar 10+ componentes",
        "Impossível saber quem modifica o quê — bugs de sincronização",
      ],
    },
    after: {
      code: `// contexts/app-context.tsx
type AppState = {
  user: User | null
  theme: 'light' | 'dark'
  sidebarOpen: boolean
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_SIDEBAR' }

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: Dispatch<AppAction>
} | null>(null)

function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}

// Uso — zero props drilling
function Header() {
  const { state, dispatch } = useApp()
  return (
    <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
      {state.theme}
    </button>
  )
}`,
      improvements: [
        "Estado centralizado com transições previsíveis (reducer)",
        "Componentes acessam só o que precisam — zero props drilling",
        "Actions tipadas — impossível dispatch inválido em compile time",
        "useApp() com guard — erro claro se usado fora do Provider",
      ],
    },
  },
];
