import { useState } from 'react'
import { registrarStaff } from './data.js'
import { CloseIcon } from './icons.jsx'

function StaffSettingsModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('account')

  if (!isOpen) return null

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPwError('')
    setPwSuccess('')
    if (!currentPassword.trim()) {
      setPwError('Please enter your current password.')
      return
    }
    if (newPassword.length < 8) {
      setPwError('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPwError('New password and confirmation do not match.')
      return
    }
    setPwSuccess('Password updated successfully.')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const tabs = [
    { id: 'account', label: 'Account Info' },
    { id: 'password', label: 'Change Password' },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="staff-settings-title"
    >
      <div
        className="w-full max-w-[480px] rounded-2xl bg-white shadow-2xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e7dfd0] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-[#073b23] text-[13px] font-extrabold text-[#d8c39a] ring-2 ring-[#e7dfd0]">
              {registrarStaff.avatar}
            </div>
            <div>
              <h3
                id="staff-settings-title"
                className="font-display text-[17px] font-extrabold tracking-tight text-[#073b23] leading-tight"
              >
                Staff Settings
              </h3>
              <p className="text-[11px] font-medium text-[#7a7a6d]">{registrarStaff.title}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-[#7a7a6d] transition-colors hover:bg-[#f7f3eb] hover:text-[#1f2d24]"
            aria-label="Close settings"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        {/* Tab Nav */}
        <div className="flex border-b border-[#e7dfd0] px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setActiveTab(tab.id); setPwError(''); setPwSuccess('') }}
              className={`mr-4 py-3 text-[12px] font-bold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#073b23] text-[#073b23]'
                  : 'border-transparent text-[#7a7a6d] hover:text-[#1f2d24]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Account Info Tab */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
                Account Information
              </p>
              <div className="rounded-xl border border-[#e7dfd0] bg-[#fbf9f5] divide-y divide-[#e7dfd0]">
                {[
                  { label: 'Full Name', value: registrarStaff.name },
                  { label: 'Title / Role', value: registrarStaff.title },
                  { label: 'Office', value: registrarStaff.office },
                  { label: 'Staff ID', value: registrarStaff.staffId },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] font-semibold text-[#7a7a6d]">{label}</span>
                    <span className="text-[13px] font-bold text-[#1f2d24]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[#e7dfd0] bg-[#f7f3eb] p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a7344] mb-2">
                  Display Preferences
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-[#1f2d24]">Interface Theme</p>
                    <p className="text-[11px] text-[#7a7a6d]">Classic light mode (Green & Beige)</p>
                  </div>
                  <span className="rounded-full bg-[#073b23] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#d8c39a]">
                    Active
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-[#1f2d24]">Language</p>
                    <p className="text-[11px] text-[#7a7a6d]">English (Philippines)</p>
                  </div>
                  <span className="rounded-full border border-[#e7dfd0] bg-white px-3 py-1 text-[10px] font-bold text-[#6e7368]">
                    Default
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a7344]">
                Change Password
              </p>

              {[
                { id: 'cp-current', label: 'Current Password', value: currentPassword, setter: setCurrentPassword },
                { id: 'cp-new', label: 'New Password', value: newPassword, setter: setNewPassword },
                { id: 'cp-confirm', label: 'Confirm New Password', value: confirmPassword, setter: setConfirmPassword },
              ].map(({ id, label, value, setter }) => (
                <div key={id}>
                  <label htmlFor={id} className="mb-1.5 block text-[12px] font-bold text-[#1f2d24]">
                    {label} <span className="text-[#8a7344]">*</span>
                  </label>
                  <input
                    id={id}
                    type="password"
                    value={value}
                    onChange={(e) => { setter(e.target.value); setPwError(''); setPwSuccess('') }}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-[#e7dfd0] bg-white px-3.5 py-2.5 text-[13px] text-[#1f2d24] placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#073b23] focus:ring-2 focus:ring-[#073b23]/15"
                  />
                </div>
              ))}

              {pwError && (
                <p className="text-[11px] font-semibold text-[#8a7344]">{pwError}</p>
              )}
              {pwSuccess && (
                <p className="text-[11px] font-semibold text-[#15803d]">{pwSuccess}</p>
              )}

              <div className="flex justify-end gap-3 pt-2 border-t border-[#e7dfd0]">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-[#e7dfd0] bg-white px-4 py-2 text-[13px] font-semibold text-[#6e7368] transition-colors hover:bg-[#f7f3eb] hover:text-[#1f2d24]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#073b23] px-5 py-2 text-[13px] font-bold text-white shadow-xs transition-all hover:bg-[#042916] active:scale-95"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaffSettingsModal
