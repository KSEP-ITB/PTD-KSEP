import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`You searched for: ${query}`); //temporary
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-[32vw] px-[1vw] py-[0.5vw] border border-gray-300 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-[0.5vw] py-[0.5vw] bg-[#8CAAF4] text-white border border-[#8CAAF4] rounded-r-2xl hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;