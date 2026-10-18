import { useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import styles from './OriginalServices.module.css'

export default function OriginalServices() {
  const [surveyOpen, setSurveyOpen] = useState(false)

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Services and Programs</h1>
        <p className={styles.intro}>
          Family Health Centers of San Diego offers a variety of services and
          programs to address your health care needs.{' '}
          <Link className={styles.inlineLink} to="/original/telehealth">
            To schedule a telehealth appointment
          </Link>
          , please call{' '}
          <a className={styles.inlineLink} href="tel:+16195152300">
            (619) 515-2300
          </a>
          .
        </p>
        <p className={styles.notice}>
          This number is not intended for emergency care. If you are
          experiencing a medical emergency, please call 911 immediately or go
          to the emergency room.
        </p>
        <p className={styles.intro}>
          How did we do?{' '}
          <button
            type="button"
            className={styles.textButton}
            aria-expanded={surveyOpen}
            onClick={() => setSurveyOpen((open) => !open)}
          >
            Take our patient satisfaction survey
          </button>
          .
        </p>
        {surveyOpen ? (
          <p className={styles.notice} role="status">
            Patient surveys are outside this prototype.
          </p>
        ) : null}
        <p className={styles.mask}>
          If you think you are sick, please wear a mask for all in-person
          clinic visits.
        </p>
        <h2 className={styles.servicesHeading}>Available services</h2>
        <p className={styles.notice}>Not all services available at every site.</p>
        <ul className={styles.list}>
          {services.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
