import millisecondsToMinutesSeconds from '../../utils/millisecondsToMinutesSeconds'

describe('Converter from milliseconds to minutes and seconds.', () => {
  test('It must return ["XX","XX"] if the parameter is less than zero.', () => {
    let result = millisecondsToMinutesSeconds(-10)
    let expected = ['XX', 'XX']

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It should return ["XX","XX"] if the parameter is not of type number.', () => {
    let result = millisecondsToMinutesSeconds({})
    let expected = ['XX', 'XX']

    expect(result).toEqual(expect.arrayContaining(expected))
  })

  test('It should return ["00","00"] when the parameter is 0.', () => {
    let result = millisecondsToMinutesSeconds(0)
    let expected = ['00', '00']

    expect(result).toEqual(expected)
  })

  test('It should return ["01","01"] when the parameter is 61000.', () => {
    let result = millisecondsToMinutesSeconds(61000)
    let expected = ['01', '01']

    expect(result).toEqual(expected)
  })
})
