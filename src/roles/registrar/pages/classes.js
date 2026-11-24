export const cardClass =
  'rounded-xl border border-[#e7dfd0] bg-white p-4 shadow-[0_4px_16px_rgba(7,59,35,0.04)] sm:p-5'

export const cardHeaderClass =
  'text-[17px] font-extrabold tracking-[-0.2px] text-[#073b23] font-display'

export const subTextClass = 'text-[12px] text-[#6e7368]'

export const fieldLabelClass =
  'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.8px] text-[#8a7344]'

export const inputClass =
  'w-full rounded-lg border border-[#e7dfd0] bg-white px-3.5 py-2.5 text-[13px] text-[#1f2d24] placeholder:text-[#9ca3af] outline-none transition-all duration-150 focus:border-[#073b23] focus:ring-2 focus:ring-[#073b23]/15'

export const selectClass =
  'w-full rounded-lg border border-[#e7dfd0] bg-white px-3.5 py-2.5 text-[13px] text-[#1f2d24] outline-none transition-all duration-150 focus:border-[#073b23] focus:ring-2 focus:ring-[#073b23]/15'

export const buttonPrimary =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#073b23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#042916] active:scale-[0.98]'

export const buttonForest =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#073b23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#042916] active:scale-[0.98]'

export const buttonSecondary =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-[#e7dfd0] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#073b23] transition-all duration-150 hover:bg-[#f7f3eb] active:scale-[0.98]'

export const buttonBeige =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#8a7344] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#6e5d38] active:scale-[0.98]'

/* Strict Palette Status Badges: Green, Beige, White */
export const statusBadgeClasses = {
  pending: 'bg-[#f7eed9] text-[#7a5b18] border border-[#eadbbd]',
  processing: 'bg-[#edf5ee] text-[#0a4b2d] border border-[#cde5d2]',
  completed: 'bg-[#e4efe5] text-[#073b23] border border-[#bce2c5]',
  rejected: 'bg-[#f0ece3] text-[#4a473f] border border-[#ddd6c8]',
}

export const statusDotClasses = {
  pending: 'bg-[#8a7344]',
  processing: 'bg-[#0a4b2d]',
  completed: 'bg-[#15803d]',
  rejected: 'bg-[#6e7368]',
}

export const statCardStyles = {
  total: {
    bg: 'bg-[#073b23]',
    title: 'Total Requests',
    textColor: 'text-white',
  },
  pending: {
    bg: 'bg-[#8a7344]',
    title: 'Pending',
    textColor: 'text-white',
  },
  processing: {
    bg: 'bg-[#0a4b2d]',
    title: 'Processing',
    textColor: 'text-white',
  },
  completed: {
    bg: 'bg-[#15803d]',
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