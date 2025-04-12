export const unformatDate = (date: Date) => {
  // MM.DD.YYYY to default date

  const day = new Date(date).getDate()
  const dayTwoDigit = String(day).length === 1 ? `0${day}` : day
  const month = new Date(date).getMonth() + 1
  const monthTwoDigit = String(month).length === 1 ? `0${month}` : month
  const year = new Date(date).getFullYear()

  return `${year}-${monthTwoDigit}-${dayTwoDigit}`
}
