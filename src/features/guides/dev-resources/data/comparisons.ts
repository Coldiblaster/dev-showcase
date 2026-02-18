import type { DevLevel } from "./types";

export interface Comparison {
  id: string;
  level: DevLevel;
  before: { code: string };
  after: { code: string };
}

export const comparisons: Comparison[] = [
  {
    id: "key-prop",
    level: "junior",
    before: {
      code: `function TodoList({ todos, onRemove }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // ❌ index as key — React loses track of items
        <li key={index}>
          <input
            type="checkbox"
            defaultChecked={todo.done}
          />
          <span>{todo.text}</span>
          <button onClick={() => onRemove(index)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}`,
    },
    after: {
      code: `function TodoList({ todos, onRemove }) {
  return (
    <ul>
      {todos.map((todo) => (
        // ✅ Unique stable ID — React tracks correctly
        <li key={todo.id}>
          <input
            type="checkbox"
            defaultChecked={todo.done}
          />
          <span>{todo.text}</span>
          <button onClick={() => onRemove(todo.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}`,
    },
  },
  {
    id: "early-returns",
    level: "junior",
    before: {
      code: `function UserProfile({ user, isLoading, error }) {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">
          {error.status === 404 ? (
            <p>User not found</p>
          ) : error.status === 403 ? (
            <p>No permission</p>
          ) : (
            <p>Unknown error</p>
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
    404: 'User not found',
    403: 'No permission',
  }

  return (
    <p className="text-red-500">
      {messages[error.status] ?? 'Unknown error'}
    </p>
  )
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'admin') return <AdminBadge />
  if (role === 'mod') return <ModBadge />
  return null
}`,
    },
  },
  {
    id: "custom-hooks",
    level: "pleno",
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
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
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

  return (/* ... */)
}`,
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

function ProductPage({ id }: { id: string }) {
  const { product, loading, error } = useProduct(id)
  const { isFavorite, toggle } = useFavorite(id)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  return (/* clean JSX */)
}`,
    },
  },
  {
    id: "error-handling",
    level: "pleno",
    before: {
      code: `async function submitForm(data: FormData) {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const json = await res.json()
    toast.success('Saved!')
    return json
  } catch (error) {
    console.error(error)
    toast.error('Something went wrong')
  }
}

function Form() {
  const handleSubmit = async (data) => {
    const result = await submitForm(data)
    if (result) router.push('/success')
  }
}`,
    },
    after: {
      code: `type Result<T, E = Error> =
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

function Form() {
  const handleSubmit = async (data) => {
    const result = await submitForm(data)
    if (result.ok) { router.push('/success'); return }

    switch (result.error.type) {
      case 'validation': setFieldErrors(result.error.fields); break
      case 'unauthorized': router.push('/login'); break
      case 'network': toast.error('No connection. Try again.'); break
      case 'server': toast.error('Server error. Try later.'); break
    }
  }
}`,
    },
  },
  {
    id: "zod-validation",
    level: "senior",
    before: {
      code: `interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  const data = await res.json()
  return data // no validation
}

const user = await getUser('123')
console.log(user.role.toUpperCase())
// TypeError: Cannot read properties of undefined
// (reading 'toUpperCase')`,
    },
    after: {
      code: `import { z } from 'zod'

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
})

type User = z.infer<typeof UserSchema>

async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  const data = await res.json()

  const parsed = UserSchema.safeParse(data)

  if (!parsed.success) {
    console.error('Invalid API response:', parsed.error.issues)
    throw new Error('Unexpected data format')
  }

  return parsed.data
}`,
    },
  },
  {
    id: "typed-context",
    level: "senior",
    before: {
      code: `function App() {
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
}`,
    },
    after: {
      code: `type AppState = {
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

function Header() {
  const { state, dispatch } = useApp()
  return (
    <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
      {state.theme}
    </button>
  )
}`,
    },
  },
];
