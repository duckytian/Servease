import handshakeLogo from '../assets/Glossy Handshake Checkmark Logo.png'

function ServEaseMark({ className = '', ...props }) {
  return (
    <img
      src={handshakeLogo}
      alt=""
      aria-hidden="true"
      className={`brand-mark object-contain ${className}`.trim()}
      {...props}
    />
  )
}

export default ServEaseMark
