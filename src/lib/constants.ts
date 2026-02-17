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
  linkedin: "https://www.linkedin.com/in/vbastazin/",

  siteUrl: "https://viniciusbastazin.vercel.app",
  siteName: "Vinicius Bastazin",

  avatar: "/avatar-desk.png",
  googleVerification: "OAX_26lblD3l_QOWRAmX4ujfVAflNwXTxo2Yf0iH7io",
} as const;

/** Link do WhatsApp com mensagem padrão */
export function buildWhatsAppLink(
  message = "Ola! Vi seu portfolio e gostaria de conversar.",
) {
  return `https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent(message)}`;
}
