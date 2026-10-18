import { useEffect, useState } from 'react'
import { faqs, sidebarLinks } from '../data/originalTelehealth'
import styles from './OriginalTelehealth.module.css'

const EMPTY = {
  reason: '',
  first: '',
  last: '',
  email: '',
  phone: '',
  zip: '',
  month: '',
  day: '',
  year: '',
}

export default function OriginalTelehealth() {
  const [sidebarNote, setSidebarNote] = useState('')
  const [portalOpen, setPortalOpen] = useState(false)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [simulateFailure, setSimulateFailure] = useState(false)

  useEffect(() => {
    if (status !== 'loading') return undefined
    const timer = window.setTimeout(() => {
      setStatus(simulateFailure ? 'failure' : 'success')
    }, 700)
    return () => window.clearTimeout(timer)
  }, [status, simulateFailure])

  function update(field) {
    return (event) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('invalid')
      return
    }
    setStatus('loading')
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar} aria-label="Related pages">
        <ul className={styles.sideList}>
          {sidebarLinks.map((label) => (
            <li key={label}>
              {label === 'Telehealth' ? (
                <span className={styles.sideCurrent} aria-current="page">
                  {label}
                </span>
              ) : (
                <button
                  type="button"
                  className={styles.sideLink}
                  onClick={() =>
                    setSidebarNote(`${label} is outside this prototype.`)
                  }
                >
                  {label}
                </button>
              )}
            </li>
          ))}
        </ul>
        {sidebarNote ? (
          <p className={styles.sideNote} role="status">
            {sidebarNote}
          </p>
        ) : null}
      </aside>

      <article className={styles.main}>
        <h1 className={styles.title}>Telehealth appointments</h1>

        <div className={styles.schedule}>
          <h2 className={styles.scheduleTitle}>Schedule an appointment</h2>
          <p className={styles.scheduleText}>
            <a href="tel:+16195152300">Call (619) 515-2300</a> to schedule a
            telehealth appointment, complete the form below, or{' '}
            <button
              type="button"
              className={styles.linkButton}
              aria-expanded={portalOpen}
              onClick={() => setPortalOpen((open) => !open)}
            >
              log in to MyHealthRecord
            </button>
            .
          </p>
        </div>
        {portalOpen ? (
          <p className={styles.portalNote} role="status">
            MyHealthRecord is outside this prototype.
          </p>
        ) : null}

        {status === 'success' ? (
          <div className={styles.result} role="status">
            <h2>Request received</h2>
            <p>A member of our staff will be in touch.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <h2>Contact us</h2>
            <p>
              Fill out the form below and a member of our staff will be in
              touch.
            </p>
            <p className={styles.prototypeNote}>
              Prototype. Please don't enter real personal or health information.
            </p>

            {status === 'invalid' ? (
              <p className={styles.errorSummary} role="alert">
                Some required information is missing. {errorCount(errors)}{' '}
                {errorCount(errors) === 1 ? 'item needs' : 'items need'} an
                answer.
              </p>
            ) : null}
            {status === 'failure' ? (
              <p className={styles.errorSummary} role="alert">
                The request did not go through. Nothing was saved. Uncheck
                “Prototype: simulate a failed submit,” then try again.
              </p>
            ) : null}

            <div className={styles.field}>
              <label htmlFor="reason">Reason for your visit (Required)</label>
              <textarea
                id="reason"
                className={styles.control}
                rows={4}
                placeholder="Please let us know the reason for your visit"
                value={values.reason}
                aria-invalid={errors.reason ? true : undefined}
                aria-describedby={errors.reason ? 'reason-error' : undefined}
                disabled={status === 'loading'}
                onChange={update('reason')}
              />
              {errors.reason ? (
                <p id="reason-error" className={styles.fieldError}>
                  {errors.reason}
                </p>
              ) : null}
            </div>

            <p className={styles.minor}>
              Minor notice: If this request is for a person under age 18,
              please provide only the parent or legal guardian's information.
              We do not collect information for individuals under age 18.
            </p>

            <fieldset className={styles.fieldset}>
              <legend>First and last name (Required)</legend>
              <div className={styles.split}>
                <div className={styles.field}>
                  <label htmlFor="first">First</label>
                  <input
                    id="first"
                    className={styles.control}
                    autoComplete="given-name"
                    value={values.first}
                    aria-invalid={errors.first ? true : undefined}
                    aria-describedby={errors.first ? 'first-error' : undefined}
                    disabled={status === 'loading'}
                    onChange={update('first')}
                  />
                  {errors.first ? (
                    <p id="first-error" className={styles.fieldError}>
                      {errors.first}
                    </p>
                  ) : null}
                </div>
                <div className={styles.field}>
                  <label htmlFor="last">Last</label>
                  <input
                    id="last"
                    className={styles.control}
                    autoComplete="family-name"
                    value={values.last}
                    aria-invalid={errors.last ? true : undefined}
                    aria-describedby={errors.last ? 'last-error' : undefined}
                    disabled={status === 'loading'}
                    onChange={update('last')}
                  />
                  {errors.last ? (
                    <p id="last-error" className={styles.fieldError}>
                      {errors.last}
                    </p>
                  ) : null}
                </div>
              </div>
            </fieldset>

            <div className={styles.split}>
              <div className={styles.field}>
                <label htmlFor="email">Email (Required)</label>
                <input
                  id="email"
                  className={styles.control}
                  type="email"
                  autoComplete="email"
                  placeholder="youremail@example.com"
                  value={values.email}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={status === 'loading'}
                  onChange={update('email')}
                />
                {errors.email ? (
                  <p id="email-error" className={styles.fieldError}>
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div className={styles.field}>
                <label htmlFor="phone">Phone (Required)</label>
                <input
                  id="phone"
                  className={styles.control}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(###) ###-####"
                  value={values.phone}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  disabled={status === 'loading'}
                  onChange={update('phone')}
                />
                {errors.phone ? (
                  <p id="phone-error" className={styles.fieldError}>
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            </div>

            <div className={styles.split}>
              <div className={styles.field}>
                <label htmlFor="zip">ZIP code (Required)</label>
                <input
                  id="zip"
                  className={`${styles.control} ${styles.short}`}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder="#####"
                  value={values.zip}
                  aria-invalid={errors.zip ? true : undefined}
                  aria-describedby={errors.zip ? 'zip-error' : undefined}
                  disabled={status === 'loading'}
                  onChange={update('zip')}
                />
                {errors.zip ? (
                  <p id="zip-error" className={styles.fieldError}>
                    {errors.zip}
                  </p>
                ) : null}
              </div>
              <fieldset className={styles.fieldset}>
                <legend>Date of birth (Required)</legend>
                <div className={styles.dateRow}>
                  <DatePart
                    id="month"
                    label="Month"
                    placeholder="MM"
                    value={values.month}
                    error={errors.month}
                    disabled={status === 'loading'}
                    onChange={update('month')}
                  />
                  <DatePart
                    id="day"
                    label="Day"
                    placeholder="DD"
                    value={values.day}
                    error={errors.day}
                    disabled={status === 'loading'}
                    onChange={update('day')}
                  />
                  <DatePart
                    id="year"
                    label="Year"
                    placeholder="YY"
                    value={values.year}
                    error={errors.year}
                    disabled={status === 'loading'}
                    onChange={update('year')}
                  />
                </div>
              </fieldset>
            </div>

            <label className={styles.simulate}>
              <input
                type="checkbox"
                checked={simulateFailure}
                disabled={status === 'loading'}
                onChange={(event) => setSimulateFailure(event.target.checked)}
              />
              Prototype: simulate a failed submit
            </label>

            <button
              type="submit"
              className={styles.submit}
              disabled={status === 'loading'}
            >
              {status === 'loading'
                ? 'Sending request...'
                : status === 'failure'
                  ? 'Try again'
                  : 'Submit'}
            </button>
          </form>
        )}

        <section className={styles.faq} aria-labelledby="faq-heading">
          <h2 id="faq-heading">Common questions</h2>
          {faqs.map((item) => (
            <div key={item.question} className={styles.faqItem}>
              <h3>{item.question}</h3>
              {Array.isArray(item.answer) ? (
                <ul>
                  {item.answer.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.answer}</p>
              )}
            </div>
          ))}
        </section>
      </article>

      <a className={styles.callChip} href="tel:+16195152300">
        For appointments call (619) 515-2300
      </a>
    </div>
  )
}

function DatePart({ id, label, placeholder, value, error, disabled, onChange }) {
  return (
    <div className={styles.datePart}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`${styles.control} ${styles.dateInput}`}
        inputMode="numeric"
        maxLength={2}
        placeholder={placeholder}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        disabled={disabled}
        onChange={onChange}
      />
      {error ? (
        <p id={`${id}-error`} className={styles.fieldError}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

function validate(values) {
  const errors = {}
  if (!values.reason.trim()) errors.reason = 'Enter the reason for the visit.'
  if (!values.first.trim()) errors.first = 'Enter a first name.'
  if (!values.last.trim()) errors.last = 'Enter a last name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter an email address like youremail@example.com.'
  }
  if (values.phone.replace(/\D/g, '').length !== 10) {
    errors.phone = 'Enter a 10-digit phone number.'
  }
  if (!/^\d{5}$/.test(values.zip.trim())) {
    errors.zip = 'Enter a 5-digit ZIP code.'
  }
  const month = Number(values.month)
  const day = Number(values.day)
  if (!/^\d{2}$/.test(values.month) || month < 1 || month > 12) {
    errors.month = 'Enter a month from 01 to 12.'
  }
  if (!/^\d{2}$/.test(values.day) || day < 1 || day > 31) {
    errors.day = 'Enter a day from 01 to 31.'
  }
  if (!/^\d{2}$/.test(values.year)) {
    errors.year = 'Enter a two-digit year.'
  }
  return errors
}

function errorCount(errors) {
  return Object.keys(errors).length
}
