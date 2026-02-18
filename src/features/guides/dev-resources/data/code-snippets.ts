import type { DevLevel } from "./types";

export interface CodeSnippet {
  id: string;
  level: DevLevel;
  code: string;
  usage: string;
  tags: string[];
}

export const snippets: CodeSnippet[] = [
  // ── Junior ────────────────────────────────────────────────
  {
    id: "debounce",
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
      placeholder="Search..."
    />
  )
}`,
    tags: ["React", "Hooks", "Performance"],
  },
  {
    id: "format-date",
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

  if (minutes < 1) return 'now'
  if (minutes < 60) return \`\${minutes}min ago\`
  if (hours < 24) return \`\${hours}h ago\`
  if (days < 7) return \`\${days}d ago\`
  return formatDate(d)
}`,
    usage: `import { formatDate, formatRelative } from '@/lib/format-date'

formatDate(new Date())           // "16/02/2026"
formatDate('2026-01-15')         // "15/01/2026"
formatDate(new Date(), 'en-US')  // "02/16/2026"

formatRelative(new Date())                       // "now"
formatRelative(new Date(Date.now() - 300000))    // "5min ago"
formatRelative(new Date(Date.now() - 7200000))   // "2h ago"
formatRelative(new Date(Date.now() - 172800000)) // "2d ago"`,
    tags: ["Utilities", "Formatting"],
  },
  {
    id: "use-toggle",
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

function ProductCard({ product }: { product: Product }) {
  const modal = useToggle()
  const favorite = useToggle()

  return (
    <div>
      <h3>{product.name}</h3>

      <button onClick={favorite.toggle}>
        {favorite.value ? '♥' : '♡'}
      </button>

      <button onClick={modal.setTrue}>
        Details
      </button>

      <Dialog open={modal.value} onOpenChange={modal.setFalse}>
        <ProductDetails product={product} />
      </Dialog>
    </div>
  )
}`,
    tags: ["React", "Hooks", "Utilities"],
  },

  // ── Pleno ─────────────────────────────────────────────────
  {
    id: "safe-context",
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

type AuthContext = {
  user: User | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

const [AuthProvider, useAuth] = createSafeContext<AuthContext>('Auth')

function AuthLayout({ children }: { children: ReactNode }) {
  const auth = useAuthLogic()
  return <AuthProvider value={auth}>{children}</AuthProvider>
}

function UserMenu() {
  const { user, logout } = useAuth()
  return <button onClick={logout}>{user?.name}</button>
}`,
    tags: ["React", "Context", "TypeScript"],
  },
  {
    id: "media-query",
    level: "pleno",
    code: `import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

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
        {/* content */}
      </motion.div>
    </div>
  )
}`,
    tags: ["React", "Hooks", "Responsive", "SSR"],
  },
  {
    id: "event-callback",
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

  const onMessage = useEventCallback((msg: Message) => {
    setMessages(prev => [...prev, msg])
  })

  useEffect(() => {
    const ws = connectToRoom(roomId)
    ws.on('message', onMessage)
    return () => ws.disconnect()
  }, [roomId, onMessage])

  return <MessageList messages={messages} />
}`,
    tags: ["React", "Hooks", "Performance"],
  },

  // ── Senior ────────────────────────────────────────────────
  {
    id: "typed-fetch-zod",
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

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
  createdAt: z.string().datetime(),
})

type User = z.infer<typeof UserSchema>

const user = await typedFetch('/api/users/1', UserSchema)

const UserListSchema = z.array(UserSchema)

const users = await typedFetch('/api/users', UserListSchema, {
  params: { role: 'admin', limit: '10' }
})`,
    tags: ["TypeScript", "API", "Zod", "Validation"],
  },
  {
    id: "discriminated-props",
    level: "senior",
    code: `type ButtonProps = {
  children: React.ReactNode
  className?: string
} & (
  | {
      variant: 'solid' | 'outline' | 'ghost'
      onClick: () => void
      loading?: boolean
      disabled?: boolean
      href?: never
    }
  | {
      variant: 'link'
      href: string
      onClick?: never
      loading?: never
      disabled?: never
    }
)

export function Button(props: ButtonProps) {
  if (props.variant === 'link') {
    return (
      <a href={props.href} className={props.className}>
        {props.children}
      </a>
    )
  }

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
    usage: `// ✅ Valid — solid with onClick and loading
<Button variant="solid" onClick={handleSave} loading={isPending}>
  Save
</Button>

// ✅ Valid — link with href
<Button variant="link" href="/about">
  About
</Button>

// ❌ TypeScript error — link does not accept onClick
<Button variant="link" href="/about" onClick={fn}>
  About
</Button>

// ❌ TypeScript error — solid requires onClick
<Button variant="solid">
  Save
</Button>`,
    tags: ["TypeScript", "React", "Component API"],
  },
  {
    id: "type-safe-exhaustive",
    level: "senior",
    code: `function assertNever(value: never): never {
  throw new Error(\`Unhandled value: \${value}\`)
}

type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'

function getStatusConfig(status: PaymentStatus) {
  switch (status) {
    case 'pending':
      return { label: 'Pending', color: 'yellow', icon: Clock }
    case 'processing':
      return { label: 'Processing', color: 'blue', icon: Loader }
    case 'completed':
      return { label: 'Completed', color: 'green', icon: Check }
    case 'failed':
      return { label: 'Failed', color: 'red', icon: X }
    case 'refunded':
      return { label: 'Refunded', color: 'gray', icon: Undo }
    default:
      return assertNever(status)
  }
}`,
    usage: `import { assertNever } from '@/lib/assert-never'

type Theme = 'light' | 'dark' | 'system'

function getThemeIcon(theme: Theme) {
  switch (theme) {
    case 'light': return <Sun />
    case 'dark': return <Moon />
    case 'system': return <Monitor />
    default: return assertNever(theme)
  }
}

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
    tags: ["TypeScript", "Patterns", "Type Safety"],
  },
];
