/**
 * From a number of milliseconds it returns an array with the minutes and seconds.
 *
 * @param {number} milliseconds
 * @returns {[string, string]} - String of minutes and seconds, formatted as 00.
 */
const millisecondsToMinutesSeconds = (milliseconds) => {
  if (milliseconds < 0 || typeof milliseconds !== 'number') return ['XX', 'XX']

  let minutes = ('00' + Math.floor(milliseconds / 60000)).slice(-2)
  let seconds = ('00' + Math.floor((milliseconds % 60000) / 1000)).slice(-2)

  return [minutes, seconds]
}

export default millisecondsToMinutesSeconds
