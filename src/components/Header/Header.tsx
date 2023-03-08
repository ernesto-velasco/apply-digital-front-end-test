import styles from './header.module.css'

function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.brand}>Hacker News</h1>
    </div>
  )
}
export default Header
