export const cardClass =
  'rounded-xl border border-[#e7dfd0] bg-white p-4 shadow-[0_4px_16px_rgba(7,59,35,0.04)] sm:p-5'

export const buttonForest =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#073b23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-[#042916] active:scale-[0.98]'

export const statusBadgeClasses = {
  pending: 'bg-[#f7eed9] text-[#7a5b18] border border-[#eadbbd]',
  processing: 'bg-[#edf5ee] text-[#0a4b2d] border border-[#cde5d2]',
  completed: 'bg-[#e4efe5] text-[#073b23] border border-[#bce2c5]',
  rejected: 'bg-[#f0ece3] text-[#4a473f] border border-[#ddd6c8]',
}

export function getStatusKey(status) {
  const value = String(status || '').toLowerCase()
  if (value.includes('proc')) return 'processing'
  if (value.includes('comp') || value.includes('resolve')) return 'completed'
  if (value.includes('rej')) return 'rejected'
  return 'pending'
}