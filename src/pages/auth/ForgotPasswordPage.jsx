import { useState } from 'react'
import ServEaseMark from '../../components/ServEaseMark'
import {
  authButtonClass,
  authTextButtonClass,
  fieldErrorClass,
  fieldLabelClass,
  inputClass,
  inputErrorClass,
} from '../../components/auth/authClasses'
import AuthLayout from '../../components/layout/AuthLayout.jsx'

function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setError('Email address is required.')
      return
    }

    setError('')
    setSent(true)
  }

  return (
    <AuthLayout activePage="forgot-password" onNavigate={onNavigate}>
      <div className="text-center">
        <ServEaseMark className="mx-auto mb-[12px] h-[56px] w-[56px] text-[#073B23]" />
        <p className="text-[26px] font-bold leading-none tracking-[-0.8px] text-[#073B23]">
          Reset Password
        </p>
        <p className="mt-[10px] text-[12px] leading-[1.6] text-[#77786F]">
          Enter your account email and we will send reset instructions.
        </p>
      </div>

      <form className="mt-[30px] flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="reset-email" className={fieldLabelClass}>
            EMAIL ADDRESS
          </label>
          <input
            id="reset-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setSent(false)
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'reset-email-error' : undefined}
            className={`${inputClass} px-[16px] ${error ? inputErrorClass : ''}`}
          />
          {error && (
            <p id="reset-email-error" role="alert" className={fieldErrorClass}>
              {error}
            </p>
          )}
        </div>

        {sent && (
          <p className="rounded-[9px] bg-[#F4F2ED] px-[14px] py-[12px] text-[11px] font-semibold leading-[1.6] text-[#16843F]">
            Reset instructions have been sent. Check your inbox.
          </p>
        )}

        <button className={authButtonClass} type="submit">
          SEND RESET LINK
        </button>
      </form>

      <button className={`${authTextButtonClass} mt-[24px] self-center`} type="button" onClick={() => onNavigate('sign-in')}>
        Back to Sign In
      </button>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
