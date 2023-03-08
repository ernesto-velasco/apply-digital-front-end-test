import { useNavigate } from 'react-router-dom'
import styles from './navmenu.module.css'

type TMenuOpt = {
  title: string
  value: string
  path: string
  handleClick: (path: string) => void
}
const MenuOption = ({ title, value, path, handleClick }: TMenuOpt) => (
  <>
    <input
      type='radio'
      name='menu'
      id={value}
      title={title}
      className={styles.menu_opt}
      defaultChecked={path === location.pathname ? true : false}
    />
    <label htmlFor={value} className={styles.menu_label} onClick={() => handleClick(path)}>
      {title}
    </label>
  </>
)

const data = [
  { title: 'All', path: '/', value: 'all', default: true },
  { title: 'Favs', path: '/favorites', value: 'favs', default: false },
]

function NavMenu() {
  const navigate = useNavigate()
  const handleClick = (path: string) => navigate(path)
  return (
    <div className={styles.menu}>
      {data.map((opt) => (
        <div key={opt.value}>
          <MenuOption
            title={opt.title}
            value={opt.value}
            path={opt.path}
            handleClick={handleClick}
          />
        </div>
      ))}
    </div>
  )
}
export default NavMenu
