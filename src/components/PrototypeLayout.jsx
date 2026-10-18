import { Outlet } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import ViewToggle from './ViewToggle'
import styles from './PrototypeLayout.module.css'

export default function PrototypeLayout({ view }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <SiteHeader view={view} />
      <ViewToggle />
      <main id="main" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
