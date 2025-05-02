
import CardList from '@/app/components/CardList';
// adjust the path if needed

export default function Home() {
  return (
    <div className="container">
      <h1>NutriSnap - Smart Meal Tracker</h1>

      {/* Render the CardList component */}
      <CardList />
    </div>
  );
}
