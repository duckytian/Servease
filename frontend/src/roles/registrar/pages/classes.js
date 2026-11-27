export const cardClass =
  'rounded-xl border border-[#E7DFD0] bg-white p-4 shadow-[0_4px_16px_rgba(7,59,35,0.04)] sm:p-5'

export const cardHeaderClass =
  'text-[17px] font-extrabold tracking-[-0.2px] text-[#073B23] font-display'

export const subTextClass = 'text-[12px] text-[#77786F]'

export const fieldLabelClass =
  'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.8px] text-[#8A7344]'

export const inputClass =
  'w-full rounded-lg border border-[#E7DFD0] bg-white px-3.5 py-2.5 text-[13px] text-[#073B23] placeholder:text-[#77786F] outline-none transition-all duration-150 focus:border-[#073B23] focus:ring-2 focus:ring-[#073B23]/15'

export const selectClass =
  'w-full rounded-lg border border-[#E7DFD0] bg-white px-3.5 py-2.5 text-[13px] text-[#073B23] outline-none transition-all duration-150 focus:border-[#073B23] focus:ring-2 focus:ring-[#073B23]/15'

export const buttonPrimary =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#073B23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#0A4B2D] active:scale-[0.98]'

export const buttonForest =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#073B23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#0A4B2D] active:scale-[0.98]'

export const buttonSecondary =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-[#E7DFD0] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#073B23] transition-all duration-150 hover:bg-[#F4F2ED] active:scale-[0.98]'

export const buttonBeige =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#8A7344] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#8A7344] active:scale-[0.98]'

/* Strict Palette Status Badges: Green, Beige, White */
export const statusBadgeClasses = {
  pending: 'bg-[#F4F2ED] text-[#8A7344] border border-[#E7DFD0]',
  processing: 'bg-[#F4F2ED] text-[#0A4B2D] border border-[#E7DFD0]',
  completed: 'bg-[#F4F2ED] text-[#073B23] border border-[#E7DFD0]',
  rejected: 'bg-[#F4F2ED] text-[#77786F] border border-[#E7DFD0]',
}

export const statusDotClasses = {
  pending: 'bg-[#8A7344]',
  processing: 'bg-[#0A4B2D]',
  completed: 'bg-[#16843F]',
  rejected: 'bg-[#77786F]',
}

export const statCardStyles = {
  total: {
    bg: 'bg-[#073B23]',
    title: 'Total Requests',
    textColor: 'text-white',
  },
  pending: {
    bg: 'bg-[#8A7344]',
    title: 'Pending',
    textColor: 'text-white',
  },
  processing: {
    bg: 'bg-[#0A4B2D]',
    title: 'Processing',
    textColor: 'text-white',
  },
  completed: {
    bg: 'bg-[#16843F]',
    title: 'Completed',
    textColor: 'text-white',
  },
}

export function getStatusKey(status) {
  if (!status) return 'pending'
  const s = status.toLowerCase()
  if (s.includes('pend')) return 'pending'
  if (s.includes('proc')) return 'processing'
  if (s.includes('comp') || s.includes('ready') || s.includes('appr')) return 'completed'
  if (s.includes('rej') || s.includes('deni')) return 'rejected'
  return 'pending'
}