'use client'
import { useEffect, useState } from 'react'

export default function SummaryPage() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    async function fetchSummary() {
      const res = await fetch('/api/meals/summary')
      const data = await res.json()
      setSummary(data.summary) // Store the correct part of the response (summary array)
    }
    fetchSummary()
  }, [])

  if (!summary) return <p>Loading summary...</p>

  return (
    <div>
      <h2>Meal Summary</h2>
      <p>Summary of meals grouped by tags.</p>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Total Meals</th>
            <th>Avg Satisfaction</th>
          </tr>
        </thead>
        <tbody>
          {summary.map(({ tag, mealCount, avgSatisfaction }) => (
            <tr key={tag}>
              <td>#{tag}</td>
              <td>{mealCount}</td>
              <td>{avgSatisfaction !== null ? `⭐ ${avgSatisfaction.toFixed(2)}` : 'No ratings'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

