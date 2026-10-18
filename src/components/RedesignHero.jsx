import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '../data/events'
import { services } from '../data/services'
import styles from './RedesignHero.module.css'

export default function RedesignHero() {
  const [zip, setZip] = useState('')
  const [zipMessage, setZipMessage] = useState('')
  const [zipInvalid, setZipInvalid] = useState(false)
  const [serviceMessage, setServiceMessage] = useState('')

  function onZipSubmit(event) {
    event.preventDefault()
    const value = zip.trim()

    if (!value) {
      setZipInvalid(true)
      setZipMessage('Enter a 5-digit ZIP code.')
      return
    }

    if (!/^\d{5}$/.test(value)) {
      setZipInvalid(true)
      setZipMessage('Use a 5-digit ZIP code, like 92101.')
      return
    }

    setZipInvalid(false)
    setZipMessage('This prototype does not look up clinics.')
  }

  function onServiceChange(event) {
    const name = event.target.selectedOptions[0]?.textContent
    setServiceMessage(
      event.target.value
        ? `${name} is not opened from this menu in the prototype.`
        : '',
    )
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <p className={styles.welcome}>Welcome to Family Health Centers of San Diego</p>
        <h1 id="hero-heading" className={styles.heading}>
          How may we help you?
        </h1>

        <div className={styles.choices}>
          <Link className={styles.primary} to="/redesign/telehealth">
            <PhoneIcon />
            <span className={styles.primaryTitle}>Virtual visit</span>
            <span className={styles.primaryText}>
              Phone or video. Request a visit and a staff member will contact you.
            </span>
          </Link>

          <form className={styles.card} onSubmit={onZipSubmit}>
            <ClinicIcon />
            <label htmlFor="redesign-zip" className={styles.cardTitle}>
              Find a clinic
            </label>
            <div className={styles.zipRow}>
              <input
                id="redesign-zip"
                className={styles.zipInput}
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="Enter Zip Code"
                value={zip}
                aria-invalid={zipInvalid || undefined}
                aria-describedby={zipMessage ? 'redesign-zip-status' : undefined}
                onChange={(event) => setZip(event.target.value)}
              />
              <button type="submit" className={styles.go}>
                Go
              </button>
            </div>
            <p id="redesign-zip-status" className={styles.status} role={zipInvalid ? 'alert' : 'status'}>
              {zipMessage}
            </p>
          </form>

          <div className={styles.card}>
            <ServiceIcon />
            <label htmlFor="redesign-service" className={styles.cardTitle}>
              Find a service
            </label>
            <select
              id="redesign-service"
              className={styles.select}
              defaultValue=""
              aria-describedby={serviceMessage ? 'redesign-service-status' : undefined}
              onChange={onServiceChange}
            >
              <option value="">Select</option>
              {services.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <p id="redesign-service-status" className={styles.status} role="status">
              {serviceMessage}
            </p>
          </div>
        </div>

        <p className={styles.note}>
          Prototype. Please don't enter real personal or health information.
        </p>
      </section>

      <section className={styles.news} aria-labelledby="news-heading">
        <h2 id="news-heading" className={styles.newsHeading}>
          News & events
        </h2>
        <ul className={styles.eventList}>
          {events.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="16" y="6" width="16" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M22 30h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function ClinicIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="currentColor" d="M10 18h28v22H10V18zm6 6v5h5v-5h-5zm11 0v5h5v-5h-5zM20 32h8v8h-8v-8z" />
      <path fill="currentColor" d="M22 4h4v5h5v4h-5v5h-4v-5h-5V9h5V4z" />
    </svg>
  )
}

function ServiceIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="15" cy="8" r="3" fill="currentColor" />
      <circle cx="27" cy="8" r="3" fill="currentColor" />
      <path
        d="M15 11v7c0 7 5 11 11 11h3c5 0 7 4 7 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M27 11v6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="39" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}
