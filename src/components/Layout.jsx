import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(124,58,237,0.25),transparent_60%),radial-gradient(900px_500px_at_80%_10%,rgba(59,130,246,0.2),transparent_60%),radial-gradient(800px_500px_at_20%_10%,rgba(249,115,22,0.2),transparent_60%),#0b0b10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
