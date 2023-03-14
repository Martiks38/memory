import newGame from '../../utils/generateGame'
import { beforeEach, describe, expect, test } from 'vitest'

let matrix = []
const order = newGame.getOrder

describe('Order', () => {
  test('It should return a number.', () => {
    expect(typeof order).toBe('number')
  })
})

describe('Generated game', () => {
  beforeEach(() => {
    matrix = newGame.generateMatrix()
  })

  describe('Card matrix.', () => {
    test('Returns an array.', () => {
      expect(Array.isArray(matrix)).toBeTruthy()
    })

    test(`Square matrix of order ${order}. Its length must be ${order ** 2}.`, () => {
      expect(matrix).toHaveLength(order ** 2)
    })

    test('The array element property forms must be: {id = "0ab2ifr6-9af3-4fe6-z957-4gre17579bae", url_img = /Cards/<image name>.webp}', () => {
      const url_img_expected = /^\/Cards\/[\w-]+\.webp$/i
      const id_expected = /^[0-9a-z]{8}-([0-9a-z]{4}-){3}[0-9a-z]{12}$/

      matrix.forEach((el) => {
        expect(el).toEqual(
          expect.objectContaining({
            id: expect.stringMatching(id_expected),
            url_img: expect.stringMatching(url_img_expected)
          })
        )
      })
    })
  })

  describe('The matrix of the new game must be different from the previous one.', () => {
    test('isDiff must be true when finding a difference between the old and new array.', () => {
      const newMatrix = newGame.generateMatrix()
      let isDiff = false

      for (let ind = 0; ind < order ** 2; ind++) {
        if (matrix[ind] !== newMatrix[ind]) {
          isDiff = true
          break
        }
      }

      expect(isDiff).toBeTruthy()
    })
  })
})
