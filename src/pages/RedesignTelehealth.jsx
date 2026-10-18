import { useState } from 'react'
import { Link } from 'react-router-dom'
import { offeredServices } from '../data/originalTelehealth'
import styles from './RedesignTelehealth.module.css'

const steps = [
  {
    title: 'Request',
    text: 'Tell us the visit type, a reason, and a few times that work for you.',
  },
  {
    title: 'Staff contact you',
    text: 'A member of our staff will be in touch. This is a request, not a booked visit.',
  },
  {
    title: 'Visit by phone or video',
    text: 'Your provider calls you. For video, you get a text link to join.',
  },
]

export default function RedesignTelehealth() {
  const [portalOpen, setPortalOpen] = useState(false)

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <h1>Telehealth</h1>
        <p className={styles.lead}>
          A phone or video visit for care that does not need a trip to the clinic.
        </p>
        <RequestLink />

        <section className={styles.section} aria-labelledby="how-heading">
          <h2 id="how-heading">How telehealth works</h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.stepTitle}>{step.title}</span>
                <span className={styles.stepText}>{step.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="fit-heading">
          <div className={styles.fitPanel}>
            <h2 id="fit-heading">Is telehealth right for you?</h2>
            <p>Not all visits can be done by telehealth. These often can:</p>
            <ul className={styles.services}>
              {offeredServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <p className={styles.emergency}>
            If this is an emergency, call 911 or go to the emergency room.
          </p>
        </section>

        <div className={styles.actions}>
          <RequestLink />
          <div className={styles.secondary}>
            <a href="tel:+16195152300">Call (619) 515-2300</a>
            <button
              type="button"
              className={styles.linkButton}
              aria-expanded={portalOpen}
              onClick={() => setPortalOpen((open) => !open)}
            >
              Use MyHealthRecord
            </button>
          </div>
          {portalOpen ? (
            <p className={styles.portalNote} role="status">
              MyHealthRecord is outside this prototype.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function RequestLink() {
  return (
    <Link className={styles.primary} to="/redesign/request">
      Request a telehealth visit
    </Link>
  )
}
