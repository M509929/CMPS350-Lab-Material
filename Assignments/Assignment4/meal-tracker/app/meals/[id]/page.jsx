'use client';

import { useEffect, useState, use } from 'react'; // ⬅️ Note the import of `use`
import { useRouter } from 'next/navigation';

export default function MealEditPage({ params: paramsPromise }) {
  const { id } = use(paramsPromise); // ⬅️ Unwrap the promise

  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    calories: '',
    date: '',
    image: '',
    tags: '',
    satisfaction: '',
  });

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch(`/api/meals/${id}`);
      if (res.ok) {
        const data = await res.json();
        setMeal(data);
        setForm({
          title: data.title,
          description: data.description,
          calories: data.calories,
          date: data.date,
          image: data.image,
          tags: data.tags.join(', '),
          satisfaction: data.satisfaction,
        });
      } else {
        alert('Meal not found');
      }
    }

    fetchMeal();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/meals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        calories: parseFloat(form.calories),
        satisfaction: parseInt(form.satisfaction),
        tags: form.tags.split(',').map((t) => t.trim()),
      }),
    });

    if (response.ok) {
      router.push('/meals');
    } else {
      alert('Failed to update meal');
    }
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Meal</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required /><br />
        <input name="calories" type="number" placeholder="Calories" value={form.calories} onChange={handleChange} required /><br />
        <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required /><br />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} /><br />
        <input name="tags" placeholder="Tags (comma-separated)" value={form.tags} onChange={handleChange} /><br />
        <input name="satisfaction" type="number" min="1" max="5" placeholder="Satisfaction (1-5)" value={form.satisfaction} onChange={handleChange} /><br />
        <button type="submit">Update Meal</button>
      </form>
    </div>
  );
}
