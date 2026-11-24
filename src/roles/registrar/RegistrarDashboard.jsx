import DashboardOverview from './pages/DashboardOverview.jsx'
import { eyebrowClass } from './pages/classes.js'
import { registrar, requests, statuses } from './pages/data.js'
import { CalendarIcon, CheckIcon, ClockIcon, ListIcon } from './pages/icons.jsx'

function RegistrarDashboard({ user }) {
  const statusCounts = statuses.reduce((counts, status) => {
    counts[status] = requests.filter((request) => request.status === status).length
    return counts
  }, {})

  const summaryCards = [
    {
      title: 'Total Requests',
      count: requests.length,
      description: 'All registrar service requests.',
      tone: 'total',
      Icon: CalendarIcon,
    },
    {
      title: 'Pending Requests',
      count: statusCounts.Pending,
      description: 'Requests awaiting review.',
      tone: 'pending',
      Icon: ClockIcon,
    },
    {
      title: 'Processing Requests',
      count: statusCounts.Processing,
      description: 'Requests currently being handled.',
      tone: 'processing',
      Icon: ListIcon,
    },
    {
      title: 'Completed Requests',
      count: statusCounts.Completed,
      description: 'Successfully completed requests.',
      tone: 'completed',
      Icon: CheckIcon,
    },
  ]

  return (
    <div className="min-h-screen min-h-svh bg-[#f7f3eb] text-[14px] text-[var(--text)]">
      <main className="mx-auto w-full max-w-[1400px] px-5 pb-11 pt-6 min-[901px]:px-9 min-[901px]:pb-[52px] min-[901px]:pt-8">
        <div className="mb-7">
          <p className={eyebrowClass}>Registrar Dashboard</p>
          <h1 className="text-[20px] font-bold leading-[1.35] text-[var(--text)] min-[641px]:text-[24px]">
            Welcome! {registrar.name} | Registrar ID: {user?.userId ?? registrar.id}
          </h1>
          <p className="mt-2 text-[12px] text-[var(--muted)]">
            Here is the latest activity across registrar service requests.
          </p>
        </div>

        <DashboardOverview
          requests={requests}
          statusCounts={statusCounts}
          summaryCards={summaryCards}
        />
      </main>
    </div>
  )
}

export default RegistrarDashboard
