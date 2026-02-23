/**
 * Exemplos de código do guia Next.js App Router.
 * Placeholders __KEY__ são substituídos pelas traduções (code.*) nas seções.
 */

export const CODE_EXAMPLES = {
  routing: {
    layout: `export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <aside>__SIDEBAR__</aside>
      <main>{children}</main>
    </div>
  );
}`,
    page: `export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}

// URL: /dashboard`,
  },
  serverClient: {
    server: `async function PostList() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return (
    <ul>
      {posts.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}`,
    client: `"use client";

import { useState } from 'react';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '__LIKED__' : '__LIKE__'}
    </button>
  );
}`,
  },
  dataFetching: {
    page: `export default async function ProdutosPage() {
  const res = await fetch('https://api.loja.com/produtos', {
    next: { revalidate: 60 },
  });
  const produtos = await res.json();
  return (
    <ul>
      {produtos.map(p => <li key={p.id}>{p.nome}</li>)}
    </ul>
  );
}`,
  },
  loadingError: {
    loading: `export default function Loading() {
  return <div>__LOADING__</div>;
}`,
    error: `"use client";

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>__ERROR_MSG__</p>
      <button onClick={reset}>__RETRY__</button>
    </div>
  );
}`,
  },
} as const;
