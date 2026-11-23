const overlayClass = 'fixed inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.45)] p-5'

const dialogClass =
  'max-h-[calc(100vh-40px)] w-full max-w-[520px] overflow-y-auto rounded-[14px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)]'

const eyebrowClass = 'mb-[6px] text-[10px] font-bold uppercase tracking-[1.4px] text-[#666666]'

const headingClass = 'text-[20px] font-bold text-[#252525]'

const closeButtonClass =
  'grid size-[30px] shrink-0 place-items-center rounded-lg border-0 bg-[#F2F2F2] text-[20px] leading-none text-[#666666] transition-colors duration-150 hover:bg-[#E6E6E6]'

const fieldLabelClass = 'text-[10px] font-bold uppercase tracking-[1px] text-[#252525]'

const fieldClass =
  'h-[42px] w-full rounded-lg border border-[#DADADA] bg-white px-3 text-[12px] text-[#252525] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#999999] focus:border-[#292929] focus:shadow-[0_0_0_3px_rgba(41,41,41,0.08)] [color-scheme:light]'

const textareaClass = `${fieldClass} h-auto min-h-[96px] resize-y py-[11px]`

const cancelButtonClass =
  'h-10 rounded-lg border border-[#DADADA] bg-white px-4 text-[12px] font-bold text-[#252525] transition-colors duration-150 hover:bg-[#F5F5F5]'

const submitButtonClass =
  'h-10 rounded-lg border-0 bg-[#292929] px-4 text-[12px] font-bold text-white transition-colors duration-150 hover:bg-[#111111]'

function AddRequestModal({ values, onChange, onSubmit, onClose }) {
  return (
    <div
      className={overlayClass}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className={dialogClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sd-request-form-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E6E6E6] pb-4">
          <div>
            <p className={eyebrowClass}>SERVICE REQUEST</p>
            <h2 id="sd-request-form-title" className={headingClass}>
              New Service Request
            </h2>
          </div>
          <button
            className={closeButtonClass}
            type="button"
            aria-label="Close form"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="flex flex-col gap-4 pt-[18px]" onSubmit={onSubmit}>
          <div className="flex flex-col gap-[7px]">
            <label htmlFor="sd-request-department" className={fieldLabelClass}>
              Department
            </label>
            <select
              id="sd-request-department"
              name="department"
              value={values.department}
              onChange={onChange}
              className={fieldClass}
            >
              <option value="Registrar">Registrar</option>
              <option value="Student Affairs">Student Affairs</option>
              <option value="IT Department">IT Department</option>
            </select>
          </div>

          <div className="flex flex-col gap-[7px]">
            <label htmlFor="sd-request-type" className={fieldLabelClass}>
              Type of Request
            </label>
            <input
              id="sd-request-type"
              name="type"
              type="text"
              placeholder="e.g. Certificate of Grades"
              value={values.type}
              onChange={onChange}
              required
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label htmlFor="sd-request-details" className={fieldLabelClass}>
              Details
            </label>
            <textarea
              id="sd-request-details"
              name="details"
              rows="4"
              placeholder="Describe your request"
              value={values.details}
              onChange={onChange}
              className={textareaClass}
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label htmlFor="sd-request-date" className={fieldLabelClass}>
              Preferred Date
            </label>
            <input
              id="sd-request-date"
              name="date"
              type="date"
              value={values.date}
              onChange={onChange}
              required
              className={fieldClass}
            />
          </div>

          <div className="flex justify-end gap-[10px] pt-1">
            <button className={cancelButtonClass} type="button" onClick={onClose}>
              Cancel
            </button>
            <button className={submitButtonClass} type="submit">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRequestModal
