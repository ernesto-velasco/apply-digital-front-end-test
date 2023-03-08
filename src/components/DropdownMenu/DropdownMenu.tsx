import { useState, useEffect } from 'react'
import styles from './dropdownmenu.module.css'
import { filterOptions } from 'data/filterData'
import { useFilterStorage } from 'hooks/useFilterStorage'
import iconDown from 'static/icon-chevron-down.svg'
import iconUp from 'static/icon-chevron-up.svg'

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  const { loading, value: filterStorageValue, addToStorage } = useFilterStorage()

  const title = 'Select your news'
  // btn clases
  const btnClases = `${styles.dropdownItem}`
  const btnActiveClases = `${styles.dropdownItem} ${styles.active}`

  useEffect(() => {
    setTimeout(() => {
      if (isOpen) {
        window.addEventListener('click', close)
      } else {
        window.removeEventListener('click', close)
      }
    }, 0)
  }, [isOpen])
  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdownHeader}
        onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}
      >
        <div className={styles.dropdownTitle}>{title}</div>
        <img src={isOpen ? iconUp : iconDown} alt='dropdown icon' />
      </div>
      {isOpen ? (
        <div className={styles.dropdownList}>
          {filterOptions.map(({ optTitle, optValue, optIcon }, i) => (
            <button
              key={optValue}
              className={optValue === filterStorageValue ? btnActiveClases : btnClases}
              onClick={() => addToStorage({ value: optValue })}
            >
              <img src={optIcon} alt='' />
              {optTitle}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
export default DropdownMenu
