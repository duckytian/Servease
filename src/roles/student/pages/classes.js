export const cardClass = 'rounded-xl border border-[var(--border)] bg-white p-4 shadow-[0_4px_14px_rgba(22,104,184,0.06)] min-[641px]:p-[22px]'
export const eyebrowClass = 'mb-[6px] text-[10px] font-bold uppercase tracking-[1.4px] text-[#8a7344]'
export const headingClass = 'text-[16px] font-bold text-[#052d1b]'
export const closeButtonClass = 'grid size-[30px] shrink-0 place-items-center rounded-lg border-0 bg-[#f3f0e8] text-[20px] leading-none text-[#6f7d70]'
export const modalClass = 'w-full max-w-[480px] rounded-[14px] bg-white p-6 shadow-[0_20px_50px_rgba(5,45,27,0.2)]'
export const modalButtonClass = 'mt-5 h-[42px] w-full rounded-lg border-0 bg-[var(--forest)] text-[12px] font-bold text-white transition-colors duration-200 hover:bg-[#052d1b]'
export const statusDotClass = 'inline-block size-2 shrink-0 rounded-full'
export const topNavButtonClass = "relative border-0 bg-transparent p-0 text-[13px] font-semibold text-[var(--muted)] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-[3px] after:content-['']"
export const fieldControlClass = 'w-full rounded-lg border border-[var(--border)] bg-white px-3 py-[11px] text-[12px] text-[var(--text)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--forest)] focus:shadow-[0_0_0_3px_rgba(7,59,35,0.1)]'

export const statusDotClasses = {
  pending: 'bg-[#c99b3f]',
  processing: 'bg-[#2f8f5b]',
  completed: 'bg-[var(--forest)]',
  rejected: 'bg-[#b85c4a]',
}

export const statusBadgeClasses = {
  pending: 'bg-[#f8efda] text-[#8a6a22]',
  processing: 'bg-[#e4f0e6] text-[#2f8f5b]',
  completed: 'bg-[#e4efe5] text-[var(--forest)]',
  rejected: 'bg-[#f7e4dd] text-[#9b422f]',
}

export const statusSegmentClasses = {
  pending: 'bg-[#c99b3f]',
  processing: 'bg-[#2f8f5b]',
  completed: 'bg-[var(--forest)]',
  rejected: 'bg-[#b85c4a]',
}

export const iconToneClasses = {
  total: 'bg-[#f3ead7] text-[var(--forest)]',
  pending: 'bg-[#f8efda] text-[#a57b25]',
  processing: 'bg-[#e4f0e6] text-[#2f8f5b]',
  completed: 'bg-[#e4efe5] text-[var(--forest)]',
}
