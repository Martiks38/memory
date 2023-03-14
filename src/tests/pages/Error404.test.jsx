import React from 'react'
import { describe, expect, test } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import Error404 from '../../pages/Error404'

expect.extend(matchers)

describe('Error404', () => {
  test('Render content', () => {
    const error404 = render(<Error404 />)
    const notFound = error404.getByText('Página no encontrada')

    expect(notFound).toBeInTheDocument()
  })

  test('When pressing "Inicio" the pathname should be "/".', () => {
    const error404 = render(<Error404 />)
    const home = error404.getByRole('link', {
      name: 'Inicio',
      parentSelector: 'a'
    })

    fireEvent.click(home)

    expect(location.pathname).toBe('/')
  })
})
