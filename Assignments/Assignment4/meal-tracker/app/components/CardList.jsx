// app/components/CardList.jsx
"use client"; // Mark this file as a client component

import { useEffect, useState } from 'react';

export default function CardList() {
  const [meals, setMeals] = useState([]);
  const [visibleDesc, setVisibleDesc] = useState({});
  const [search, setSearch] = useState('');

  // Fetch meals from API
  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch('/api/meals');
      const data = await res.json();
      setMeals(data);
    }
    fetchMeals();
  }, []);

  // Handle deleting a meal
  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this meal?');
    if (!confirmed) return;

    const res = await fetch(`/api/meals/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMeals((prev) => prev.filter((meal) => meal.id !== id));
    } else {
      alert('Failed to delete meal.');
    }
  };

  // Filter meals based on search query
  const filteredMeals = meals.filter(
    (meal) =>
      meal.title.toLowerCase().includes(search.toLowerCase()) ||
      meal.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <input
        className="search-box"
        type="text"
        placeholder="Search meals by title or tag..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div id="meals-list">
        {filteredMeals.length === 0 ? (
          <p>No meals match your search.</p>
        ) : (
          filteredMeals.map((meal) => (
            <div key={meal.id} className="card">
              <img src={meal.image} alt={meal.title} className="meal-img" />
              <div className="card-content">
                <h3>{meal.title}</h3>
                <p><strong>Calories:</strong> {meal.calories}</p>
                <p><strong>Date:</strong> {new Date(meal.date).toLocaleDateString()}</p>

                <div style={{ marginTop: '0.5rem' }}>
                  {meal.tags?.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="stars" style={{ marginTop: '0.75rem' }}>
                  {meal.ratings?.length > 0
                    ? '★'.repeat(
                        Math.round(
                          meal.ratings.reduce((sum, r) => sum + r, 0) / meal.ratings.length
                        )
                      )
                    : 'No ratings'}
                </div>

                <button
                  type="button"
                  style={{ marginTop: '0.75rem' }}
                  onClick={() =>
                    setVisibleDesc((prev) => ({
                      ...prev,
                      [meal.id]: !prev[meal.id],
                    }))
                  }
                >
                  {visibleDesc[meal.id] ? 'Hide Description' : 'Show Description'}
                </button>

                <p
                  className={`description ${!visibleDesc[meal.id] ? 'hidden' : ''}`}
                  style={{ marginTop: '0.5rem' }}
                >
                  {meal.description}
                </p>

                <div className="action-btns" style={{ marginTop: '1rem' }}>
                  <a
                    href={`/meals/${meal.id}`}
                    className="edit-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    ✏️ Edit
                  </a>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(meal.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
