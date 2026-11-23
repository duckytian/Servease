import campusImage from '../../assets/Modern University Courtyard Walkway.png'
import AuthShowcase from '../auth/AuthShowcase'
import AuthNavPanel from './AuthNavPanel'

const backgroundStyle = {
  backgroundImage: `url("${campusImage}")`,
}

function AuthLayout({ children, activePage, onNavigate }) {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#1c5c43]">
      <div
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center bg-no-repeat brightness-[0.74]"
        style={backgroundStyle}
      />
      <div className="absolute inset-0 z-0 bg-[#062b1f]/45" />

      <div className="relative z-[1] flex min-h-[100svh] flex-col items-center justify-center px-4 py-8 sm:px-6 lg:py-10">
        <div className="grid w-full max-w-[1120px] overflow-hidden rounded-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:min-h-[600px] lg:grid-cols-[42%_46%_12%]">
          <AuthShowcase />

          <section className="flex flex-col justify-center bg-white px-[clamp(28px,3.4vw,56px)] py-[clamp(32px,4vh,56px)]">
            {children}
          </section>

          <AuthNavPanel activePage={activePage} onNavigate={onNavigate} />
        </div>

        <footer className="mt-5 text-center text-[11px] font-medium text-white/65">
          ServEase – Student Service Request and Department Management System
        </footer>
      </div>
    </div>
  )
}

export default AuthLayout
