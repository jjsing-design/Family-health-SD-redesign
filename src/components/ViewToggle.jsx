import { NavLink, useLocation } from 'react-router-dom'
import { VIEWS, pageSuffix, pathFor } from '../features/views'
import styles from './ViewToggle.module.css'

export default function ViewToggle() {
  const { pathname } = useLocation()
  const suffix = pageSuffix(pathname)

  return (
    <nav className={styles.bar} aria-label="Prototype view">
      <div className={styles.inner}>
        <span className={styles.label}>View:</span>
        {VIEWS.map((view) => (
          <NavLink
            key={view.id}
            to={pathFor(view.id, suffix)}
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.current}` : styles.link
            }
          >
            {view.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
