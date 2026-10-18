import { Link, useLocation } from 'react-router-dom'
import styles from './RedesignConfirmation.module.css'

export default function RedesignConfirmation() {
  const request = useLocation().state?.request

  if (!request) {
    return (
      <article className={styles.page}>
        <div className={styles.inner}>
          <h1>No request yet</h1>
          <p>There is no request to show on this screen.</p>
          <Link className={styles.link} to="/redesign/telehealth">
            Back to virtual visit
          </Link>
        </div>
      </article>
    )
  }

  const visitLabel = request.visitType === 'video' ? 'Video' : 'Phone'

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <h1>Request received</h1>
        <p>A member of our staff will contact you. This is not a booked visit.</p>

        <h2>What you sent</h2>
        <dl className={styles.summary}>
          <div>
            <dt>Visit type</dt>
            <dd>{visitLabel}</dd>
          </div>
          <div>
            <dt>Reason</dt>
            <dd>{request.reason}</dd>
          </div>
          {request.detail.trim() ? (
            <div>
              <dt>More detail</dt>
              <dd>{request.detail}</dd>
            </div>
          ) : null}
          <div>
            <dt>Preferred days</dt>
            <dd>{request.days.join(', ')}</dd>
          </div>
          <div>
            <dt>Time of day</dt>
            <dd>{request.times.join(', ')}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>
              {request.first} {request.last}
            </dd>
          </div>
          <div>
            <dt>Mobile phone</dt>
            <dd>{request.phone}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{request.email}</dd>
          </div>
          <div>
            <dt>ZIP code</dt>
            <dd>{request.zip}</dd>
          </div>
          <div>
            <dt>Date of birth</dt>
            <dd>
              {request.month}/{request.day}/{request.year}
            </dd>
          </div>
        </dl>

        <h2>What happens next</h2>
        <ul>
          <li>A member of our staff will contact you.</li>
          {request.visitType === 'video' ? (
            <li>For video, you will get a text link to join.</li>
          ) : null}
          <li>
            Your provider will call you. Be available up to 30 minutes before
            and after the scheduled time.
          </li>
        </ul>
        <p>
          <a className={styles.link} href="tel:+16195152300">
            Call (619) 515-2300
          </a>
        </p>
      </div>
    </article>
  )
}
