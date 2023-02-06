import { HeatmapDetails } from './types/leaveTypes'

export type Series = {
  x: string
  y: number
}
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
export const getHeatmapData = (count: number, heatmap: HeatmapDetails[]): Series[] => {
  let i = 0
  const series = []
  while (i < count) {
    const x = (i + 1).toString()
    const temp = heatmap?.filter((h) => h.day === parseInt(x))
    const y = temp?.length > 0 ? temp[0]?.value : 0

    series.push({ x, y })
    i++
  }
  return series
}

export const initialChartOptions = {
  chart: {
    id: 'LeavesHeatMap',
    toolbar: {
      show: false,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    }
  },
  tooltip: {
    enabled: false,
    y: {
      title: {
        formatter: function (seriesName: string) {
          return `${seriesName}: `
        }
      },
      formatter: function (val: number) {
        return val > 0 ? '1' : '0'
      }
    }
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 0,
      useFillColorAsStroke: false,
      colorScale: {
        ranges: [
          {
            from: 1,
            to: 6,
            name: 'Undertime',
            color: '#d97706'
          },
          {
            from: 7,
            to: 12,
            name: 'Sick Leave',
            color: '#059669'
          },
          {
            from: 13,
            to: 18,
            name: 'Vacation Leave',
            color: '#2563eb'
          },
          {
            from: 19,
            to: 24,
            name: 'Emergency Leave',
            color: '#e11d48'
          },
          {
            from: 25,
            to: 30,
            name: 'Bereavement Leave',
            color: '#4b5563'
          },
          {
            from: 31,
            to: 36,
            name: 'Maternity Leave',
            color: '#ffe814'
          }
        ]
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1
  },
  title: {
    text: ''
  }
}

export const initialSeriesData = [
  {
    name: 'December',
    data: []
  },
  {
    name: 'November',
    data: []
  },
  {
    name: 'October',
    data: []
  },
  {
    name: 'September',
    data: []
  },
  {
    name: 'August',
    data: []
  },
  {
    name: 'July',
    data: []
  },
  {
    name: 'June',
    data: []
  },
  {
    name: 'May',
    data: []
  },
  {
    name: 'April',
    data: []
  },
  {
    name: 'March',
    data: []
  },
  {
    name: 'February',
    data: []
  },
  {
    name: 'January',
    data: []
  }
]
