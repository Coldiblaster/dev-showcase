import type { Evolution } from "../types";

export const STATE_MANAGEMENT: Evolution = {
  id: "state-management",
  language: "tsx",
  steps: [
    {
      id: "s1",
      commitMessage: "feat: add theme toggle",
      branch: "feature/theme",
      level: "bad",
      highlights: [1, 6, 7, 8, 14, 15],
      metrics: [
        { before: "12x", after: "12x", improved: false },
        { before: "2/10", after: "2/10", improved: false },
        { before: "1/10", after: "1/10", improved: false },
      ],
      code: `// Prop drilling — passando theme por 5 níveis
function App() {
  const [theme, setTheme] = useState('light')

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <Sidebar theme={theme}>
        <Nav theme={theme}>
          <NavItem theme={theme}>
            <ThemeIcon theme={theme} />
          </NavItem>
        </Nav>
      </Sidebar>
      <Main theme={theme}>
        <Header theme={theme} setTheme={setTheme}>
          <ThemeToggle
            theme={theme}
            setTheme={setTheme}
          />
        </Header>
        <Content theme={theme} />
      </Main>
    </Layout>
  )
}`,
    },
    {
      id: "s2",
      commitMessage: "refactor: use Context API",
      branch: "refactor/context",
      level: "better",
      highlights: [1, 3, 7, 13, 18],
      metrics: [
        { before: "12x", after: "0x", improved: true },
        { before: "2/10", after: "7/10", improved: true },
        { before: "1/10", after: "6/10", improved: true },
      ],
      code: `const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  return useContext(ThemeContext)
}

// Qualquer componente acessa direto
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(
      theme === 'light' ? 'dark' : 'light'
    )}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  )
}`,
    },
    {
      id: "s3",
      commitMessage: "refactor: add Zustand for simplicity",
      branch: "main",
      level: "great",
      highlights: [1, 2, 4, 5, 17, 22],
      metrics: [
        { before: "0x", after: "0x", improved: false },
        { before: "7/10", after: "10/10", improved: true },
        { before: "6/10", after: "10/10", improved: true },
      ],
      code: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggle: () => set((s) => ({
        theme: s.theme === 'light' ? 'dark' : 'light'
      })),
    }),
    { name: 'theme' }
  )
)

// Ultra simples de usar em qualquer lugar
function ThemeToggle() {
  const { theme, toggle } = useThemeStore()
  return <button onClick={toggle}>{theme}</button>
}

// Sem Provider, sem Context, sem boilerplate
function Header() {
  const theme = useThemeStore((s) => s.theme)
  return <header data-theme={theme} />
}`,
    },
  ],
};
