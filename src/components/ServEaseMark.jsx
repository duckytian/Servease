function ServEaseMark({ className = '', accent = '#79B98D', ...props }) {
  return (
    <svg
      className={`brand-mark ${className}`.trim()}
      viewBox="0 0 64 64"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <circle cx="32" cy="32" r="27" fill="currentColor" opacity="0.08" />

      <path
        d="M12.5 20.5a24 24 0 0 1 38.2-1.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M51.5 43a24 24 0 0 1-38.3 1.7"
        fill="none"
        stroke={accent}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      <path
        d="m23.5 22 6 6 11.5-12.5"
        fill="none"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M7.5 41.5 16 33h8.6l8.4 7.6-5.8 5.8-7.4-6.3h-5.4l-6.9 6.9Z"
        fill="currentColor"
      />
      <path
        d="M56.5 41.5 48 33h-8.6L31 40.6l5.8 5.8 7.4-6.3h5.4l6.9 6.9Z"
        fill="currentColor"
        opacity="0.88"
      />
      <path d="M25.5 36.5 32 31l6.5 5.5-6.5 6.2Z" fill={accent} opacity="0.92" />
    </svg>
  )
}

export default ServEaseMark
