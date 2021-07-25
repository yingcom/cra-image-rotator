import { render, screen } from '@testing-library/react'
import App from '../App'

test('render app title', () => {
  render(<App />)
  const title = screen.getByText(/image rotator/i)
  expect(title).toBeInTheDocument()
})
