'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddMealPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    userId: 1,
    title: '',
    description: '',
    calories: '',
    date: '',
    image: '',
    tags: '',
    satisfaction: ''
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        calories: parseFloat(form.calories),
        satisfaction: parseInt(form.satisfaction),
        tags: form.tags.split(',').map(t => t.trim())
      })
    })

    if (response.ok) router.push('/meals')
    else alert('Failed to add meal')
  }

  return (
    <div>
      <h2>Add New Meal</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} required /><br />
        <input name="calories" type="number" placeholder="Calories" onChange={handleChange} required /><br />
        <input name="date" type="datetime-local" onChange={handleChange} required /><br />
        <input name="image" placeholder="Image URL" onChange={handleChange} /><br />
        <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} /><br />
        <input name="satisfaction" type="number" min="1" max="5" placeholder="Satisfaction (1-5)" onChange={handleChange} /><br />
        <button type="submit">Add Meal</button>
      </form>
    </div>
  )
}
