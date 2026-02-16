// Array de exemplos para CodePlaygroundSection
export const playgroundExamples = [
  {
    id: "counter",
    title: "Contador Simples",
    description: "useState básico com incremento e decremento",
    category: "React Hooks",
    defaultCode: `function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Contador: {count}
      </h2>
      <div className="flex gap-2">
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrementar
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Incrementar
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

render(<Counter />)`,
  },
  {
    id: "toggle",
    title: "Toggle com Estilo",
    description: "Botão toggle com mudança de estilo",
    category: "Interação",
    defaultCode: `function Toggle() {
  const [isOn, setIsOn] = React.useState(false)

  return (
    <div className="space-y-4">
      <div className={
        isOn 
          ? "p-6 bg-green-100 rounded-lg" 
          : "p-6 bg-gray-100 rounded-lg"
      }>
        <h3 className="text-xl font-bold">
          Status: {isOn ? '✅ Ligado' : '❌ Desligado'}
        </h3>
      </div>
      <button
        onClick={() => setIsOn(!isOn)}
        className={
          isOn
            ? "px-6 py-3 bg-green-500 text-white rounded-lg"
            : "px-6 py-3 bg-gray-500 text-white rounded-lg"
        }
      >
        {isOn ? 'Desligar' : 'Ligar'}
      </button>
    </div>
  )
}

render(<Toggle />)`,
  },
  {
    id: "input",
    title: "Input Controlado",
    description: "Input com preview em tempo real",
    category: "Formulários",
    defaultCode: `function InputPreview() {
  const [text, setText] = React.useState('')

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite algo..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">Preview:</p>
        <p className="text-xl font-bold">
          {text || 'Nada digitado ainda'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Caracteres: {text.length}
        </p>
      </div>
    </div>
  )
}

render(<InputPreview />)`,
  },
  {
    id: "list",
    title: "Lista Dinâmica",
    description: "Adicionar e remover itens de uma lista",
    category: "Arrays",
    defaultCode: `function TodoList() {
  const [items, setItems] = React.useState([
    'Aprender React',
    'Construir projeto'
  ])
  const [input, setInput] = React.useState('')

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input])
      setInput('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          placeholder="Nova tarefa..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Adicionar
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li 
            key={i}
            className="flex justify-between items-center p-3 bg-gray-100 rounded"
          >
            <span>{item}</span>
            <button
              onClick={() => setItems(items.filter((_, index) => index !== i))}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

render(<TodoList />)`,
  },
];
