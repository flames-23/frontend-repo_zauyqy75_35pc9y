import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, onSubmit, placeholder = 'Enter your Topic' }) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-xl border border-white/40 p-2 shadow-sm">
      <Search className="text-gray-500 ml-2" size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none px-2 py-2 placeholder:italic placeholder:text-gray-400"
      />
      <button type="submit" className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
