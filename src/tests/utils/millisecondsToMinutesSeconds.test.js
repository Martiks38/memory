import millisecondsToMinutesSeconds from '../../utils/millisecondsToMinutesSeconds'
import { describe, expect, test } from 'vitest'

describe('Converter from milliseconds to minutes and seconds.', () => {
  test('It must return ["XX","XX"] if the parameter is less than zero.', () => {
    const result = millisecondsToMinutesSeconds(-10)
    const expected = ['XX', 'XX']

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It should return ["XX","XX"] if the parameter is not of type number.', () => {
    const result = millisecondsToMinutesSeconds({})
    const expected = ['XX', 'XX']

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It should return ["00","00"] when the parameter is 0.', () => {
    const result = millisecondsToMinutesSeconds(0)
    const expected = ['00', '00']

    expect(result).toEqual(expected)
  })

  test('It should return ["01","01"] when the parameter is 61000.', () => {
    const result = millisecondsToMinutesSeconds(61000)
    const expected = ['01', '01']

    expect(result).toEqual(expected)
  })
})
