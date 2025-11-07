import React from 'react';
import { User } from 'lucide-react';

const Navbar = ({ isAuthenticated, onLogin, onSignup, onProfile, onLogo }) => {
  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 py-4">
      <div className="flex items-center gap-2 cursor-pointer select-none" onClick={onLogo}>
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-orange-400" />
        <span className="text-lg sm:text-xl font-semibold tracking-tight">StudyBuddy AI</span>
      </div>

      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          <>
            <button onClick={onLogin} className="px-4 py-2 text-sm font-medium rounded-md border border-white/20 hover:border-white/40 transition">
              Log in
            </button>
            <button onClick={onSignup} className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-orange-400 text-white shadow hover:brightness-110 transition">
              Sign up
            </button>
          </>
        ) : (
          <button onClick={onProfile} className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-white/20 hover:border-white/40 transition">
            <User size={18} />
            <span>My profile</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
