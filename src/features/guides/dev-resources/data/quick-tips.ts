import type { DevLevel } from "./types";

export interface QuickTip {
  id: string;
  tip: string;
  detail: string;
  level: DevLevel;
  category: string;
}

export const quickTips: QuickTip[] = [
  // ── Junior ────────────────────────────────────────────────
  {
    id: "key-unique",
    tip: "Nunca use index como key em listas que mudam",
    detail:
      "Use um ID único e estável (como id do banco). Index causa bugs visuais silenciosos quando itens são reordenados ou removidos — o React reutiliza o DOM errado.",
    level: "junior",
    category: "React",
  },
  {
    id: "optional-chaining",
    tip: "Use optional chaining (?.) em vez de && encadeado",
    detail:
      "user?.address?.city é mais limpo e seguro que user && user.address && user.address.city. Funciona com chamadas de função também: obj.method?.()",
    level: "junior",
    category: "JavaScript",
  },
  {
    id: "fragment-div",
    tip: "Use <></> em vez de <div> quando só precisa agrupar JSX",
    detail:
      "Fragments não criam nó extra no DOM. Divs desnecessárias quebram layouts CSS (flex, grid) e poluem a árvore DOM sem razão.",
    level: "junior",
    category: "React",
  },
  {
    id: "const-let",
    tip: "Prefira const sempre — só use let quando realmente precisa reatribuir",
    detail:
      "const comunica intenção: esse valor não muda. Facilita code review e evita reatribuições acidentais. Em ~95% dos casos, const é suficiente.",
    level: "junior",
    category: "JavaScript",
  },

  // ── Pleno ─────────────────────────────────────────────────
  {
    id: "updater-function",
    tip: "Use updater function no setState quando depende do valor anterior",
    detail:
      "setCount(count + 1) pode usar valor stale em batched updates. setCount(prev => prev + 1) sempre usa o valor mais recente. Essencial em event handlers assíncronos.",
    level: "pleno",
    category: "React",
  },
  {
    id: "abort-controller",
    tip: "Sempre use AbortController em fetches dentro de useEffect",
    detail:
      "Sem abort, trocar de página rapidamente causa race conditions — a resposta do fetch anterior sobrescreve a nova. AbortController cancela requests pendentes no cleanup.",
    level: "pleno",
    category: "Performance",
  },
  {
    id: "as-const",
    tip: "Use 'as const' para inferir tipos literais em vez de string genérica",
    detail:
      "const roles = ['admin', 'user'] as const infere tipo readonly ['admin', 'user'] em vez de string[]. Permite extrair union types: type Role = typeof roles[number]",
    level: "pleno",
    category: "TypeScript",
  },
  {
    id: "error-boundary",
    tip: "Sempre envolva rotas e seções independentes com Error Boundaries",
    detail:
      "Um erro em um componente filho derruba toda a árvore React. Error Boundaries isolam crashes — a sidebar pode quebrar sem derrubar a página inteira.",
    level: "pleno",
    category: "React",
  },

  // ── Senior ────────────────────────────────────────────────
  {
    id: "barrel-files",
    tip: "Evite barrel files (index.ts) em projetos grandes — eles matam tree-shaking",
    detail:
      "Importar de um index.ts força o bundler a avaliar todos os re-exports. Em monorepos, isso pode adicionar centenas de KB ao bundle. Importe direto do arquivo fonte.",
    level: "senior",
    category: "Architecture",
  },
  {
    id: "server-components",
    tip: "Componentes que só mostram dados devem ser Server Components — não adicione 'use client' sem necessidade",
    detail:
      "Server Components rodam no servidor = zero JavaScript no bundle do client. Só adicione 'use client' quando precisa de hooks, event handlers ou browser APIs.",
    level: "senior",
    category: "Next.js",
  },
  {
    id: "composition-over-config",
    tip: "Prefira composição sobre configuração em componentes públicos",
    detail:
      "Em vez de <Card showHeader showFooter headerTitle='...' footerAction='...'>, use <Card><CardHeader>...</CardHeader><CardFooter>...</CardFooter></Card>. Mais flexível, tipado e extensível.",
    level: "senior",
    category: "Patterns",
  },
  {
    id: "use-sync-external-store",
    tip: "Use useSyncExternalStore para integrar stores externos com React 18+",
    detail:
      "É o hook oficial para sincronizar React com qualquer fonte de dados externa (localStorage, WebSocket, Redux-like stores). Garante consistência com concurrent rendering.",
    level: "senior",
    category: "React",
  },
];
