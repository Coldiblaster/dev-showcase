export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  usage: string;
  explanation: string;
  tags: string[];
  language: string;
}

export const snippets: CodeSnippet[] = [
  {
    id: "debounce",
    title: "Debounce Hook",
    description: "Hook customizado para debounce de valores (ideal para busca)",
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
• Qualquer input que dispara operações caras

**Performance:** Reduz chamadas de API de ~10/s para ~2/s em digitação normal.`,
    tags: ["React", "Hooks", "Performance"],
    language: "typescript",
  },
  {
    id: "intersection-observer",
    title: "useIntersection Hook",
    description:
      "Detecta quando elemento entra na viewport (lazy loading, animações)",
    code: `import { useEffect, useState, RefObject } from 'react'

export function useIntersection(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, options])

  return isIntersecting
}`,
    usage: `import { useIntersection } from '@/hooks/use-intersection'

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref, {
    threshold: 0.1,
    rootMargin: '100px'
  })

  return (
    <div ref={ref}>
      {isVisible ? (
        <img src={src} alt={alt} className="fade-in" />
      ) : (
        <div className="h-64 bg-muted animate-pulse" />
      )}
    </div>
  )
}`,
    explanation: `**useIntersection** detecta quando um elemento fica visível na viewport do usuário.

**Como funciona:**
• Cria um IntersectionObserver nativo do browser
• Observa o elemento via ref
• Atualiza o state quando o elemento entra/sai da viewport
• Faz cleanup automático no unmount

**Quando usar:**
• Lazy loading de imagens e componentes pesados
• Animações de entrada (fade-in on scroll)
• Infinite scroll / paginação
• Analytics de visibilidade (impressions)

**Dica:** Use rootMargin para carregar antes do elemento ficar visível (preload).`,
    tags: ["React", "Hooks", "Performance", "Animation"],
    language: "typescript",
  },
  {
    id: "fetch-wrapper",
    title: "API Fetch Wrapper",
    description: "Wrapper type-safe para fetch com error handling",
    code: `type FetchOptions = RequestInit & {
  params?: Record<string, string>
}

export async function fetchAPI<T>(
  url: string,
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
    throw new Error(\`HTTP error! status: \${response.status}\`)
  }

  return response.json()
}`,
    usage: `import { fetchAPI } from '@/lib/fetch-api'

interface User {
  id: string
  name: string
  email: string
}

// GET com tipo seguro
const user = await fetchAPI<User>('/api/users/1')
console.log(user.name) // autocomplete funciona!

// GET com query params
const users = await fetchAPI<User[]>('/api/users', {
  params: { role: 'admin', page: '1' }
})

// POST com body
const newUser = await fetchAPI<User>('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'João', email: 'j@email.com' })
})`,
    explanation: `**fetchAPI** é um wrapper type-safe sobre o fetch nativo com conveniências embutidas.

**O que resolve:**
• Tipagem genérica — retorna T em vez de any
• Query params automáticos — passa objeto, gera URL
• Headers padrão — Content-Type já configurado
• Error handling — throw em status não-ok

**Benefícios vs fetch puro:**
• Autocomplete no retorno (TypeScript infere o tipo)
• Menos boilerplate repetitivo
• Erros HTTP viram exceptions (catch unificado)
• Fácil de estender (auth headers, interceptors)

**Dica:** Combine com React Query/SWR para cache e revalidação.`,
    tags: ["TypeScript", "API", "Utilities"],
    language: "typescript",
  },
  {
    id: "local-storage",
    title: "useLocalStorage Hook",
    description: "Hook para gerenciar localStorage com TypeScript",
    code: `import { useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}`,
    usage: `import { useLocalStorage } from '@/hooks/use-local-storage'

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(
    'app-theme',
    'light'
  )

  return (
    <button onClick={() =>
      setTheme(theme === 'light' ? 'dark' : 'light')
    }>
      Tema atual: {theme}
    </button>
  )
}

// Também funciona com objetos complexos
function UserPrefs() {
  const [prefs, setPrefs] = useLocalStorage('prefs', {
    notifications: true,
    language: 'pt-BR',
    fontSize: 16
  })

  return <span>Idioma: {prefs.language}</span>
}`,
    explanation: `**useLocalStorage** sincroniza estado React com o localStorage do navegador.

**Como funciona:**
• Inicializa lendo o localStorage (com lazy initializer)
• Verifica SSR com typeof window (Next.js safe)
• Serializa/deserializa com JSON automaticamente
• Atualiza state e localStorage simultaneamente

**Quando usar:**
• Preferências do usuário (tema, idioma, layout)
• Cache de formulários em progresso
• Estado que deve persistir entre sessões
• Feature flags locais

**Cuidados:**
• localStorage é síncrono — não use para dados grandes
• Não funciona em SSR (fallback para initialValue)
• Dados são string — objetos são JSON.parse/stringify`,
    tags: ["React", "Hooks", "Storage"],
    language: "typescript",
  },
  {
    id: "format-date",
    title: "Formatador de Data",
    description: "Formata datas usando Intl API nativa do browser",
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

export function formatDateTime(
  date: Date | string,
  locale = 'pt-BR'
): string {
  const d = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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
    usage: `import { formatDate, formatDateTime, formatRelative } from '@/lib/format-date'

// Formata data simples
formatDate(new Date())           // "16/02/2026"
formatDate('2026-01-15')         // "15/01/2026"
formatDate(new Date(), 'en-US')  // "02/16/2026"

// Formata com hora
formatDateTime(new Date())       // "16/02/2026, 14:30"

// Formato relativo (ideal para feeds)
formatRelative(new Date())                          // "agora"
formatRelative(new Date(Date.now() - 300000))       // "5min atrás"
formatRelative(new Date(Date.now() - 7200000))      // "2h atrás"
formatRelative(new Date(Date.now() - 172800000))    // "2d atrás"`,
    explanation: `**Formatadores de data** usando a Intl API nativa — sem dependências externas.

**Vantagens da Intl API:**
• Nativa do browser — zero bundle size
• Suporte a qualquer locale automaticamente
• Formata números, moedas e datas
• Funciona em Node.js e browsers modernos

**formatDate vs moment/date-fns:**
• moment.js: ~70KB (deprecated)
• date-fns: ~12KB (tree-shakeable)
• Intl API: 0KB — já está no browser!

**formatRelative — quando usar:**
• Feeds de atividade
• Comentários e posts
• Notificações
• Qualquer timestamp que precisa ser "humano"

**Dica:** Passe o locale como parâmetro para suportar i18n.`,
    tags: ["Utilities", "Formatting"],
    language: "typescript",
  },
  {
    id: "cn-helper",
    title: "Class Names Helper",
    description: "Utilitário para concatenar classes condicionalmente",
    code: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
    usage: `import { cn } from '@/lib/utils'

// Concatenação simples
cn("text-base", "font-bold")
// → "text-base font-bold"

// Classes condicionais
cn("rounded-lg p-4", isActive && "bg-primary")
// → "rounded-lg p-4 bg-primary" (se isActive)

// Ternário
cn("btn", isDisabled ? "opacity-50" : "hover:scale-105")

// Resolve conflitos do Tailwind
cn("px-4 py-2", "px-6")
// → "py-2 px-6" (px-6 vence px-4!)

// Em componentes
function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 font-medium",
        "bg-primary text-primary-foreground",
        "hover:bg-primary/90 transition-colors",
        className // permite override externo
      )}
      {...props}
    />
  )
}`,
    explanation: `**cn()** combina clsx + tailwind-merge — o utilitário mais usado em projetos Tailwind.

**clsx** — concatena classes condicionalmente:
• Aceita strings, objetos, arrays
• Ignora valores falsy (false, null, undefined)
• Muito mais limpo que template literals manuais

**tailwind-merge** — resolve conflitos:
• "px-4 px-6" → "px-6" (última vence)
• "text-red-500 text-blue-500" → "text-blue-500"
• Sem twMerge, ambas classes ficam e causam bugs visuais

**Por que é essencial:**
• Padrão em shadcn/ui e Radix UI
• Permite componentes customizáveis (className prop)
• Evita !important e especificidade CSS
• Zero overhead em runtime (~0.5ms)

**Deps:** \`pnpm add clsx tailwind-merge\``,
    tags: ["Tailwind", "Utilities", "Styling"],
    language: "typescript",
  },
  {
    id: "copy-clipboard",
    title: "Copy to Clipboard",
    description: "Função para copiar texto com fallback para browsers antigos",
    code: `export async function copyToClipboard(
  text: string
): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // Fallback para browsers antigos
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}`,
    usage: `import { copyToClipboard } from '@/lib/copy-clipboard'

// Uso básico
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button onClick={handleCopy}>
      {copied ? '✓ Copiado!' : 'Copiar'}
    </button>
  )
}

// Como hook reutilizável
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    const ok = await copyToClipboard(text)
    setCopied(ok)
    if (ok) setTimeout(() => setCopied(false), 2000)
    return ok
  }

  return { copied, copy }
}`,
    explanation: `**copyToClipboard** copia texto para a área de transferência com fallback robusto.

**Clipboard API (moderna):**
• navigator.clipboard.writeText() — async, segura
• Requer HTTPS ou localhost
• Suportada em 96%+ dos browsers

**Fallback (browsers antigos):**
• Cria textarea invisível fora da tela
• Seleciona o texto e usa execCommand('copy')
• Remove o elemento após copiar
• Funciona em IE11+ e HTTP

**Padrão de uso com feedback:**
1. Chamar a função e aguardar Promise
2. Mostrar "Copiado!" por 2s
3. Voltar ao estado original

**Cuidado:** Em mobile, alguns browsers bloqueiam clipboard fora de eventos de click.`,
    tags: ["Utilities", "Browser API"],
    language: "typescript",
  },
  {
    id: "slugify",
    title: "Slugify String",
    description: "Converte texto em URL-friendly slug",
    code: `export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}`,
    usage: `import { slugify } from '@/lib/slugify'

// Conversões básicas
slugify("Hello World")
// → "hello-world"

slugify("Título com Acentuação!")
// → "titulo-com-acentuacao"

slugify("  Espaços   extras  ")
// → "espacos-extras"

slugify("React & TypeScript: Guia Completo")
// → "react-typescript-guia-completo"

// Uso real: gerar URLs de posts
function createPost(title: string) {
  const slug = slugify(title)
  return {
    slug,
    url: \`/blog/\${slug}\`,
    title
  }
}

createPost("Como Usar Next.js 16")
// { slug: "como-usar-nextjs-16", url: "/blog/como-usar-nextjs-16", ... }`,
    explanation: `**slugify** transforma qualquer texto em um slug URL-safe.

**Pipeline de transformação:**
1. \`toLowerCase()\` — normaliza casing
2. \`normalize('NFD')\` — decompõe acentos em caracteres base + diacríticos
3. Remove diacríticos com regex Unicode
4. Remove caracteres especiais (!@#$%...)
5. Trim espaços e colapsa múltiplos separadores em um "-"
6. Remove hífens nas pontas

**Quando usar:**
• URLs de blog posts e artigos
• IDs legíveis para anchors (#secao-sobre)
• Nomes de arquivos seguros
• Chaves de cache baseadas em texto

**normalize('NFD') — a mágica dos acentos:**
• "é" → "e" + "´" (dois chars)
• Remove o diacrítico, mantém a letra base
• Funciona com qualquer idioma latino

**Dica:** Para URLs, combine com um id numérico: \`/post/123-meu-titulo\``,
    tags: ["Utilities", "String", "SEO"],
    language: "typescript",
  },
];
