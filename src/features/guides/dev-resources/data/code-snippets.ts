interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
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
}

// Uso:
const searchTerm = useDebounce(query, 500)`,
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

  // Adiciona query params
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
    tags: ["TypeScript", "API", "Utilities"],
    language: "typescript",
  },
  {
    id: "local-storage",
    title: "useLocalStorage Hook",
    description: "Hook para gerenciar localStorage com TypeScript",
    code: `import { useState, useEffect } from 'react'

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
    tags: ["React", "Hooks", "Storage"],
    language: "typescript",
  },
  {
    id: "format-date",
    title: "Formatador de Data PT-BR",
    description: "Formata datas para o padrão brasileiro",
    code: `export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}`,
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
}

// Uso:
cn("text-base", condition && "font-bold")
cn(
  "rounded-lg p-4",
  isActive ? "bg-primary" : "bg-muted"
)`,
    tags: ["Tailwind", "Utilities", "Styling"],
    language: "typescript",
  },
  {
    id: "copy-clipboard",
    title: "Copy to Clipboard",
    description: "Função para copiar texto com fallback",
    code: `export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Tenta usar a API moderna
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // Fallback para navegadores antigos
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
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/[\s_-]+/g, '-') // Substitui espaços por hífens
    .replace(/^-+|-+$/g, '') // Remove hífens no início/fim
}

// Exemplo:
// "Título com Acentuação!" → "titulo-com-acentuacao"`,
    tags: ["Utilities", "String", "SEO"],
    language: "typescript",
  },
];
