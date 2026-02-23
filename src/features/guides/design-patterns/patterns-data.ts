/** Exemplos de código TypeScript para cada design pattern — antes e depois. */

export const OBSERVER_BEFORE = `// ❌ Antes: acoplamento direto entre componentes
function UserProfile() {
  const handleUpdate = () => {
    // Tem que chamar cada componente manualmente
    updateHeader(user);
    updateSidebar(user);
    updateNotifications(user);
    updateAnalytics(user);
  };
}`;

export const OBSERVER_AFTER = `// ✅ Depois: padrão Observer (EventEmitter)
class EventEmitter<T> {
  private listeners = new Map<string, Array<(data: T) => void>>();

  on(event: string, fn: (data: T) => void) {
    const existing = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...existing, fn]);
  }

  emit(event: string, data: T) {
    this.listeners.get(event)?.forEach((fn) => fn(data));
  }
}

const userEvents = new EventEmitter<User>();

// Qualquer componente pode ouvir sem acoplamento
userEvents.on("updated", (user) => updateHeader(user));
userEvents.on("updated", (user) => updateAnalytics(user));

// Emit — não sabe quem está ouvindo
userEvents.emit("updated", newUser);`;

export const STRATEGY_BEFORE = `// ❌ Antes: switch/case que cresce infinitamente
function sortData(data: Item[], method: string) {
  if (method === "name") {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (method === "price") {
    return data.sort((a, b) => a.price - b.price);
  } else if (method === "date") {
    return data.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  // Cada novo critério = modificar esta função
  return data;
}`;

export const STRATEGY_AFTER = `// ✅ Depois: padrão Strategy
type SortStrategy<T> = (a: T, b: T) => number;

const strategies: Record<string, SortStrategy<Item>> = {
  name: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.price - b.price,
  date: (a, b) => a.date.getTime() - b.date.getTime(),
};

function sortData(data: Item[], method: string) {
  const strategy = strategies[method];
  if (!strategy) return data;
  return [...data].sort(strategy);
}

// Adicionar novo critério = apenas nova entry no objeto
strategies.rating = (a, b) => b.rating - a.rating;`;

export const FACTORY_BEFORE = `// ❌ Antes: lógica de criação espalhada
function createButton(type: string) {
  if (type === "primary") {
    const btn = document.createElement("button");
    btn.className = "btn-primary";
    btn.style.backgroundColor = "#007bff";
    return btn;
  } else if (type === "danger") {
    const btn = document.createElement("button");
    btn.className = "btn-danger";
    btn.style.backgroundColor = "#dc3545";
    return btn;
  }
  // Duplicação em cada lugar que precisa criar botões
}`;

export const FACTORY_AFTER = `// ✅ Depois: Factory Method
interface Button {
  render(): HTMLElement;
  onClick(handler: () => void): void;
}

class PrimaryButton implements Button {
  render() {
    const btn = document.createElement("button");
    btn.className = "btn-primary";
    return btn;
  }
  onClick(handler: () => void) { /* ... */ }
}

class DangerButton implements Button { /* ... */ }

// Factory centraliza a lógica de criação
function createButton(type: "primary" | "danger"): Button {
  const buttonMap = {
    primary: PrimaryButton,
    danger: DangerButton,
  } as const;
  return new buttonMap[type]();
}`;

export const DECORATOR_BEFORE = `// ❌ Antes: herança para cada combinação
class Logger { log(msg: string) { console.log(msg); } }
class TimestampLogger extends Logger { /* ... */ }
class JsonLogger extends Logger { /* ... */ }
class TimestampJsonLogger extends Logger { /* ... */ }
// N funcionalidades = 2^N subclasses possíveis`;

export const DECORATOR_AFTER = `// ✅ Depois: Decorator — combine livremente
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) { console.log(message); }
}

class TimestampDecorator implements Logger {
  constructor(private logger: Logger) {}
  log(message: string) {
    this.logger.log(\`[\${new Date().toISOString()}] \${message}\`);
  }
}

class JsonDecorator implements Logger {
  constructor(private logger: Logger) {}
  log(message: string) {
    this.logger.log(JSON.stringify({ message, level: "info" }));
  }
}

// Combine livremente sem herança
const logger = new TimestampDecorator(
  new JsonDecorator(new ConsoleLogger())
);
logger.log("Usuário autenticado");`;

export const COMMAND_BEFORE = `// ❌ Antes: ações diretas sem histórico
function TextEditor() {
  const [text, setText] = useState("");

  const bold = () => setText(t => \`**\${t}**\`);
  const italic = () => setText(t => \`_\${t}_\`);
  // Impossível desfazer — não há histórico
}`;

export const COMMAND_AFTER = `// ✅ Depois: padrão Command com undo/redo
interface Command {
  execute(): void;
  undo(): void;
}

class BoldCommand implements Command {
  private previousText: string;
  constructor(private state: TextState) {
    this.previousText = state.text;
  }
  execute() { this.state.text = \`**\${this.previousText}**\`; }
  undo()    { this.state.text = this.previousText; }
}

class CommandHistory {
  private stack: Command[] = [];

  execute(cmd: Command) {
    cmd.execute();
    this.stack.push(cmd);
  }

  undo() {
    this.stack.pop()?.undo();
  }
}

const history = new CommandHistory();
history.execute(new BoldCommand(state));
history.undo(); // Desfaz o negrito`;
