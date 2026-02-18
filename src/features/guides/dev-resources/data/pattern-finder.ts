import type { DevLevel } from "./types";

export interface PatternScenario {
  id: string;
  level: DevLevel;
  icon: string;
  code: string;
}

export const patternScenarios: PatternScenario[] = [
  {
    id: "share-state",
    level: "junior",
    icon: "Share2",
    code: `const ThemeContext = createContext<'light' | 'dark'>('light')

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  )
}

function DeepNestedButton() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Toggle</button>
}`,
  },
  {
    id: "prevent-rerender",
    level: "pleno",
    icon: "Zap",
    code: `const ExpensiveList = memo(function ExpensiveList({
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

function Parent() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = useMemo(
    () => items.filter(i => i.name.includes(query)),
    [items, query]
  )

  const handleSelect = useCallback(
    (id: string) => setSelected(id),
    []
  )

  return (
    <>
      <input onChange={e => setQuery(e.target.value)} />
      <ExpensiveList items={filtered} onSelect={handleSelect} />
    </>
  )
}`,
  },
  {
    id: "form-validation",
    level: "pleno",
    icon: "ClipboardCheck",
    code: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+'),
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
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}`,
  },
  {
    id: "async-state",
    level: "pleno",
    icon: "RefreshCw",
    code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />

  return <div>{user.name}</div>
}

function UpdateButton({ userId }: { userId: string }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: UpdateData) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
  })

  return (
    <button
      onClick={() => mutation.mutate({ name: 'New Name' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Saving...' : 'Update'}
    </button>
  )
}`,
  },
  {
    id: "type-narrowing",
    level: "senior",
    icon: "Shield",
    code: `type ApiResponse =
  | { status: 'success'; data: User; timestamp: number }
  | { status: 'error'; message: string; code: number }
  | { status: 'loading' }

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case 'success':
      console.log(response.data.name)
      console.log(response.timestamp)
      break

    case 'error':
      if (response.code === 401) redirectToLogin()
      showError(response.message)
      break

    case 'loading':
      showSpinner()
      break
  }
}

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
  },
  {
    id: "render-optimization",
    level: "senior",
    icon: "List",
    code: `import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 5,
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
}`,
  },
  {
    id: "conditional-style",
    level: "junior",
    icon: "Paintbrush",
    code: `import { cn } from '@/lib/utils'

function Button({ isActive, className, ...props }) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

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
)`,
  },
  {
    id: "fetch-data",
    level: "junior",
    icon: "Download",
    code: `// Client Component with useEffect
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

    return () => controller.abort()
  }, [])

  if (loading) return <Skeleton />
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}

// Server Component (Next.js) — preferred
async function UserList() {
  const users = await fetch('https://api.example.com/users')
    .then(res => res.json())

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}`,
  },
  {
    id: "error-recovery",
    level: "senior",
    icon: "ShieldAlert",
    code: `'use client'
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

function ErrorFallback({ error, onRetry }) {
  return (
    <div role="alert" className="rounded-lg border p-6 text-center">
      <h3 className="text-lg font-semibold">Something went wrong</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message}
      </p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm"
      >
        Try again
      </button>
    </div>
  )
}

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
    </div>
  )
}`,
  },
];
