import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { offeredServices } from '../data/originalTelehealth'
import styles from './RedesignRequest.module.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TIMES = ['Morning', 'Afternoon', 'Evening']
const REASONS = [...offeredServices, 'Something else']

const EMPTY = {
  visitType: '',
  reason: '',
  detail: '',
  days: [],
  times: [],
  first: '',
  last: '',
  phone: '',
  email: '',
  zip: '',
  month: '',
  day: '',
  year: '',
}

export default function RedesignRequest() {
  const navigate = useNavigate()
  const summaryRef = useRef(null)
  const timerRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [simulateFailure, setSimulateFailure] = useState(false)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  function update(field) {
    return (event) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  function toggle(field, choice) {
    setValues((current) => {
      const selected = current[field]
      const next = selected.includes(choice)
        ? selected.filter((item) => item !== choice)
        : [...selected, choice]
      return { ...current, [field]: next }
    })
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('invalid')
      window.requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('loading')
    timerRef.current = window.setTimeout(() => {
      if (simulateFailure) {
        setStatus('failure')
        window.requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      navigate('/redesign/confirmation', { state: { request: values } })
    }, 700)
  }

  const phoneHelp =
    values.visitType === 'video'
      ? 'Required for video. This number gets the text link to join.'
      : 'Your provider calls this number. For video, it also gets the text link to join.'

  const busy = status === 'loading'

  return (
    <article className={styles.page}>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <h1>Request a telehealth visit</h1>
        <p className={styles.prototypeNote}>
          Prototype. Please don't enter real personal or health information.
        </p>
        <p>All fields are required unless marked optional.</p>

        <div
          ref={summaryRef}
          tabIndex={-1}
          className={styles.summary}
          role={status === 'invalid' || status === 'failure' ? 'alert' : 'status'}
        >
          {status === 'invalid'
            ? `${errorCount(errors)} ${errorCount(errors) === 1 ? 'item needs' : 'items need'} an answer.`
            : null}
          {status === 'failure'
            ? 'The request did not go through. Nothing was saved. Uncheck “Prototype: simulate a failed submit,” then try again.'
            : null}
        </div>

        <section className={styles.panel} aria-labelledby="about-visit">
          <h2 id="about-visit">About the visit</h2>

          <fieldset className={styles.fieldset} disabled={busy} aria-required="true">
            <legend>Visit type</legend>
            <div className={styles.visitCards}>
              <label className={styles.visitCard}>
                <input
                  className={styles.visitRadio}
                  type="radio"
                  name="visitType"
                  value="phone"
                  required
                  checked={values.visitType === 'phone'}
                  onChange={update('visitType')}
                />
                <span className={styles.visitTitle}>Phone</span>
                <span className={styles.visitHint}>We call you</span>
                <span className={styles.selectedMark} aria-hidden="true">
                  {values.visitType === 'phone' ? 'Selected' : ''}
                </span>
              </label>
              <label className={styles.visitCard}>
                <input
                  className={styles.visitRadio}
                  type="radio"
                  name="visitType"
                  value="video"
                  required
                  checked={values.visitType === 'video'}
                  onChange={update('visitType')}
                />
                <span className={styles.visitTitle}>Video</span>
                <span className={styles.visitHint}>You get a text link to join</span>
                <span className={styles.selectedMark} aria-hidden="true">
                  {values.visitType === 'video' ? 'Selected' : ''}
                </span>
              </label>
            </div>
            {errors.visitType ? <p className={styles.fieldError}>{errors.visitType}</p> : null}
          </fieldset>

          <div className={styles.field}>
            <label htmlFor="reason">Reason for the visit</label>
            <select
              id="reason"
              className={styles.control}
              value={values.reason}
              required
              aria-invalid={errors.reason ? true : undefined}
              aria-describedby={errors.reason ? 'reason-error' : undefined}
              disabled={busy}
              onChange={update('reason')}
            >
              <option value="">Select a reason</option>
              {REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {errors.reason ? (
              <p id="reason-error" className={styles.fieldError}>
                {errors.reason}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="detail">More detail (optional)</label>
            <textarea
              id="detail"
              className={styles.control}
              rows={3}
              value={values.detail}
              disabled={busy}
              onChange={update('detail')}
            />
          </div>
        </section>

        <section className={styles.panel} aria-labelledby="when-works">
          <h2 id="when-works">When works for you</h2>

          <fieldset
            className={styles.fieldset}
            disabled={busy}
            aria-required="true"
            aria-describedby={errors.days ? 'days-error' : undefined}
          >
            <legend>Preferred days</legend>
            <div className={styles.chips}>
              {DAYS.map((day) => (
                <label key={day} className={styles.chip}>
                  <input
                    className={styles.chipInput}
                    type="checkbox"
                    checked={values.days.includes(day)}
                    onChange={() => toggle('days', day)}
                  />
                  <span className={styles.chipMark} aria-hidden="true">
                    {values.days.includes(day) ? '✓' : ''}
                  </span>
                  {day}
                </label>
              ))}
            </div>
            {errors.days ? (
              <p id="days-error" className={styles.fieldError}>
                {errors.days}
              </p>
            ) : null}
          </fieldset>

          <fieldset
            className={styles.fieldset}
            disabled={busy}
            aria-required="true"
            aria-describedby={errors.times ? 'times-error' : undefined}
          >
            <legend>Preferred time of day</legend>
            <div className={styles.chips}>
              {TIMES.map((time) => (
                <label key={time} className={styles.chip}>
                  <input
                    className={styles.chipInput}
                    type="checkbox"
                    checked={values.times.includes(time)}
                    onChange={() => toggle('times', time)}
                  />
                  <span className={styles.chipMark} aria-hidden="true">
                    {values.times.includes(time) ? '✓' : ''}
                  </span>
                  {time}
                </label>
              ))}
            </div>
            {errors.times ? (
              <p id="times-error" className={styles.fieldError}>
                {errors.times}
              </p>
            ) : null}
          </fieldset>
        </section>

        <section className={styles.panel} aria-labelledby="about-you">
          <h2 id="about-you">About you</h2>

          <fieldset className={styles.fieldset} disabled={busy}>
            <legend>Name</legend>
            <div className={styles.split}>
              <div className={styles.field}>
                <label htmlFor="first">First</label>
                <input
                  id="first"
                  className={styles.control}
                  autoComplete="given-name"
                  required
                  value={values.first}
                  aria-invalid={errors.first ? true : undefined}
                  aria-describedby={errors.first ? 'first-error' : undefined}
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
                  required
                  value={values.last}
                  aria-invalid={errors.last ? true : undefined}
                  aria-describedby={errors.last ? 'last-error' : undefined}
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

          <div className={styles.field}>
            <label htmlFor="phone">Mobile phone</label>
            <p id="phone-help" className={styles.help}>
              {phoneHelp}
            </p>
            <input
              id="phone"
              className={styles.control}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={values.phone}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? 'phone-help phone-error' : 'phone-help'}
              disabled={busy}
              onChange={update('phone')}
            />
            {errors.phone ? (
              <p id="phone-error" className={styles.fieldError}>
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={styles.control}
              type="email"
              autoComplete="email"
              required
              value={values.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={busy}
              onChange={update('email')}
            />
            {errors.email ? (
              <p id="email-error" className={styles.fieldError}>
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="zip">ZIP code</label>
            <input
              id="zip"
              className={`${styles.control} ${styles.zipInput}`}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              required
              value={values.zip}
              aria-invalid={errors.zip ? true : undefined}
              aria-describedby={errors.zip ? 'zip-error' : undefined}
              disabled={busy}
              onChange={update('zip')}
            />
            {errors.zip ? (
              <p id="zip-error" className={styles.fieldError}>
                {errors.zip}
              </p>
            ) : null}
          </div>

          <fieldset className={styles.fieldset} disabled={busy}>
            <legend>Date of birth</legend>
            <div className={styles.dateRow}>
              <DatePart
                id="month"
                label="Month"
                placeholder="MM"
                maxLength={2}
                value={values.month}
                error={errors.month}
                onChange={update('month')}
              />
              <DatePart
                id="day"
                label="Day"
                placeholder="DD"
                maxLength={2}
                value={values.day}
                error={errors.day}
                onChange={update('day')}
              />
              <DatePart
                id="year"
                label="Year"
                placeholder="YYYY"
                maxLength={4}
                wide
                value={values.year}
                error={errors.year}
                onChange={update('year')}
              />
            </div>
          </fieldset>

          <p className={styles.minor}>
            Minor notice: If this request is for a person under age 18, please
            provide only the parent or legal guardian's information. We do not
            collect information for individuals under age 18.
          </p>
        </section>

        <div className={styles.submitRow}>
          <button type="submit" className={styles.submit} disabled={busy}>
            {status === 'loading'
              ? 'Sending request...'
              : status === 'failure'
                ? 'Try again'
                : 'Submit request'}
          </button>
          <p className={styles.next}>
            What happens next: a staff member will contact you. This request
            does not book the visit.
          </p>
        </div>

        <section className={styles.prototypeStrip} aria-labelledby="prototype-controls">
          <h2 id="prototype-controls">Prototype controls</h2>
          <label className={styles.choice}>
            <input
              type="checkbox"
              checked={simulateFailure}
              disabled={busy}
              onChange={(event) => setSimulateFailure(event.target.checked)}
            />
            Prototype: simulate a failed submit
          </label>
        </section>
      </form>
    </article>
  )
}

function DatePart({ id, label, placeholder, maxLength, value, error, onChange, wide }) {
  return (
    <div className={wide ? `${styles.datePart} ${styles.datePartWide}` : styles.datePart}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.control}
        inputMode="numeric"
        autoComplete="bday"
        maxLength={maxLength}
        placeholder={placeholder}
        required
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
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
  if (!values.visitType) errors.visitType = 'Choose phone or video.'
  if (!values.reason) errors.reason = 'Choose a reason for the visit.'
  if (values.days.length === 0) errors.days = 'Choose at least one preferred day.'
  if (values.times.length === 0) errors.times = 'Choose at least one time of day.'
  if (!values.first.trim()) errors.first = 'Enter a first name.'
  if (!values.last.trim()) errors.last = 'Enter a last name.'
  if (values.phone.replace(/\D/g, '').length !== 10) {
    errors.phone =
      values.visitType === 'video'
        ? 'Enter the 10-digit mobile number that should get the text link.'
        : 'Enter a 10-digit phone number.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter an email address like youremail@example.com.'
  }
  if (!/^\d{5}$/.test(values.zip.trim())) errors.zip = 'Enter a 5-digit ZIP code.'
  const month = Number(values.month)
  const day = Number(values.day)
  if (!/^\d{1,2}$/.test(values.month) || month < 1 || month > 12) {
    errors.month = 'Enter a month from 1 to 12.'
  }
  if (!/^\d{1,2}$/.test(values.day) || day < 1 || day > 31) {
    errors.day = 'Enter a day from 1 to 31.'
  }
  if (!/^\d{4}$/.test(values.year)) errors.year = 'Enter a four-digit year.'
  return errors
}

function errorCount(errors) {
  return Object.keys(errors).length
}
