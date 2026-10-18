import styles from './PlaceholderPage.module.css'

export default function PlaceholderPage({ heading, summary }) {
  return (
    <div className={styles.wrap}>
      <h1>{heading}</h1>
      <p>{summary}</p>
    </div>
  )
}
