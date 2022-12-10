import {render, screen} from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Home/>)
    console.log(container)

    const heading = screen.getByRole('heading', {
      name:/Hello Next\.js/i,
    })

    expect(heading).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
