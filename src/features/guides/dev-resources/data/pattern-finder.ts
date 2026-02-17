import type { DevLevel } from "./types";

export interface PatternScenario {
  id: string;
  question: string;
  level: DevLevel;
  icon: string;
  pattern: string;
  explanation: string;
  code: string;
  when: string[];
  avoid: string[];
}

export const patternScenarios: PatternScenario[] = [
  {
    id: "share-state",
    question: "Preciso compartilhar estado entre componentes distantes",
    level: "junior",
    icon: "Share2",
    pattern: "Context API + useContext",
    explanation:
      "Context é a forma nativa do React de evitar prop drilling. Crie um Provider no nível mais alto necessário e consuma com useContext nos componentes que precisam.",
    code: `// 1. Crie o context
const ThemeContext = createContext<'light' | 'dark'>('light')

// 2. Provider no layout
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  )
}

// 3. Consuma onde precisar — sem prop drilling
function DeepNestedButton() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Toggle</button>
}`,
    when: [
      "Tema, idioma, auth — dados usados em muitos componentes",
      "Evitar passar props por 3+ níveis",
      "Estado que muda pouco (baixa frequência de update)",
    ],
    avoid: [
      "Estado que muda a cada keystroke (causa re-render em todos consumers)",
      "Dados que só 1-2 componentes usam (prop normal basta)",
    ],
  },
  {
    id: "prevent-rerender",
    question: "Meu componente re-renderiza demais e a UI está lenta",
    level: "pleno",
    icon: "Zap",
    pattern: "React.memo + useMemo + useCallback",
    explanation:
      "React re-renderiza um componente quando seu pai re-renderiza. memo() pula o re-render se as props não mudaram. useMemo e useCallback estabilizam valores e funções para que memo funcione.",
    code: `// Componente pesado que não precisa re-renderizar sempre
const ExpensiveList = memo(function ExpensiveList({
  items,
  onSelect,
}: {
  items: Item[]
  onSelect: (id: string) => void
}) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
})

// No pai — estabilize as props
function Parent() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // useMemo: recalcula só quando items ou query mudam
  const filtered = useMemo(
    () => items.filter(i => i.name.includes(query)),
    [items, query]
  )

  // useCallback: referência estável da função
  const handleSelect = useCallback(
    (id: string) => setSelected(id),
    []
  )

  return (
    <>
      <input onChange={e => setQuery(e.target.value)} />
      {/* ExpensiveList só re-renderiza se filtered ou handleSelect mudam */}
      <ExpensiveList items={filtered} onSelect={handleSelect} />
    </>
  )
}`,
    when: [
      "Listas com 100+ itens que re-renderizam sem necessidade",
      "Componentes com cálculos pesados (sort, filter, transform)",
      "Componentes filhos estáveis que recebem funções como props",
    ],
    avoid: [
      "Otimizar prematuramente — meça primeiro com React DevTools Profiler",
      "memo() em componentes que SEMPRE recebem props diferentes",
      "useMemo/useCallback para valores simples (o overhead não compensa)",
    ],
  },
  {
    id: "form-validation",
    question: "Preciso validar formulários complexos com boa UX",
    level: "pleno",
    icon: "ClipboardCheck",
    pattern: "React Hook Form + Zod",
    explanation:
      "React Hook Form gerencia estado do form sem re-renders desnecessários. Zod define o schema de validação e infere o tipo TypeScript automaticamente.",
    code: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Schema = validação + tipo em um só lugar
const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Deve ter 18+ anos'),
})

type FormData = z.infer<typeof schema>

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    // data é type-safe aqui!
    await api.createUser(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}

      <button disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )
}`,
    when: [
      "Forms com 3+ campos e regras de validação",
      "Validação em tempo real (on blur/change)",
      "Forms que precisam de performance (sem re-render a cada keystroke)",
    ],
    avoid: [
      "Forms simples com 1-2 campos (useState basta)",
      "Quando não precisa de validação client-side",
    ],
  },
  {
    id: "async-state",
    question: "Preciso gerenciar estado assíncrono (loading, error, data)",
    level: "pleno",
    icon: "RefreshCw",
    pattern: "TanStack Query (React Query)",
    explanation:
      "TanStack Query gerencia todo o ciclo de vida de dados remotos: fetch, cache, revalidação, retry, optimistic updates. Elimina useState + useEffect para fetch de dados.",
    code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Buscar dados — com cache, retry e revalidação automática
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // cache por 5 min
  })

  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />

  return <div>{user.name}</div>
}

// Mutar dados — com invalidação de cache
function UpdateButton({ userId }: { userId: string }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: UpdateData) => updateUser(userId, data),
    onSuccess: () => {
      // Invalida o cache — próximo render busca dados frescos
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
  })

  return (
    <button
      onClick={() => mutation.mutate({ name: 'Novo Nome' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Salvando...' : 'Atualizar'}
    </button>
  )
}`,
    when: [
      "Qualquer fetch de API que precisa de cache e revalidação",
      "Listas com paginação, infinite scroll ou polling",
      "Mutations que precisam atualizar cache local",
    ],
    avoid: [
      "Dados estáticos que nunca mudam (importe direto ou use getStaticProps)",
      "Estado puramente client-side (form state, UI toggles)",
    ],
  },
  {
    id: "type-narrowing",
    question: "Preciso lidar com diferentes tipos de resposta de forma segura",
    level: "senior",
    icon: "Shield",
    pattern: "Discriminated Unions + Type Narrowing",
    explanation:
      "Discriminated unions usam uma propriedade literal (type, status, kind) para que o TypeScript saiba automaticamente qual variante é qual dentro de um switch/if.",
    code: `// API retorna diferentes formatos dependendo do status
type ApiResponse =
  | { status: 'success'; data: User; timestamp: number }
  | { status: 'error'; message: string; code: number }
  | { status: 'loading' }

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case 'success':
      // TypeScript sabe: response.data existe aqui
      console.log(response.data.name)
      console.log(response.timestamp)
      break

    case 'error':
      // TypeScript sabe: response.message e response.code existem
      if (response.code === 401) redirectToLogin()
      showError(response.message)
      break

    case 'loading':
      // TypeScript sabe: só status existe
      showSpinner()
      break
  }
}

// Pattern aplicado a componentes:
type ButtonProps =
  | { variant: 'button'; onClick: () => void }
  | { variant: 'link'; href: string }
  | { variant: 'submit'; form: string }

function Action(props: ButtonProps) {
  switch (props.variant) {
    case 'button':
      return <button onClick={props.onClick}>Click</button>
    case 'link':
      return <a href={props.href}>Link</a>
    case 'submit':
      return <button type="submit" form={props.form}>Submit</button>
  }
}`,
    when: [
      "Respostas de API com múltiplos formatos (success/error/loading)",
      "Componentes com variantes mutuamente exclusivas",
      "State machines (pedido: pendente → processando → concluído → cancelado)",
    ],
    avoid: [
      "Quando o tipo é simples e não tem variantes (use type guard simples)",
      "Quando todas as propriedades são sempre presentes (interface normal basta)",
    ],
  },
  {
    id: "render-optimization",
    question: "Preciso renderizar uma lista com milhares de itens",
    level: "senior",
    icon: "List",
    pattern: "Virtualização com TanStack Virtual",
    explanation:
      "Virtualização só renderiza os itens visíveis na viewport. Em vez de 10.000 DOM nodes, renderiza ~20. A diferença de performance é brutal.",
    code: `import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // altura estimada de cada item
    overscan: 5, // itens extras fora da viewport (scroll suave)
  })

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: \`translateY(\${virtualItem.start}px)\`,
              height: virtualItem.size,
              width: '100%',
            }}
          >
            <ItemCard item={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}

// 10.000 itens — renderiza só ~20 DOM nodes
// Scroll suave, memory footprint baixo
<VirtualList items={allItems} />`,
    when: [
      "Listas com 500+ itens (tabelas, feeds, logs)",
      "Quando scroll fica lento ou janky",
      "Listas com itens de altura variável (estimateSize)",
    ],
    avoid: [
      "Listas com menos de ~100 itens (overhead não compensa)",
      "Quando precisa de SEO em todos os itens (virtualização esconde do crawler)",
    ],
  },
  {
    id: "conditional-style",
    question: "Preciso aplicar estilos condicionais sem bagunçar o JSX",
    level: "junior",
    icon: "Paintbrush",
    pattern: "clsx/cn + Tailwind Variants",
    explanation:
      "A função cn() (clsx + tailwind-merge) concatena classes condicionalmente e resolve conflitos do Tailwind. É o padrão usado pelo shadcn/ui e toda a comunidade Tailwind.",
    code: `import { cn } from '@/lib/utils'

// Básico — classes condicionais
function Button({ isActive, className, ...props }) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground',
        className // permite override externo
      )}
      {...props}
    />
  )
}

// Avançado — variantes com cva()
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
      },
      size: {
        sm: 'text-[10px] px-1.5',
        md: 'text-xs px-2.5',
        lg: 'text-sm px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

type BadgeProps = VariantProps<typeof badgeVariants>

function Badge({ variant, size, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} />
}`,
    when: [
      "Qualquer componente com estilos que mudam por estado ou prop",
      "Componentes reutilizáveis que precisam aceitar className externo",
      "Sistemas de design com múltiplas variantes (button, badge, alert)",
    ],
    avoid: [
      "Estilos que nunca mudam (use classes estáticas direto)",
      "Lógica de estilo muito complexa (considere CSS Modules ou styled-components)",
    ],
  },
  {
    id: "fetch-data",
    question: "Qual a melhor forma de buscar dados em um componente?",
    level: "junior",
    icon: "Download",
    pattern: "useEffect + fetch (básico) ou Server Components (Next.js)",
    explanation:
      "Para buscar dados, use useEffect com fetch em componentes client-side, ou aproveite Server Components do Next.js para buscar no servidor sem JavaScript no client.",
    code: `// Opção 1: Client Component com useEffect
'use client'
function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/users', { signal: controller.signal })
      .then(res => res.json())
      .then(setUsers)
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err)
      })
      .finally(() => setLoading(false))

    return () => controller.abort() // cleanup!
  }, [])

  if (loading) return <Skeleton />
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}

// Opção 2: Server Component (Next.js) — PREFERÍVEL
// Sem useState, sem useEffect, sem loading state
async function UserList() {
  const users = await fetch('https://api.example.com/users')
    .then(res => res.json())

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
// Zero JavaScript no client! O HTML chega pronto.`,
    when: [
      "Qualquer componente que precisa mostrar dados de uma API",
      "Server Components: dados estáticos ou que podem ser buscados no servidor",
      "Client Components: dados que dependem de interação do usuário",
    ],
    avoid: [
      "Fetch dentro de event handlers (use para ações, não para dados iniciais)",
      "Fetch sem AbortController em useEffect (causa memory leaks)",
    ],
  },
  {
    id: "error-recovery",
    question: "Como implementar error recovery gracioso em produção?",
    level: "senior",
    icon: "ShieldAlert",
    pattern: "Error Boundaries + Suspense + Retry Pattern",
    explanation:
      "Combine Error Boundaries para catch de erros de render, Suspense para loading states, e um retry pattern para dar ao usuário a opção de tentar novamente sem recarregar a página.",
    code: `// 1. Error Boundary com retry
'use client'
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  reset = () => this.setState({ error: null })

  render() {
    if (this.state.error) {
      return this.props.fallback ?? (
        <ErrorFallback
          error={this.state.error}
          onRetry={this.reset}
        />
      )
    }
    return this.props.children
  }
}

// 2. Fallback com ação de retry
function ErrorFallback({
  error,
  onRetry,
}: {
  error: Error
  onRetry: () => void
}) {
  return (
    <div role="alert" className="rounded-lg border p-6 text-center">
      <h3 className="text-lg font-semibold">Algo deu errado</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message}
      </p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm"
      >
        Tentar novamente
      </button>
    </div>
  )
}

// 3. Uso: isole seções independentes
function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <ErrorBoundary>
        <Suspense fallback={<Skeleton />}>
          <RevenueChart />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<Skeleton />}>
          <UserStats />
        </Suspense>
      </ErrorBoundary>

      {/* Se RevenueChart quebrar, UserStats continua funcionando */}
    </div>
  )
}`,
    when: [
      "Dashboards com múltiplas seções independentes",
      "Componentes que dependem de APIs externas (podem falhar)",
      "Qualquer app em produção que precisa de resiliência",
    ],
    avoid: [
      "Erros em event handlers (Error Boundaries não capturam — use try/catch)",
      "Erros em código assíncrono fora do render (use Result pattern)",
    ],
  },
];
