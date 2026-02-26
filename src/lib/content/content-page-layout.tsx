import { ContentFooter } from "@/components/content-footer";
import { ReadingProgress } from "@/components/reading-progress";
import { ReadingTime } from "@/components/reading-time";
import { RelatedContent } from "@/components/related-content";
import { ShareButtons } from "@/components/share-buttons";
import type { ContentItem } from "@/data/content";
import { getCategoryPath } from "@/lib/content-paths";

type ContentPageLayoutProps = {
  /** Conteúdo principal da página (componente dinâmico). */
  children: React.ReactNode;
  /** Dados do item de conteúdo para footer, related e share. */
  content: ContentItem;
};

/**
 * Layout padrão para páginas de conteúdo dinâmico.
 * Inclui barra de progresso, conteúdo, related content, tempo de leitura e share.
 *
 * @param children - Componente da página (ex: AiTips, SeoShowcase)
 * @param content - Metadados do conteúdo (slug, category, title, readingMinutes)
 */
export function ContentPageLayout({
  children,
  content,
}: ContentPageLayoutProps) {
  const path = `/${getCategoryPath(content.category)}/${content.slug}`;

  return (
    <>
      <ReadingProgress />

      {children}

      <div className="container mx-auto max-w-4xl px-6 pb-16">
        <div data-hide-focus>
          <RelatedContent
            currentSlug={content.slug}
            currentCategory={content.category}
          />
        </div>

        <div
          data-hide-focus
          className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"
        >
          {content.readingMinutes ? (
            <ReadingTime minutes={content.readingMinutes} />
          ) : (
            <span />
          )}
          <ShareButtons title={content.title} />
        </div>

        {/* key={path} força remount ao navegar — evita state stale no ContentFooter */}
        <div data-hide-focus>
          <ContentFooter key={path} path={path} />
        </div>
      </div>
    </>
  );
}
