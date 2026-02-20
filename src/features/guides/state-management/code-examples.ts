/**
 * Exemplos de código do guia Estado no React.
 * Código fora dos JSONs para evitar problemas com next-intl e caracteres especiais.
 */

export const LOCAL_STATE_CODE = `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

// {{0}}`;

export const CONTEXT_PROVIDER_CODE = `import { createContext, useState } from "react";

const ThemeContext = createContext<"light" | "dark">("light");

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}`;

export const CONTEXT_CONSUMER_CODE = `import { useContext } from "react";

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Submit</button>;
}

// {{0}}`;

export const ZUSTAND_STORE_CODE = `import { create } from "zustand";

interface CounterStore {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));`;

export const ZUSTAND_USE_CODE = `// {{0}}
function Counter() {
  const { count, increment } = useCounterStore();
  return <button onClick={increment}>{count}</button>;
}

// {{1}}`;

// ---- useCallback ----
export const USECALLBACK_BASIC_CODE = `import { useCallback, useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // {{0}}
  return <MemoizedChild onIncrement={handleClick} count={count} />;
}`;

export const USECALLBACK_DEPS_CODE = `// {{0}}
const fetchUser = useCallback(async (id: string) => {
  const res = await fetch(\`/api/users/\${id}\`, { headers: { Authorization: token } });
  return res.json();
}, [token]); // {{1}}`;

export const USEMEMO_FILTER_CODE = `import { useMemo, useState } from "react";

function ProductList({ products, filter }: { products: Product[]; filter: string }) {
  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase())),
    [products, filter]
  );
  return <ul>{filtered.map((p) => <li key={p.id}>{p.name}</li>)}</ul>;
}`;

export const USEMEMO_EXPENSIVE_CODE = `// {{0}}
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.score - b.score),
  [items]
);
const stats = useMemo(() => computeHeavyStats(data), [data]);`;

export const USEREF_FOCUS_CODE = `import { useRef, useEffect } from "react";

function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return <input ref={inputRef} type="search" />;
}`;

export const USEREF_PREVIOUS_CODE = `// {{0}}
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}`;

export const USEREF_INTERVAL_CODE = `// {{0}}
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
useEffect(() => {
  intervalRef.current = setInterval(tick, 1000);
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);`;

export const USEREDUCER_CODE = `import { useReducer } from "react";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement"; by: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - action.by };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement", by: 1 })}>-1</button>
    </>
  );
}`;

// Extra: controlled input (useState) - real form pattern
export const LOCAL_STATE_INPUT_CODE = `function SearchField() {
  const [query, setQuery] = useState("");
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
// {{0}}`;

// ---- When to use what ----
export const WHEN_USE_STATE_CODE = `// {{0}}
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // {{1}}
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={...} />
      <button disabled={loading}>Submit</button>
    </form>
  );
}`;

export const WHEN_USE_CONTEXT_CODE = `// {{0}}
// {{1}}
function App() {
  return (
    <ThemeProvider>      {/* {{2}} */}
      <Layout>
        <Sidebar />      {/* {{3}} */}
        <Page />
      </Layout>
    </ThemeProvider>
  );
}
function Sidebar() {
  const theme = useContext(ThemeContext);  // {{4}}
  return <aside className={theme}>...</aside>;
}`;

export const WHEN_USE_ZUSTAND_CODE = `// {{0}}
// {{1}}
// {{2}}
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
}));
function Header() {
  const count = useCartStore((s) => s.items.length);  // {{3}}
  return <span>{count} items</span>;
}
function ProductCard({ id }) {
  const addItem = useCartStore((s) => s.addItem);     // {{4}}
  return <button onClick={() => addItem({ id })}>Add</button>;
}`;
