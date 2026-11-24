import { useState } from 'react'
import {
  cardClass,
  eyebrowClass,
  fieldControlClass,
  fieldLabelClass,
  pageTitleClass,
  subTextClass,
} from './classes.js'

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
      <div className="mb-5 border-b border-[#E7DFD0] pb-4">
        <p className={eyebrowClass}>New Request</p>
        <h2 className={pageTitleClass}>Request for {service.name}</h2>
        <p className={subTextClass}>
          Account information is taken from your student profile and cannot be edited.
        </p>
      </div>

      <section aria-labelledby="student-information-title">
        <h3 id="student-information-title" className="mb-3 font-display text-[15px] font-extrabold tracking-tight text-[#073B23]">
          Student Information
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {readOnlyFields.map(([label, value]) => (
            <label className="block" key={label}>
              <span className={fieldLabelClass}>{label}</span>
              <input
                className={`${fieldControlClass} cursor-default bg-[#FBF9F5] text-[#8A7344]`}
                readOnly
                value={value}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="mt-6" aria-labelledby="request-information-title">
        <h3 id="request-information-title" className="mb-3 font-display text-[15px] font-extrabold tracking-tight text-[#073B23]">
          Request Information
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={fieldLabelClass}>Academic Year</span>
            <input
              className={fieldControlClass}
              name="academicYear"
              onChange={handleChange}
              placeholder="e.g. 2023 - 2024"
              value={values.academicYear}
            />
            {errors.academicYear && (
              <span className="mt-1.5 block text-[12px] font-semibold text-[#8A7344]">{errors.academicYear}</span>
            )}
          </label>

          <label className="block">
            <span className={fieldLabelClass}>Semester</span>
            <input
              className={fieldControlClass}
              name="semester"
              onChange={handleChange}
              placeholder="e.g. 1st Semester"
              value={values.semester}
            />
            {errors.semester && (
              <span className="mt-1.5 block text-[12px] font-semibold text-[#8A7344]">{errors.semester}</span>
            )}
          </label>

          <label className="block sm:col-span-2">
            <span className={fieldLabelClass}>Purpose of Request</span>
            <textarea
              className={`${fieldControlClass} min-h-[86px] resize-y`}
              name="purpose"
              onChange={handleChange}
              placeholder="State the purpose of your request."
              value={values.purpose}
            />
            {errors.purpose && (
              <span className="mt-1.5 block text-[12px] font-semibold text-[#8A7344]">{errors.purpose}</span>
            )}
          </label>

          <label className="block sm:col-span-2">
            <span className={fieldLabelClass}>Additional Remarks (Optional)</span>
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

      <div className="mt-6 flex flex-col gap-3 border-t border-[#E7DFD0] pt-4 sm:flex-row sm:items-center sm:justify-end">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E7DFD0] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#073B23] transition-all duration-150 hover:bg-[#FBF9F5] active:scale-[0.98]"
          type="button"
          onClick={() => {
            setValues(emptyValues)
            setErrors({})
          }}
        >
          Clear Form
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#073B23] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#0A4B2D] active:scale-[0.98]"
          type="submit"
        >
          Submit Request
        </button>
        <button
          className="inline-flex items-center justify-center px-3 py-2.5 text-[13px] font-semibold text-[#8A7344] transition-colors hover:text-[#073B23]"
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
