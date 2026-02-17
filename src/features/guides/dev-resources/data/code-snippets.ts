import type { DevLevel } from "./types";

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  level: DevLevel;
  code: string;
  usage: string;
  explanation: string;
  tags: string[];
}

export const snippets: CodeSnippet[] = [
  // ── Junior ────────────────────────────────────────────────
  {
    id: "debounce",
    title: "useDebounce Hook",
    description:
      "Atrasa a atualização de um valor até o usuário parar de digitar",
    level: "junior",
    code: `import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}`,
    usage: `import { useDebounce } from '@/hooks/use-debounce'

function SearchComponent() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
    />
  )
}`,
    explanation: `**useDebounce** atrasa a atualização de um valor até que o usuário pare de digitar.

**Como funciona:**
• Recebe o valor e o delay em ms
• Usa setTimeout para atrasar a atualização
• Limpa o timer anterior a cada mudança (cleanup do useEffect)
• Retorna o valor "debounced" — só atualiza após o delay

**Quando usar:**
• Campos de busca (evita requisição a cada tecla)
• Filtros dinâmicos
• Auto-save de formulários

**Performance:** Reduz chamadas de API de ~10/s para ~2/s em digitação normal.`,
    tags: ["React", "Hooks", "Performance"],
  },
  {
    id: "format-date",
    title: "Formatador de Data (Intl API)",
    description: "Formata datas sem dependências usando a Intl API nativa",
    level: "junior",
    code: `export function formatDate(
  date: Date | string,
  locale = 'pt-BR'
): string {
  const d = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d)
}

export function formatRelative(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'agora'
  if (minutes < 60) return \`\${minutes}min atrás\`
  if (hours < 24) return \`\${hours}h atrás\`
  if (days < 7) return \`\${days}d atrás\`
  return formatDate(d)
}`,
    usage: `import { formatDate, formatRelative } from '@/lib/format-date'

// Formata data simples
formatDate(new Date())           // "16/02/2026"
formatDate('2026-01-15')         // "15/01/2026"
formatDate(new Date(), 'en-US')  // "02/16/2026"

// Formato relativo (ideal para feeds)
formatRelative(new Date())                       // "agora"
formatRelative(new Date(Date.now() - 300000))    // "5min atrás"
formatRelative(new Date(Date.now() - 7200000))   // "2h atrás"
formatRelative(new Date(Date.now() - 172800000)) // "2d atrás"`,
    explanation: `**Formatadores de data** usando a Intl API nativa — sem dependências externas.

**Vantagens da Intl API:**
• Nativa do browser — zero bundle size
• Suporte a qualquer locale automaticamente
• Funciona em Node.js e browsers modernos

**formatDate vs moment/date-fns:**
• moment.js: ~70KB (deprecated)
• date-fns: ~12KB (tree-shakeable)
• Intl API: 0KB — já está no browser!

**formatRelative — quando usar:**
• Feeds de atividade, comentários, notificações
• Qualquer timestamp que precisa ser "humano"

**Dica:** Passe o locale como parâmetro para suportar i18n.`,
    tags: ["Utilities", "Formatting"],
  },
  {
    id: "use-toggle",
    title: "useToggle Hook",
    description: "Hook para booleanos com actions nomeadas — mais legível que useState(false)",
    level: "junior",
    code: `import { useCallback, useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse } as const
}`,
    usage: `import { useToggle } from '@/hooks/use-toggle'

// Modal com ações semânticas
function ProductCard({ product }: { product: Product }) {
  const modal = useToggle()
  const favorite = useToggle()

  return (
    <div>
      <h3>{product.name}</h3>

      <button onClick={favorite.toggle}>
        {favorite.value ? '♥ Favoritado' : '♡ Favoritar'}
      </button>

      <button onClick={modal.setTrue}>
        Ver detalhes
      </button>

      <Dialog open={modal.value} onOpenChange={modal.setFalse}>
        <ProductDetails product={product} />
      </Dialog>
    </div>
  )
}

// Comparação com useState:
// const [isOpen, setIsOpen] = useState(false)
// setIsOpen(true)  vs  modal.setTrue
// setIsOpen(false) vs  modal.setFalse
// setIsOpen(v => !v) vs modal.toggle`,
    explanation: `**useToggle** substitui useState(false) com uma API mais expressiva e legível.

**Por que é melhor que useState puro:**
• \`modal.setTrue\` é mais claro que \`setIsOpen(true)\`
• \`favorite.toggle\` é mais claro que \`setFav(v => !v)\`
• Ações são useCallback — safe para passar como props
• Destructuring nomeado: \`const modal = useToggle()\`

**Quando usar:**
• Modais (open/close)
• Dropdowns e menus
• Favoritos (toggle)
• Dark mode toggle
• Qualquer estado boolean

**Pattern:** Retornar objeto em vez de array permite nomes semânticos sem desestruturação posicional.`,
    tags: ["React", "Hooks", "Utilities"],
  },

  // ── Pleno ─────────────────────────────────────────────────
  {
    id: "safe-context",
    title: "createSafeContext",
    description:
      "Cria context + hook type-safe sem precisar checar undefined",
    level: "pleno",
    code: `import {
  createContext,
  useContext,
  type ReactNode
} from 'react'

export function createSafeContext<T>(displayName: string) {
  const Context = createContext<T | null>(null)
  Context.displayName = displayName

  function useContextValue(): T {
    const value = useContext(Context)
    if (value === null) {
      throw new Error(
        \`use\${displayName} must be used within \${displayName}Provider\`
      )
    }
    return value
  }

  function Provider({
    value,
    children,
  }: {
    value: T
    children: ReactNode
  }) {
    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }

  return [Provider, useContextValue] as const
}`,
    usage: `import { createSafeContext } from '@/lib/create-safe-context'

// 1. Defina o tipo do contexto
type AuthContext = {
  user: User | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

// 2. Crie provider + hook em 1 linha
const [AuthProvider, useAuth] = createSafeContext<AuthContext>('Auth')

// 3. Use no provider (app layout)
function AuthLayout({ children }: { children: ReactNode }) {
  const auth = useAuthLogic() // seu hook de lógica
  return <AuthProvider value={auth}>{children}</AuthProvider>
}

// 4. Consuma — sem checks de null!
function UserMenu() {
  const { user, logout } = useAuth()
  //      ^-- tipo seguro, nunca null
  return <button onClick={logout}>{user?.name}</button>
}`,
    explanation: `**createSafeContext** elimina o padrão repetitivo de criar context + provider + hook com check de null.

**Problema que resolve:**
• Todo createContext<T | undefined>(undefined) exige if (!ctx) throw...
• Repetir isso em 10+ contexts = boilerplate massivo
• Fácil esquecer o check e ter runtime error

**Como funciona:**
• Cria o context com null como default
• O hook useContextValue faz o null check uma vez
• Retorna [Provider, Hook] como tupla

**Por que é melhor que o padrão manual:**
• 0 boilerplate — 1 linha cria Provider + Hook tipado
• Erro descritivo automático ("useAuth must be used within AuthProvider")
• displayName aparece no React DevTools

**Pattern usado em:** Radix UI, shadcn/ui internals, Chakra UI.`,
    tags: ["React", "Context", "TypeScript"],
  },
  {
    id: "media-query",
    title: "useMediaQuery (SSR-safe)",
    description: "Hook responsivo que funciona com SSR/Next.js sem hydration mismatch",
    level: "pleno",
    code: `import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Sync imediato (client-only)
    setMatches(media.matches)

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

// Presets prontos
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  dark: '(prefers-color-scheme: dark)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const`,
    usage: `import { useMediaQuery, breakpoints } from '@/hooks/use-media-query'

function ResponsiveLayout() {
  const isMobile = !useMediaQuery(breakpoints.md)
  const prefersReducedMotion = useMediaQuery(breakpoints.reducedMotion)

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}

      <motion.div
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3
        }}
      >
        {/* conteúdo */}
      </motion.div>
    </div>
  )
}

// Uso com query custom
function DashboardLayout() {
  const isWide = useMediaQuery('(min-width: 1400px)')
  return isWide ? <ThreeColumnLayout /> : <TwoColumnLayout />
}`,
    explanation: `**useMediaQuery** detecta media queries CSS no JavaScript — SSR-safe.

**O truque do SSR:**
• useState(false) como default — server e client começam iguais
• useEffect sincroniza com o valor real no client
• Evita hydration mismatch (o erro mais chato do Next.js)

**Por que não usar CSS @media direto?**
• Quando a lógica depende do breakpoint (mudar componente, não só estilo)
• Quando precisa do valor em JavaScript (analytics, feature flags)
• Acessibilidade: prefers-reduced-motion para desligar animações

**Presets incluídos:**
• Breakpoints do Tailwind (sm, md, lg, xl)
• Dark mode e reduced motion
• Extensível — passe qualquer media query string

**Cuidado:** Não use para esconder conteúdo visualmente — prefira CSS para isso (melhor para SEO/accessibility).`,
    tags: ["React", "Hooks", "Responsive", "SSR"],
  },
  {
    id: "event-callback",
    title: "useEventCallback",
    description:
      "Referência estável de função sem stale closures — resolve o bug mais comum de hooks",
    level: "pleno",
    code: `import { useCallback, useRef } from 'react'

export function useEventCallback<
  Args extends unknown[],
  Return
>(fn: (...args: Args) => Return): (...args: Args) => Return {
  const ref = useRef(fn)
  ref.current = fn

  return useCallback(
    (...args: Args) => ref.current(...args),
    []
  )
}`,
    usage: `import { useEventCallback } from '@/hooks/use-event-callback'

function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([])

  // SEM useEventCallback — stale closure!
  // const onMessage = useCallback((msg) => {
  //   setMessages([...messages, msg]) // 'messages' fica stale!
  // }, [messages]) // re-cria a cada mensagem = re-subscribe

  // COM useEventCallback — sempre atualizado, ref estável
  const onMessage = useEventCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]) // usa updater
  })

  useEffect(() => {
    const ws = connectToRoom(roomId)
    ws.on('message', onMessage)
    return () => ws.disconnect()
  }, [roomId, onMessage]) // onMessage nunca muda!

  return <MessageList messages={messages} />
}`,
    explanation: `**useEventCallback** retorna uma função com referência estável que sempre acessa o state mais recente.

**O problema que resolve:**
• useCallback com deps = re-cria função = re-subscribe em effects
• useCallback sem deps = stale closure = lê state antigo
• Dilema clássico que gera bugs sutis em WebSockets, timers, event listeners

**Como funciona:**
• useRef armazena a versão mais recente da função
• ref.current é atualizado a cada render (sync)
• useCallback([], ...) retorna wrapper estável que chama ref.current
• Resultado: referência estável + closure sempre fresca

**Quando usar:**
• Event handlers passados para useEffect
• Callbacks de WebSocket/SSE
• Timers de longa duração (setInterval)
• Qualquer lugar onde estabilidade + freshness importam

**Equivalente no React 19:** useEffectEvent (experimental).`,
    tags: ["React", "Hooks", "Performance"],
  },

  // ── Senior ────────────────────────────────────────────────
  {
    id: "typed-fetch-zod",
    title: "Typed Fetch + Zod Validation",
    description:
      "Fetch type-safe com validação runtime — single source of truth",
    level: "senior",
    code: `import { z, type ZodType } from 'zod'

type FetchOptions = RequestInit & {
  params?: Record<string, string>
}

export async function typedFetch<T>(
  url: string,
  schema: ZodType<T>,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options

  const queryString = params
    ? '?' + new URLSearchParams(params).toString()
    : ''

  const response = await fetch(\`\${url}\${queryString}\`, {
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  })

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
  }

  const data = await response.json()
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    console.error('API validation failed:', parsed.error.issues)
    throw new Error(
      \`Invalid API response: \${parsed.error.issues.map(i => i.message).join(', ')}\`
    )
  }

  return parsed.data
}`,
    usage: `import { typedFetch } from '@/lib/typed-fetch'
import { z } from 'zod'

// Schema = validação + tipo em um só lugar
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
  createdAt: z.string().datetime(),
})

type User = z.infer<typeof UserSchema> // tipo inferido!

// Uso — seguro em compile time E runtime
const user = await typedFetch('/api/users/1', UserSchema)
//    ^-- tipo User garantido

// Com query params
const UserListSchema = z.array(UserSchema)

const users = await typedFetch('/api/users', UserListSchema, {
  params: { role: 'admin', limit: '10' }
})

// Se o backend mudar o formato, o erro é claro:
// "Invalid API response: Expected string, received number at 'role'"`,
    explanation: `**typedFetch** combina fetch + Zod para validação em compile time E runtime.

**Por que interfaces TypeScript não bastam:**
• Interface só existe em compile time — desaparece no JavaScript
• Se o backend mudar um campo, o TypeScript não protege
• O crash aparece longe da causa real (no render, não no fetch)

**O que Zod adiciona:**
• Validação runtime — erro no ponto exato do fetch
• Tipo inferido do schema (z.infer) — single source of truth
• Mensagem descritiva: campo, valor esperado vs recebido
• safeParse não crasha — você decide como tratar

**Quando usar:**
• Qualquer fetch de API externa que você não controla
• APIs internas que mudam frequentemente
• Dados críticos (pagamento, auth, configuração)
• Integração com terceiros (webhooks, APIs públicas)

**Bundle:** Zod ~13KB gzipped — vale cada byte em produção.`,
    tags: ["TypeScript", "API", "Zod", "Validation"],
  },
  {
    id: "discriminated-props",
    title: "Discriminated Union Props",
    description:
      "Pattern TypeScript que torna props impossíveis de usar errado",
    level: "senior",
    code: `// Problema: props opcionais permitem combinações inválidas
// <Button variant="link" loading /> ← faz sentido link + loading?
// <Button href="/about" onClick={fn} /> ← href E onClick?

// Solução: Discriminated Union — cada variante define suas props
type ButtonProps = {
  children: React.ReactNode
  className?: string
} & (
  | {
      variant: 'solid' | 'outline' | 'ghost'
      onClick: () => void
      loading?: boolean
      disabled?: boolean
      href?: never // bloqueia href nessas variantes
    }
  | {
      variant: 'link'
      href: string
      onClick?: never   // bloqueia onClick em link
      loading?: never   // bloqueia loading em link
      disabled?: never  // bloqueia disabled em link
    }
)

export function Button(props: ButtonProps) {
  if (props.variant === 'link') {
    // TypeScript sabe: props.href existe, onClick não
    return (
      <a href={props.href} className={props.className}>
        {props.children}
      </a>
    )
  }

  // TypeScript sabe: props.onClick existe, href não
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      className={props.className}
    >
      {props.loading ? <Spinner /> : props.children}
    </button>
  )
}`,
    usage: `// ✅ Válido — solid com onClick e loading
<Button variant="solid" onClick={handleSave} loading={isPending}>
  Salvar
</Button>

// ✅ Válido — link com href
<Button variant="link" href="/about">
  Sobre
</Button>

// ❌ Erro TypeScript — link não aceita onClick
<Button variant="link" href="/about" onClick={fn}>
  Sobre
</Button>
// Type error: 'onClick' is incompatible with type 'never'

// ❌ Erro TypeScript — solid precisa de onClick
<Button variant="solid">
  Salvar
</Button>
// Type error: Property 'onClick' is missing

// ❌ Erro TypeScript — solid não aceita href
<Button variant="solid" onClick={fn} href="/about">
  Salvar
</Button>
// Type error: 'href' is incompatible with type 'never'`,
    explanation: `**Discriminated Union Props** usa o sistema de tipos do TypeScript para tornar combinações inválidas impossíveis.

**O problema com props opcionais:**
• variant="link" com loading={true}? Faz sentido?
• href e onClick juntos? Qual vence?
• Props opcionais permitem QUALQUER combinação — bugs silenciosos

**Como funciona:**
• Uma propriedade "discriminante" (variant) determina quais props existem
• \`never\` bloqueia props que não fazem sentido naquela variante
• TypeScript narra (type narrowing) dentro do if/switch

**Quando usar:**
• Componentes com múltiplas variantes (Button, Input, Modal)
• Props mutuamente exclusivas (href vs onClick, mode vs config)
• APIs de componentes que serão usadas por outros devs

**Resultado:** Erros aparecem no editor, não em produção. O autocomplete só mostra props válidas para a variante escolhida.`,
    tags: ["TypeScript", "React", "Component API"],
  },
  {
    id: "type-safe-exhaustive",
    title: "Exhaustive Switch Pattern",
    description:
      "Pattern que garante em compile time que todos os cases de uma union foram tratados",
    level: "senior",
    code: `// Utility — força TypeScript a reclamar se faltar case
function assertNever(value: never): never {
  throw new Error(\`Unhandled value: \${value}\`)
}

// Exemplo: status de pagamento
type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'

function getStatusConfig(status: PaymentStatus) {
  switch (status) {
    case 'pending':
      return { label: 'Pendente', color: 'yellow', icon: Clock }
    case 'processing':
      return { label: 'Processando', color: 'blue', icon: Loader }
    case 'completed':
      return { label: 'Concluído', color: 'green', icon: Check }
    case 'failed':
      return { label: 'Falhou', color: 'red', icon: X }
    case 'refunded':
      return { label: 'Reembolsado', color: 'gray', icon: Undo }
    default:
      return assertNever(status)
  }
}

// Se alguém adicionar 'cancelled' no type PaymentStatus,
// o TypeScript IMEDIATAMENTE reclama:
// Argument of type 'cancelled' is not assignable
// to parameter of type 'never'
// → Impossível esquecer de tratar um novo case!`,
    usage: `import { assertNever } from '@/lib/assert-never'

// Funciona com qualquer union type
type Theme = 'light' | 'dark' | 'system'

function getThemeIcon(theme: Theme) {
  switch (theme) {
    case 'light': return <Sun />
    case 'dark': return <Moon />
    case 'system': return <Monitor />
    default: return assertNever(theme)
  }
}

// Funciona com discriminated unions também
type Action =
  | { type: 'increment'; amount: number }
  | { type: 'decrement'; amount: number }
  | { type: 'reset' }

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment': return state + action.amount
    case 'decrement': return state - action.amount
    case 'reset': return 0
    default: return assertNever(action)
  }
}`,
    explanation: `**assertNever** é o pattern que garante cobertura completa de union types em compile time.

**O problema sem ele:**
• Adiciona um novo status/variant/action no type
• Esquece de tratar em 3 dos 5 switches do codebase
• Bug aparece só em runtime — meses depois

**Como funciona:**
• O parâmetro é do tipo \`never\`
• Se todos os cases estão cobertos, o default é unreachable = tipo \`never\` = OK
• Se faltar um case, o tipo não é \`never\` = erro em compile time

**Onde usar:**
• Reducers (useReducer, Redux)
• Status machines (pagamento, pedido, auth)
• Componentes com múltiplas variantes
• Qualquer switch sobre union types

**Pattern adotado por:** Effect-TS, fp-ts, Prisma, tRPC.`,
    tags: ["TypeScript", "Patterns", "Type Safety"],
  },
];
