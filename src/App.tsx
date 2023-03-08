import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, NavMenu } from 'components'
import { FavoritesProvider } from 'context/favoritesContext'
import { FilterProvider } from 'context/filterQueryContext'
import { PaginationProvider } from 'context/paginationContext'
import { Favorites, Home } from 'pages'
import './App.css'

function App() {
  return (
    <FilterProvider>
      <FavoritesProvider>
        <Header />
        <section className='content'>
          <PaginationProvider>
            <BrowserRouter>
              <NavMenu />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/favorites' element={<Favorites />} />
              </Routes>
            </BrowserRouter>
          </PaginationProvider>
        </section>
      </FavoritesProvider>
    </FilterProvider>
  )
}
export default App
