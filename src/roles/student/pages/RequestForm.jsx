import { useState } from 'react'
import { cardClass, eyebrowClass, fieldControlClass, headingClass } from './classes.js'

const emptyValues = {
  academicYear: '',
  semester: '',
  purpose: '',
  additionalRemarks: '',
}

function RequestForm({ service, profile, studentId, onSubmit, onCancel }) {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!values.academicYear.trim()) nextErrors.academicYear = 'Academic Year is required.'
    if (!values.semester.trim()) nextErrors.semester = 'Semester is required.'
    if (!values.purpose.trim()) nextErrors.purpose = 'Purpose of Request is required.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      academicYear: values.academicYear.trim(),
      semester: values.semester.trim(),
      purpose: values.purpose.trim(),
      additionalRemarks: values.additionalRemarks.trim(),
    })
  }

  const readOnlyFields = [
    ['Student ID', studentId],
    ['Year Level', profile.yearLevel],
    ['Full Name', profile.name],
    ['Email Address', profile.email],
    ['Course/Program', profile.course],
    ['Contact Number', profile.contactNo],
  ]

  return (
    <form className={cardClass} onSubmit={handleSubmit} noValidate>
      <div className="mb-[18px] border-b border-[var(--border-light)] pb-[14px]">
        <p className={eyebrowClass}>New Request</p>
        <h2 className={headingClass}>Request for {service.name}</h2>
        <p className="mt-1 text-[11px] text-[var(--muted)]">
          Account information is taken from your student profile and cannot be edited.
        </p>
      </div>

      <section aria-labelledby="student-information-title">
        <h3 id="student-information-title" className="mb-3 text-[13px] font-bold text-[var(--text)]">
          Student Information
        </h3>
        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2">
          {readOnlyFields.map(([label, value]) => (
            <label className="block" key={label}>
              <span className="mb-[6px] block text-[11px] font-bold text-[var(--muted)]">{label}</span>
              <input
                className={`${fieldControlClass} cursor-default bg-[#f7f5f0] text-[var(--muted)]`}
                readOnly
                value={value}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="mt-6" aria-labelledby="request-information-title">
        <h3 id="request-information-title" className="mb-3 text-[13px] font-bold text-[var(--text)]">
          Request Information
        </h3>
        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2">
          <label className="block">
            <span className="mb-[6px] block text-[11px] font-bold text-[var(--text)]">Academic Year</span>
            <input
              className={fieldControlClass}
              name="academicYear"
              onChange={handleChange}
              placeholder="e.g. 2023 - 2024"
              value={values.academicYear}
            />
            {errors.academicYear && (
              <span className="mt-1 block text-[11px] text-[#9b422f]">{errors.academicYear}</span>
            )}
          </label>

          <label className="block">
            <span className="mb-[6px] block text-[11px] font-bold text-[var(--text)]">Semester</span>
            <input
              className={fieldControlClass}
              name="semester"
              onChange={handleChange}
              placeholder="e.g. 1st Semester"
              value={values.semester}
            />
            {errors.semester && (
              <span className="mt-1 block text-[11px] text-[#9b422f]">{errors.semester}</span>
            )}
          </label>

          <label className="block min-[641px]:col-span-2">
            <span className="mb-[6px] block text-[11px] font-bold text-[var(--text)]">Purpose of Request</span>
            <textarea
              className={`${fieldControlClass} min-h-[86px] resize-y`}
              name="purpose"
              onChange={handleChange}
              placeholder="State the purpose of your request."
              value={values.purpose}
            />
            {errors.purpose && (
              <span className="mt-1 block text-[11px] text-[#9b422f]">{errors.purpose}</span>
            )}
          </label>

          <label className="block min-[641px]:col-span-2">
            <span className="mb-[6px] block text-[11px] font-bold text-[var(--text)]">
              Additional Remarks (Optional)
            </span>
            <textarea
              className={`${fieldControlClass} min-h-[70px] resize-y`}
              name="additionalRemarks"
              onChange={handleChange}
              placeholder="Add any details the registrar should know."
              value={values.additionalRemarks}
            />
          </label>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-3 border-t border-[var(--border-light)] pt-[18px] min-[641px]:flex-row min-[641px]:justify-end">
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-5 text-[12px] font-bold text-[var(--text)] transition-colors duration-150 hover:bg-[#f3f0e8]"
          type="button"
          onClick={() => {
            setValues(emptyValues)
            setErrors({})
          }}
        >
          Clear Form
        </button>
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg border-0 bg-[var(--forest)] px-5 text-[12px] font-bold text-white transition-colors duration-150 hover:bg-[#052d1b]"
          type="submit"
        >
          Submit Request
        </button>
        <button
          className="inline-flex h-10 items-center justify-center px-3 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--forest)] min-[641px]:mr-auto"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default RequestForm
