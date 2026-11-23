import campusImage from '../../assets/Modern University Courtyard Walkway.png'

const backgroundStyle = {
  backgroundImage: `url("${campusImage}")`,
}

function AuthShowcase() {
  return (
    <section
      className="relative isolate flex min-h-[280px] flex-col justify-start overflow-hidden px-[clamp(28px,3.4vw,52px)] py-[clamp(30px,4vh,52px)] text-black lg:min-h-0"
      aria-labelledby="showcase-heading"
    >
      <div
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center bg-no-repeat"
        style={backgroundStyle}
      />

      <div className="relative z-[1] max-w-[520px]">
        <h1
          id="showcase-heading"
          className="text-[clamp(30px,3vw,46px)] font-extrabold leading-[1.1] tracking-[0.6px]"
        >
          STUDENT SERVICES,
          <br />
          MADE EASIER
        </h1>
        <p className="mt-[18px] text-[13px] leading-[1.75] text-black">
          Your centralized digital platform for convenient, organized, and reliable student services.
        </p>
      </div>
    </section>
  )
}

export default AuthShowcase
