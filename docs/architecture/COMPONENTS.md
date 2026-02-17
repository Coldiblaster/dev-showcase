# Componentes Reutilizaveis

Catalogo dos componentes compartilhados em `src/components/`.

Estes componentes sao usados em diversas features e paginas. Antes de criar algo novo, verifique se ja existe aqui.

---

## Componentes de Layout

### `SectionWrapper`

**Arquivo:** `src/components/section-wrapper.tsx`

Wrapper padrao para secoes de pagina com padding, max-width e variantes de background.

```tsx
import { SectionWrapper } from "@/components/section-wrapper";

<SectionWrapper variant="default">
  <h2>Minha secao</h2>
</SectionWrapper>;
```

**Props:**

- `children` — conteudo da secao
- `variant` — `"default"` | `"alternate"` (fundo alternado)
- `className` — classes extras

---

### `SectionHeader`

**Arquivo:** `src/components/section-header.tsx`

Cabecalho padronizado para secoes com titulo, subtitulo e badge opcional.

```tsx
import { SectionHeader } from "@/components/section-header";

<SectionHeader
  badge="Novo"
  title="Titulo da secao"
  description="Descricao opcional"
/>;
```

**Props:**

- `title` — titulo principal
- `description` — subtitulo (opcional)
- `badge` — texto do badge (opcional)
- `className` — classes extras

---

### `SectionDivider`

**Arquivo:** `src/components/section-divider.tsx`

Separador visual entre secoes.

```tsx
import { SectionDivider } from "@/components/section-divider";

<SectionDivider />;
```

---

### `HeroSection`

**Arquivo:** `src/components/hero-section.tsx`

Hero section reutilizavel com titulo, descricao, badge e acoes.

```tsx
import { HeroSection } from "@/components/hero-section";

<HeroSection badge="Implementacao" title="Titulo" description="Descricao" />;
```

---

### `CtaSection`

**Arquivo:** `src/components/cta-section.tsx`

Call-to-action section para final de paginas.

```tsx
import { CtaSection } from "@/components/cta-section";

<CtaSection
  title="Gostou?"
  description="Veja mais"
  buttonText="Explorar"
  buttonHref="/implementacoes"
/>;
```

---

## Componentes de Conteudo

### `CodeBlock`

**Arquivo:** `src/components/code-block.tsx`

Bloco de codigo com syntax highlight, copia e titulo.

```tsx
import { CodeBlock } from "@/components/code-block";

<CodeBlock title="exemplo.ts" language="typescript" code={`const x = 42;`} />;
```

**Props:**

- `code` — codigo fonte
- `language` — linguagem para highlight
- `title` — titulo do bloco (opcional)

---

### `ViewSource`

**Arquivo:** `src/components/view-source.tsx`

Toggle entre conteudo visual e codigo-fonte. Util para showcases.

```tsx
import { ViewSource } from "@/components/view-source";

<ViewSource sourceCode={meuCodigo}>
  <MeuComponente />
</ViewSource>;
```

**Props:**

- `children` — conteudo visual
- `sourceCode` — codigo-fonte para exibir no modo source

---

### `StepCard`

**Arquivo:** `src/components/step-card.tsx`

Card para exibir etapas/passos com icone, numeracao, titulo e descricao. Usa `backdrop-blur` e hover animado.

```tsx
import { StepCard } from "@/components/step-card";
import { Code } from "lucide-react";

<StepCard
  icon={Code}
  title="Escreva o codigo"
  description="Cole seu codigo no editor"
  step={1}
/>;
```

**Props:**

- `icon` — componente de icone (Lucide)
- `title` — titulo do passo
- `description` — descricao
- `step` — numero do passo

---

### `ScoreGauge`

**Arquivo:** `src/components/score-gauge.tsx`

Medidor circular animado de pontuacao (0–100). Cores mudam conforme score.

```tsx
import { ScoreGauge } from "@/components/score-gauge";

<ScoreGauge score={85} label="/100" />;
```

**Props:**

- `score` — valor numerico (0-100)
- `label` — texto abaixo do score (default: "/100")

**Cores automaticas:**

- 0-39: vermelho
- 40-69: amarelo
- 70-89: verde
- 90-100: verde brilhante

---

### `FeatureCard`

**Arquivo:** `src/components/feature-card.tsx`

Card para exibir features com icone e descricao.

---

### `PromptCard`

**Arquivo:** `src/components/prompt-card.tsx`

Card formatado para exibir prompts de IA.

---

### `TipItem`

**Arquivo:** `src/components/tip-item.tsx`

Item individual de dica/tip.

---

### `ResourceLink`

**Arquivo:** `src/components/resource-link.tsx`

Link para recurso externo com icone e descricao.

---

### `IconBadge`

**Arquivo:** `src/components/icon-badge.tsx`

Badge com icone para categorias e tags.

---

## Componentes de Interacao

### `AnimatedSection`

**Arquivo:** `src/components/animated-section.tsx`

Wrapper com animacao Framer Motion de entrada (fade up). Usa `useInView` para animar ao entrar no viewport.

```tsx
import { AnimatedSection } from "@/components/animated-section";

<AnimatedSection>
  <p>Conteudo que anima ao aparecer</p>
</AnimatedSection>;
```

---

### `CopyFeedback`

**Arquivo:** `src/components/copy-feedback.tsx`

Provider + hook para feedback visual de "copiado!".

---

### `ScrollTopButton`

**Arquivo:** `src/components/scroll-top.tsx`

Botao flutuante para voltar ao topo da pagina.

---

### `LanguageSwitcher`

**Arquivo:** `src/components/language-switcher.tsx`

Seletor de idioma com bandeiras (pt-BR, en, es, de).

---

## Componentes Compostos

### `Navbar`

**Diretorio:** `src/components/navbar/`

Navbar modular composta por 9 sub-componentes:

```
navbar/
├── index.tsx           # Composicao principal
├── desktop-nav.tsx     # Navegacao desktop
├── mobile-nav.tsx      # Navegacao mobile (drawer)
├── mobile-menu-item.tsx
├── nav-actions.tsx     # Tema + idioma + busca
├── nav-logo.tsx        # Logo com animacao
├── nav-submenu.tsx     # Submenu dropdown
└── submenu-item.tsx    # Item de submenu
```

---

### `Chat Widget`

**Diretorio:** `src/components/chat/`

Widget de chat IA flutuante com streaming.

---

### `Terminal Easter Egg`

**Diretorio:** `src/components/terminal/`

Terminal interativo ativado com `~`. Composto por:

```
terminal/
├── index.tsx            # Composicao principal
├── terminal-hint.tsx    # Badge "Pressione ~"
├── terminal-window.tsx  # Janela do terminal
├── use-terminal.ts      # Hook com logica
└── constants.ts         # Temas e comandos
```

---

### `Global Search`

**Diretorio:** `src/components/global-search/`

Busca global fuzzy com Fuse.js:

```
global-search/
├── global-search.tsx    # Dialog principal
├── search-trigger.tsx   # Botao trigger (Ctrl+K)
├── search-results.tsx   # Lista de resultados
├── search-empty.tsx     # Estado vazio
└── search-footer.tsx    # Atalhos de teclado
```

---

## Componentes UI (shadcn/ui)

Primitivos em `src/components/ui/`:

| Componente          | Descricao                   |
| ------------------- | --------------------------- |
| `Button`            | Botao com variantes         |
| `Card` / `CardBlur` | Cards com glassmorphism     |
| `Badge`             | Tags e labels               |
| `Dialog`            | Modal dialog                |
| `Input`             | Campo de texto              |
| `Select`            | Dropdown select             |
| `Tabs`              | Abas                        |
| `Separator`         | Divisor                     |
| `ScrollArea`        | Area com scroll customizado |
| `Calendar`          | Calendario                  |
| `Toast`             | Notificacoes toast          |

---

## Hooks customizados

Localizados em `src/hooks/`:

| Hook                 | Descricao                               |
| -------------------- | --------------------------------------- |
| `useCopyToClipboard` | Copia texto para clipboard com feedback |
| `useMobile`          | Detecta se e dispositivo mobile         |
| `useQueryParams`     | Leitura/escrita de query params         |
| `useSectionInView`   | Detecta secao visivel no viewport       |
| `useToast`           | Dispara notificacoes toast              |

---

## Quando criar vs reutilizar

**Reutilize** se:

- O componente ja existe neste catalogo
- A variacao pode ser resolvida com props

**Crie novo** se:

- Nenhum componente existente atende
- A logica e especifica demais para generalizar

**Ao criar:**

1. Coloque em `src/components/` se for reutilizavel
2. Coloque na pasta da feature se for especifico
3. Adicione JSDoc em portugues
4. Atualize este documento
