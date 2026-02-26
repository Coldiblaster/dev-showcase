/**
 * Sistema de páginas de conteúdo dinâmico.
 *
 * - component-map: registro de componentes com lazy loading
 * - content-page-layout: layout padrão (progress, related, share, footer)
 * - dynamic-page: helpers para generateMetadata, generateStaticParams e render
 */

export {
  generateMetadataForSlug,
  generateStaticParamsForCategory,
  renderDynamicContent,
  type DynamicPageProps,
} from "./dynamic-page";
