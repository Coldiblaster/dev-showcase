/** Exemplos de código HTML/TSX para o guia de acessibilidade. */

export const ARIA_LABELS_GOOD = `<!-- ✅ Botões com contexto semântico claro -->
<button aria-label="Fechar diálogo de configurações">
  <X className="h-4 w-4" />
</button>

<button aria-label="Editar perfil de João Silva">
  <Pencil className="h-4 w-4" />
</button>

<!-- ✅ aria-describedby para detalhes adicionais -->
<input
  id="email"
  type="email"
  aria-describedby="email-hint"
/>
<p id="email-hint" className="text-sm text-muted-foreground">
  Use seu email corporativo
</p>`;

export const ARIA_LABELS_BAD = `<!-- ❌ Sem contexto — screen reader lê "botão" sem saber o que faz -->
<button>
  <X className="h-4 w-4" />
</button>

<!-- ❌ Placeholder não é acessível como label -->
<input type="email" placeholder="Email" />`;

export const SKIP_LINK = `// src/components/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4
        focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4
        focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground
      "
    >
      Pular para o conteúdo principal
    </a>
  );
}

// Em layout.tsx
<SkipLink />
<header>...</header>
<main id="main-content">...</main>`;

export const FOCUS_TRAP = `// Focus trap simples para modais
function trapFocus(container: HTMLElement) {
  const focusable = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  container.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}`;

export const SEMANTICS_BAD = `<!-- ❌ Div soup — nenhuma informação semântica -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="main">
  <div class="title">Título</div>
  <div class="content">...</div>
</div>`;

export const SEMANTICS_GOOD = `<!-- ✅ HTML semântico — screen readers entendem a estrutura -->
<header>
  <nav aria-label="Navegação principal">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <article>
    <h1>Título da Página</h1>
    <section aria-labelledby="section-title">
      <h2 id="section-title">Seção</h2>
      <p>Conteúdo...</p>
    </section>
  </article>
</main>

<footer>
  <p>© 2025 Dev Showcase</p>
</footer>`;

export const LIVE_REGION = `// ✅ Anúncio de estado para screen readers
function SearchResults({ count }: { count: number }) {
  return (
    <>
      {/* Visualmente escondido mas lido por screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {count === 0
          ? "Nenhum resultado encontrado"
          : \`\${count} resultados encontrados\`}
      </div>

      {/* Conteúdo visual */}
      <ul>{/* ... */}</ul>
    </>
  );
}`;
