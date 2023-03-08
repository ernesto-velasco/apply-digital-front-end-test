import { render, screen } from '@testing-library/react'
import { Home } from 'pages'

test('renders text home page', () => {
  render(<Home />)
  const linkElement = screen.getByText(/home page/i)
  expect(linkElement).toBeInTheDocument()
})
