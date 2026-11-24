import { registrarStaff } from '../pages/data.js'
import { InfoIcon, StudentPortalIcon } from '../pages/icons.jsx'

function RegistrarTopbar({
  activeNav,
  onNavigate,
  onOpenTechStackModal,
  onSwitchToStudentView,
  onOpenStaffSettings,
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e7dfd0] bg-white/95 px-6 backdrop-blur-md">
      {/* Welcome Title */}
      <div className="flex flex-col">
        <h1 className="font-display text-[19px] font-extrabold tracking-tight text-[#073b23] leading-tight sm:text-[21px]">
          Welcome, {registrarStaff.name}!
        </h1>
        <p className="text-[12px] font-medium text-[#7a7a6d]">
          {registrarStaff.office} &bull; Student Service Request Management
        </p>
      </div>

      {/* Right Actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Tech Stack & Workflow Button */}
        <button
          type="button"
          onClick={onOpenTechStackModal}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#e7dfd0] bg-[#fbf9f5] px-3 py-1.5 text-[12px] font-semibold text-[#073b23] transition-all hover:border-[#073b23] hover:bg-white"
          title="View Tech Stack & Request Status Workflow"
        >
          <InfoIcon className="size-4 text-[#8a7344]" />
          <span className="hidden md:inline">Tech Stack &amp; Workflow</span>
        </button>

        {/* View Mode Toggle Pill */}
        <div className="flex items-center rounded-lg border border-[#e7dfd0] bg-[#f7f3eb] p-1 text-[12px] font-semibold">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`rounded-md px-3 py-1 transition-all ${
              activeNav !== 'student-view'
                ? 'bg-white font-bold text-[#073b23] shadow-xs'
                : 'text-[#6e7368] hover:text-[#073b23]'
            }`}
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={onSwitchToStudentView}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 transition-all ${
              activeNav === 'student-view'
                ? 'bg-[#073b23] font-bold text-white shadow-xs'
                : 'text-[#6e7368] hover:text-[#073b23]'
            }`}
            title="Check live student view"
          >
            <StudentPortalIcon className="size-3.5" />
            <span>Student View</span>
          </button>
        </div>

        {/* Staff Profile Avatar Card – click to open Staff Settings */}
        <button
          type="button"
          onClick={onOpenStaffSettings}
          title="Registrar Staff Settings"
          className="flex items-center gap-2.5 pl-2 border-l border-[#e7dfd0] rounded-lg p-1.5 transition-colors hover:bg-[#f7f3eb] focus:outline-none focus:ring-2 focus:ring-[#073b23]/20"
        >
          <div className="grid size-9 place-items-center rounded-full bg-[#073b23] text-[12px] font-extrabold text-[#d8c39a] ring-2 ring-[#e7dfd0]">
            {registrarStaff.avatar}
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-[13px] font-bold leading-none text-[#1f2d24]">
              {registrarStaff.name}
            </span>
            <span className="mt-1 text-[11px] font-medium leading-none text-[#7a7a6d]">
              {registrarStaff.title}
            </span>
          </div>
        </button>
      </div>
    </header>
  )
}

export default RegistrarTopbar
