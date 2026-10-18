import styles from './SiteFooter.module.css'

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Unofficial reconstruction created for educational portfolio analysis.
        Not affiliated with Family Health Centers of San Diego.
      </p>
    </footer>
  )
}
