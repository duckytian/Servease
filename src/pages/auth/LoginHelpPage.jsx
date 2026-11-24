import ServEaseMark from '../../components/ServEaseMark'
import { authButtonClass } from '../../components/auth/authClasses'
import AuthLayout from '../../components/layout/AuthLayout.jsx'

const helpTopics = [
  {
    title: 'Forgot your ID?',
    detail: 'Contact your department office to confirm the ID number linked to your account.',
  },
  {
    title: 'Locked account',
    detail: 'For account issues, contact the appropriate school department for support.',
  },
  {
    title: 'Wrong portal',
    detail: 'Choose the correct user portal from the role selector on the sign-in form.',
  },
]

function LoginHelpPage({ onNavigate }) {
  return (
    <AuthLayout activePage="login-help" onNavigate={onNavigate}>
      <div className="text-center">
        <ServEaseMark className="mx-auto mb-[12px] h-[56px] w-[56px] text-[#073B23]" />
        <p className="text-[26px] font-bold leading-none tracking-[-0.8px] text-[#77786F]">
          Login Help
        </p>
        <p className="mt-[10px] text-[12px] leading-[1.6] text-[#77786F]">
          Common issues and reminders for accessing ServEase.
        </p>
      </div>

      <div className="mt-[28px] flex flex-col gap-[14px]">
        {helpTopics.map((topic) => (
          <div className="rounded-[10px] border border-[#E3E8E5] bg-[#FFFFFF] px-[16px] py-[14px]" key={topic.title}>
            <p className="text-[12px] font-bold text-[#073B23]">{topic.title}</p>
            <p className="mt-[5px] text-[11px] leading-[1.6] text-[#77786F]">{topic.detail}</p>
          </div>
        ))}
      </div>

      <button className={`${authButtonClass} mt-[28px]`} type="button" onClick={() => onNavigate('sign-in')}>
        Back to Sign In
      </button>
    </AuthLayout>
  )
}

export default LoginHelpPage
