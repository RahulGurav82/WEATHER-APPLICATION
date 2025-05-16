import { useState } from "react";

function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 py-2 px-4 rounded-lg bg-white/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBox;