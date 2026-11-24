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
      <div className="mb-[18px] border-b border-[#E3E8E5] pb-[14px]">
        <p className={eyebrowClass}>New Request</p>
        <h2 className={headingClass}>Request for {service.name}</h2>
        <p className="mt-1 text-[11px] text-[#77786F]">
          Account information is taken from your student profile and cannot be edited.
        </p>
      </div>

      <section aria-labelledby="student-information-title">
        <h3 id="student-information-title" className="mb-3 text-[13px] font-bold text-[#073B23]">
          Student Information
        </h3>
        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2">
          {readOnlyFields.map(([label, value]) => (
            <label className="block" key={label}>
              <span className="mb-[6px] block text-[11px] font-bold text-[#77786F]">{label}</span>
              <input
                className={`${fieldControlClass} cursor-default bg-[#F7F5F0] text-[#77786F]`}
                readOnly
                value={value}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="mt-6" aria-labelledby="request-information-title">
        <h3 id="request-information-title" className="mb-3 text-[13px] font-bold text-[#073B23]">
          Request Information
        </h3>
        <div className="grid grid-cols-1 gap-3 min-[641px]:grid-cols-2">
          <label className="block">
            <span className="mb-[6px] block text-[11px] font-bold text-[#073B23]">Academic Year</span>
            <input
              className={fieldControlClass}
              name="academicYear"
              onChange={handleChange}
              placeholder="e.g. 2023 - 2024"
              value={values.academicYear}
            />
            {errors.academicYear && (
              <span className="mt-1 block text-[11px] text-[#9B422F]">{errors.academicYear}</span>
            )}
          </label>

          <label className="block">
            <span className="mb-[6px] block text-[11px] font-bold text-[#073B23]">Semester</span>
            <input
              className={fieldControlClass}
              name="semester"
              onChange={handleChange}
              placeholder="e.g. 1st Semester"
              value={values.semester}
            />
            {errors.semester && (
              <span className="mt-1 block text-[11px] text-[#9B422F]">{errors.semester}</span>
            )}
          </label>

          <label className="block min-[641px]:col-span-2">
            <span className="mb-[6px] block text-[11px] font-bold text-[#073B23]">Purpose of Request</span>
            <textarea
              className={`${fieldControlClass} min-h-[86px] resize-y`}
              name="purpose"
              onChange={handleChange}
              placeholder="State the purpose of your request."
              value={values.purpose}
            />
            {errors.purpose && (
              <span className="mt-1 block text-[11px] text-[#9B422F]">{errors.purpose}</span>
            )}
          </label>

          <label className="block min-[641px]:col-span-2">
            <span className="mb-[6px] block text-[11px] font-bold text-[#073B23]">
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

      <div className="mt-6 flex flex-row items-center justify-end gap-3 border-t border-[#E3E8E5] pt-[18px]">
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E3E8E5] bg-white px-5 text-[12px] font-bold text-[#073B23] transition-colors duration-150 hover:bg-[#F7F5F0]"
          type="button"
          onClick={() => {
            setValues(emptyValues)
            setErrors({})
          }}
        >
          Clear Form
        </button>
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg border-0 bg-[#073B23] px-5 text-[12px] font-bold text-white transition-colors duration-150 hover:bg-[#0A4B2D]"
          type="submit"
        >
          Submit Request
        </button>
        <button
          className="inline-flex h-10 items-center justify-center px-3 text-[12px] font-semibold text-[#77786F] hover:text-[#0A4B2D]"
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
