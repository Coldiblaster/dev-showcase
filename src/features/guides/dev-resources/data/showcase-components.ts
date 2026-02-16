// Array de componentes para LiveComponentsSection
// Apenas dados, sem componentes React
export const showcaseComponents = [
  {
    id: "animated-button",
    name: "Botão Animado",
    description: "Botão com animação de hover e clique usando Framer Motion",
    category: "Interação",
    componentKey: "AnimatedButton",
    code: `const AnimatedButton = () => {
	const [clicked, setClicked] = useState(false)
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={() => setClicked(!clicked)}
			className="rounded-lg bg-primary px-6 py-3"
		>
			{clicked ? "Clicado!" : "Clique aqui"}
		</motion.button>
	)
}`,
    explanation: `Este componente usa Framer Motion para adicionar micro-interações suaves.\n\n**whileHover**: Escala o botão em 5% ao passar o mouse\n**whileTap**: Reduz a escala ao clicar, criando feedback visual\n**Estado**: Gerencia texto dinâmico com useState\n\nPerfeito para CTAs e ações importantes que precisam de destaque visual.`,
  },
  {
    id: "loading-spinner",
    name: "Loading Spinner",
    description: "Indicador de carregamento com animação CSS",
    category: "Feedback",
    componentKey: "LoadingSpinner",
    code: `const LoadingSpinner = () => {
	return (
		<div className="flex items-center gap-3">
			<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			<span>Carregando...</span>
		</div>
	)
}`,
    explanation: `Loading spinner simples e eficaz usando apenas CSS.\n\n**animate-spin**: Utilidade Tailwind para rotação contínua\n**border-t-transparent**: Cria o efeito de "fatia faltando"\n**Performance**: Usa CSS animations (mais performático que JS)\n\nUse para indicar operações assíncronas e melhorar UX.`,
  },
  {
    id: "toast-notification",
    name: "Toast Notification",
    description: "Notificação animada com Framer Motion",
    category: "Feedback",
    componentKey: "ToastNotification",
    code: `const ToastNotification = () => {
	const [show, setShow] = useState(false)
	return (
		<>
			<Button onClick={() => setShow(true)}>
				Mostrar Notificação
			</Button>
			{show && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
				>
					<Check className="h-5 w-5" />
					<p>Sucesso!</p>
				</motion.div>
			)}
		</>
	)
}`,
    explanation: `Sistema de notificação toast com animação suave.\n\n**initial/animate**: Cria transição de entrada suave\n**Posicionamento**: Usa absolute para overlay não-invasivo\n**UX**: Feedback visual imediato para ações do usuário\n\nIdeal para confirmações de ações (salvar, deletar, etc).`,
  },
  {
    id: "gradient-card",
    name: "Card com Gradiente",
    description: "Card moderno com gradiente sutil",
    category: "Layout",
    componentKey: "GradientCard",
    code: `const GradientCard = () => {
	return (
		<div className="relative overflow-hidden rounded-xl border bg-card p-6">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
			<div className="relative space-y-2">
				<h3>Card com Gradiente</h3>
				<p>Card moderno com gradiente sutil</p>
			</div>
		</div>
	)
}`,
    explanation: `Card elegante com gradiente não-intrusivo.\n\n**overflow-hidden**: Garante que o gradiente não vaze\n**absolute/relative**: Camadas para gradiente e conteúdo\n**opacity baixa**: Gradiente sutil que não compete com o texto\n\nCria profundidade visual sem comprometer legibilidade.`,
  },
];
