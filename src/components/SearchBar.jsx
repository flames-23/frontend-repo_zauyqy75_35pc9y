import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, onSubmit, placeholder = 'Enter your Topic' }) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex items-center gap-2 bg-transparent rounded-xl border border-white/40 p-2 shadow-none">
      <Search className="text-white/80 ml-2" size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white outline-none px-2 py-2 placeholder:italic placeholder:text-white/60"
      />
      <button type="submit" className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
