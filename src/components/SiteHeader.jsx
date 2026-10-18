import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './SiteHeader.module.css'

export default function SiteHeader({ view }) {
  const [urgentOpen, setUrgentOpen] = useState(false)
  const home = `/${view}`

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to={home} end className={styles.wordmark}>
          FHC San Diego <span className={styles.unofficial}>(unofficial)</span>
        </NavLink>
        <nav className={styles.nav} aria-label="Primary">
          <NavLink
            to={`${home}/services`}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkCurrent}` : styles.navLink
            }
          >
            Services
          </NavLink>
        </nav>
        <div className={styles.actions}>
          <a className={styles.phone} href="tel:+16195152300">
            (619) 515-2300
          </a>
          <button
            type="button"
            className={styles.urgent}
            aria-expanded={urgentOpen}
            aria-controls="urgent-note"
            onClick={() => setUrgentOpen((open) => !open)}
          >
            Urgent Care
          </button>
        </div>
      </div>
      <p id="urgent-note" className={styles.urgentNote} hidden={!urgentOpen}>
        Urgent care is outside this prototype. The task here is telehealth.
      </p>
    </header>
  )
}
