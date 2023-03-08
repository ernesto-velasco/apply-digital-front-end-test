import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DropdownMenu } from 'components'
import { FavoritesProvider } from 'context/favoritesContext'
import { FilterProvider } from 'context/filterQueryContext'
describe('Test over Dropdown Menu Component', () => {
  test('Renders dropdown menu', () => {
    render(
      <FilterProvider>
        <FavoritesProvider>
          <DropdownMenu />
        </FavoritesProvider>
      </FilterProvider>,
    )
  })
  test('modal should be close at first', () => {
    render(
      <FilterProvider>
        <FavoritesProvider>
          <DropdownMenu />
        </FavoritesProvider>
      </FilterProvider>,
    )
    const options = screen.queryByText(/angular/i)
    expect(options).not.toBeInTheDocument()
  })
  test('Open modal on click', () => {
    render(
      <FilterProvider>
        <FavoritesProvider>
          <DropdownMenu />
        </FavoritesProvider>
      </FilterProvider>,
    )
    const btn = screen.getByText(/select your news/i)

    userEvent.click(btn)
    const options = screen.getByText(/angular/i)
    expect(options).toBeInTheDocument()
  })
})
