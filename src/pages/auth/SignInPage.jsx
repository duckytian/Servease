import { useState } from 'react'
import ServEaseMark from '../../components/ServEaseMark'
import {
  authButtonClass,
  fieldErrorClass,
  fieldLabelClass,
  inputClass,
  inputErrorClass,
  passwordToggleClass,
  selectClass,
} from '../../components/auth/authClasses'
import AuthLayout from '../../components/layout/AuthLayout.jsx'

const userIdPattern = /^[A-Za-z0-9-]{6,20}$/
const roleIdNames = {
  Student: 'Student ID',
  Registrar: 'Registrar ID',
  IT: 'IT ID',
  OSAS: 'OSAS ID',
}
const userRoles = Object.keys(roleIdNames)

function validate(values) {
  const errors = {}
  const idName = roleIdNames[values.role] ?? 'Student ID'
  const userId = values.userId.trim()

  if (!userId) {
    errors.userId = `${idName} is required.`
  } else if (!userIdPattern.test(userId)) {
    errors.userId = `Enter a valid ${idName} using 6–20 letters, numbers, or hyphens.`
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return errors
}

function SignInPage({ onSignIn, onNavigate }) {
  const [values, setValues] = useState({ role: 'Student', userId: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)

    if (submitted) {
      setErrors(validate(nextValues))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSignIn({ role: values.role, userId: values.userId.trim() })
  }

  return (
    <AuthLayout activePage="sign-in" onNavigate={onNavigate}>
      <div className="text-center">
        <ServEaseMark className="mx-auto mb-[12px] h-[56px] w-[56px] text-[var(--forest)]" />
        <p className="text-[28px] font-bold leading-none tracking-[-0.8px] text-[var(--forest)]">
          ServEase
        </p>
        <p className="mt-[7px] text-[10px] font-semibold tracking-[3px] text-[#857f6d]">
          SERVICE + EASE
        </p>
      </div>

      <form className="mt-[36px] flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="user-role" className={fieldLabelClass}>
            USER PORTAL
          </label>
          <select
            id="user-role"
            name="role"
            value={values.role}
            onChange={handleChange}
            className={selectClass}
          >
            {userRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="user-id" className={fieldLabelClass}>
            {roleIdNames[values.role].toUpperCase()}
          </label>
          <input
            id="user-id"
            name="userId"
            type="text"
            autoComplete="username"
            placeholder={`Enter your ${roleIdNames[values.role]}`}
            value={values.userId}
            onChange={handleChange}
            aria-invalid={Boolean(errors.userId)}
            aria-describedby={errors.userId ? 'user-id-error' : undefined}
            className={`${inputClass} px-[16px] ${errors.userId ? inputErrorClass : ''}`}
          />
          {errors.userId && (
            <p id="user-id-error" role="alert" className={fieldErrorClass}>
              {errors.userId}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className={fieldLabelClass}>
            PASSWORD
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`${inputClass} pl-[16px] pr-[66px] ${errors.password ? inputErrorClass : ''}`}
            />
            <button
              className={passwordToggleClass}
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" role="alert" className={fieldErrorClass}>
              {errors.password}
            </p>
          )}
        </div>

        <button className={authButtonClass} type="submit">
          LOGIN
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignInPage
