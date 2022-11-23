import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Error404 from '../../pages/Error404'

describe('Error404', () => {
  let error404

  beforeEach(() => {
    error404 = render(<Error404 />)
  })

  test('Render content', () => {
    const notFound = error404.getByText('Página no encontrada')

    expect(notFound).toBeInTheDocument()
  })

  test('When pressing "Inicio" the pathname should be "/".', () => {
    const home = error404.getByRole('link', {
      name: 'Inicio',
      parentSelector: 'a',
    })

    fireEvent.click(home)

    expect(location.pathname).toBe('/')
  })
})
