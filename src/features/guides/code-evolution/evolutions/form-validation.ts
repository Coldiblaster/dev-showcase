import type { Evolution } from "../types";

export const FORM_VALIDATION: Evolution = {
  id: "form-validation",
  language: "tsx",
  steps: [
    {
      id: "f1",
      commitMessage: "feat: add login form",
      branch: "feature/login",
      level: "bad",
      highlights: [4, 5, 7, 17, 18],
      metrics: [
        { before: "23", after: "23", improved: false },
        { before: "1/10", after: "1/10", improved: false },
        { before: "0/10", after: "0/10", improved: false },
      ],
      code: `function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if (!email || !password) {
      alert('Preencha todos os campos')
      return
    }
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="email" type="email" />
      <input id="password" type="password" />
      <button type="submit">Entrar</button>
    </form>
  )
}`,
    },
    {
      id: "f2",
      commitMessage: "refactor: controlled inputs with validation",
      branch: "refactor/controlled-form",
      level: "better",
      highlights: [2, 3, 5, 22, 29],
      metrics: [
        { before: "23", after: "36", improved: false },
        { before: "1/10", after: "5/10", improved: true },
        { before: "0/10", after: "2/10", improved: true },
      ],
      code: `function LoginForm() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!values.email.includes('@')) errs.email = 'Email inválido'
    if (values.password.length < 6) errs.password = 'Mínimo 6 caracteres'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(values)
    })
  }

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value })

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <p>{errors.email}</p>}
      <input name="password" type="password"
        value={values.password} onChange={handleChange} />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit">Entrar</button>
    </form>
  )
}`,
    },
    {
      id: "f3",
      commitMessage: "refactor: use React Hook Form",
      branch: "refactor/react-hook-form",
      level: "good",
      highlights: [1, 4, 8, 18, 29],
      metrics: [
        { before: "36", after: "34", improved: true },
        { before: "5/10", after: "8/10", improved: true },
        { before: "2/10", after: "5/10", improved: true },
      ],
      code: `import { useForm } from 'react-hook-form'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', {
        required: 'Email obrigatório',
        pattern: { value: /\S+@\S+/, message: 'Email inválido' }
      })} type="email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register('password', {
        required: 'Senha obrigatória',
        minLength: { value: 6, message: 'Mínimo 6 caracteres' }
      })} type="password" />
      {errors.password && <p>{errors.password.message}</p>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Enviando...' : 'Entrar'}
      </button>
    </form>
  )
}`,
    },
    {
      id: "f4",
      commitMessage: "refactor: add Zod schema validation",
      branch: "main",
      level: "great",
      highlights: [2, 3, 5, 10, 17],
      metrics: [
        { before: "34", after: "38", improved: false },
        { before: "8/10", after: "10/10", improved: true },
        { before: "5/10", after: "10/10", improved: true },
      ],
      code: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginData = z.infer<typeof schema>

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: LoginData) => {
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register('password')} type="password" />
      {errors.password && <p>{errors.password.message}</p>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Enviando...' : 'Entrar'}
      </button>
    </form>
  )
}`,
    },
  ],
};
