/**
 * Dados pessoais centralizados.
 * Atualize aqui e todo o site reflete automaticamente.
 */

export const PERSONAL = {
  name: "Vinicius Bastazin",
  fullName: "Vinicius Bastazin Araujo",
  role: "Desenvolvedor Frontend Senior",
  location: "Presidente Prudente, SP",

  email: "vbastazin@gmail.com",
  whatsapp: "5518988111220",

  github: "https://github.com/Coldiblaster",
  githubUsername: "Coldiblaster",
  linkedin: "https://www.linkedin.com/in/vbastazin/",

  siteUrl: "https://viniciusbastazin.vercel.app",
  siteName: "Vinicius Bastazin",

  avatar: "/avatar-desk.png",
  googleVerification: "OAX_26lblD3l_QOWRAmX4ujfVAflNwXTxo2Yf0iH7io",
} as const;

/**
 * Repositórios GitHub centralizados.
 * Os CTAs de "Ver no GitHub" usam essas URLs.
 */
export const REPOS = {
  /** Repositório principal deste portfolio */
  devShowcase: `${PERSONAL.github}/dev-showcase`,
  /** Template starter de i18n com next-intl */
  i18nStarter: `${PERSONAL.github}/dev-showcase`,
  // i18nStarter: `${PERSONAL.github}/nextjs-i18n-starter`,
} as const;

/** Link do WhatsApp com mensagem padrão */
export function buildWhatsAppLink(
  message = "Ola! Vi seu portfolio e gostaria de conversar.",
) {
  return `https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent(message)}`;
}
