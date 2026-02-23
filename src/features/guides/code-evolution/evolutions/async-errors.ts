import type { Evolution } from "../types";

export const ASYNC_ERRORS: Evolution = {
  id: "async-errors",
  language: "tsx",
  steps: [
    {
      id: "e1",
      commitMessage: "feat: fetch and display user list",
      branch: "feature/user-list",
      level: "bad",
      highlights: [4, 5, 6, 7],
      metrics: [
        { before: "17", after: "17", improved: false },
        { before: "0/10", after: "0/10", improved: false },
        { before: "3/10", after: "3/10", improved: false },
      ],
      code: `function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
  }, [])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`,
    },
    {
      id: "e2",
      commitMessage: "fix: add loading and error states",
      branch: "fix/error-handling",
      level: "better",
      highlights: [7, 8, 11, 13, 15],
      metrics: [
        { before: "17", after: "32", improved: false },
        { before: "0/10", after: "7/10", improved: true },
        { before: "3/10", after: "5/10", improved: true },
      ],
      code: `function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/users')
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        setUsers(await res.json())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <Spinner />
  if (error) return <p>Erro: {error}</p>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`,
    },
    {
      id: "e3",
      commitMessage: "refactor: use React Query",
      branch: "refactor/react-query",
      level: "good",
      highlights: [1, 3, 10, 11, 13],
      metrics: [
        { before: "32", after: "26", improved: true },
        { before: "7/10", after: "9/10", improved: true },
        { before: "5/10", after: "8/10", improved: true },
      ],
      code: `import { useQuery } from '@tanstack/react-query'

const fetchUsers = async () => {
  const res = await fetch('/api/users')
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json()
}

function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    retry: 2,
  })

  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`,
    },
    {
      id: "e4",
      commitMessage: "refactor: declarative Suspense + ErrorBoundary",
      branch: "main",
      level: "great",
      highlights: [1, 2, 3, 12, 27, 29],
      metrics: [
        { before: "26", after: "35", improved: false },
        { before: "9/10", after: "10/10", improved: true },
        { before: "8/10", after: "10/10", improved: true },
      ],
      code: `import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const fetchUsers = () =>
  fetch('/api/users').then(r => {
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`)
    return r.json()
  })

function UserList() {
  const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// Loading e erros declarativos — fora da lógica de negócio
function UsersPage() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<Spinner />}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  )
}`,
    },
  ],
};
