export const generateData = (count: number, yrange: { min: number; max: number }): any[] => {
  let i = 0
  const series = []
  while (i < count) {
    const x = (i + 1).toString()
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({ x, y })
    i++
  }
  return series
}
