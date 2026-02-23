import type { Evolution } from "../types";

export const REACT_LIFECYCLE: Evolution = {
  id: "react-lifecycle",
  language: "tsx",
  steps: [
    {
      id: "v1",
      commitMessage: "feat: add user profile component",
      branch: "feature/user-profile",
      level: "bad",
      highlights: [1, 10, 11, 20, 21],
      metrics: [
        { before: "36", after: "36", improved: false },
        { before: "4/10", after: "4/10", improved: false },
        { before: "2/10", after: "2/10", improved: false },
      ],
      code: `class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    fetch('/api/user/' + this.props.id)
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data, loading: false })
      })
      .catch(err => {
        this.setState({ error: err, loading: false })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ loading: true })
      fetch('/api/user/' + this.props.id)
        .then(res => res.json())
        .then(data => {
          this.setState({ user: data, loading: false })
        })
    }
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>
    if (this.state.error) return <p>Error!</p>
    return <div>{this.state.user.name}</div>
  }
}`,
    },
    {
      id: "v2",
      commitMessage: "refactor: migrate to functional component",
      branch: "refactor/hooks-migration",
      level: "better",
      highlights: [1, 2, 3, 4, 6],
      metrics: [
        { before: "36", after: "24", improved: true },
        { before: "4/10", after: "6/10", improved: true },
        { before: "2/10", after: "4/10", improved: false },
      ],
      code: `function UserProfile({ id }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(\`/api/user/\${id}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return <div>{user.name}</div>
}`,
    },
    {
      id: "v3",
      commitMessage: "refactor: extract custom hook",
      branch: "refactor/custom-hooks",
      level: "good",
      highlights: [1, 7, 20, 27, 28],
      metrics: [
        { before: "24", after: "34", improved: false },
        { before: "6/10", after: "9/10", improved: true },
        { before: "4/10", after: "8/10", improved: true },
      ],
      code: `function useUser(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    fetch(\`/api/user/\${id}\`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [id])

  return { data, loading, error }
}

// Componente limpo e focado
function UserProfile({ id }) {
  const { data: user, loading, error } = useUser(id)

  if (loading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />

  return <ProfileCard user={user} />
}`,
    },
    {
      id: "v4",
      commitMessage: "refactor: use SWR for data fetching",
      branch: "main",
      level: "great",
      highlights: [1, 5, 6, 9, 10],
      metrics: [
        { before: "34", after: "18", improved: true },
        { before: "9/10", after: "10/10", improved: true },
        { before: "8/10", after: "10/10", improved: true },
      ],
      code: `import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

function UserProfile({ id }) {
  const { data: user, error, isLoading } = useSWR(
    \`/api/user/\${id}\`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />

  return <ProfileCard user={user} />
}`,
    },
  ],
};
