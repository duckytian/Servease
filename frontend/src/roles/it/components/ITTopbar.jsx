import { itStaff } from '../pages/data.js'

function ITTopbar({ user }) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-3 border-b border-[#E7DFD0] bg-white/95 px-4 backdrop-blur-md sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate font-display text-[18px] font-extrabold tracking-tight text-[#073B23] sm:text-[21px]">
          Welcome, {user?.name ?? itStaff.name}!
        </h1>
        <p className="mt-0.5 truncate text-[11px] font-medium text-[#6E7368] sm:text-[12px]">
          {itStaff.office} &bull; Technical Request Management
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-l border-[#E7DFD0] pl-4">
        <div
          className="grid size-9 place-items-center rounded-full bg-[#073B23] text-[12px] font-extrabold text-[#8A7344] ring-2 ring-[#E7DFD0]"
          title={user?.userId || itStaff.staffId}
        >
          {itStaff.avatar}
        </div>
        <div className="hidden flex-col sm:flex">
          <span className="text-[13px] font-bold leading-none text-[#073B23]">
            {user?.userId || itStaff.staffId}
          </span>
          <span className="mt-1 text-[11px] text-[#6E7368]">{itStaff.title}</span>
        </div>
      </div>
    </header>
  )
}

export default ITTopbar
