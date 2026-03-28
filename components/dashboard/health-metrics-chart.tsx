"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function HealthMetricsChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#111111',
        titleColor: '#FFFFFF',
        bodyColor: '#A3A3A3',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#888888',
        }
      },
      y: {
        grid: {
          color: 'rgba(136, 136, 136, 0.1)',
        },
        ticks: {
          color: '#888888',
        }
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      }
    }
  }

  const data = {
    labels: ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'],
    datasets: [
      {
        fill: true,
        label: 'Herd Avg Temperature',
        data: [38.5, 38.4, 38.6, 39.1, 38.9, 38.7],
        borderColor: '#00D654',
        backgroundColor: 'rgba(0, 214, 84, 0.1)',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={data} />
    </div>
  )
}