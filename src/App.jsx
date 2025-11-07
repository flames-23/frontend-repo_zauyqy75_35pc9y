import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import AuthModal from './components/AuthModal';

function App() {
  const [query, setQuery] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    // Search intent could route to planner/quiz later
  };

  const openLogin = () => { setAuthMode('login'); setShowAuth(true); };
  const openSignup = () => { setAuthMode('signup'); setShowAuth(true); };
  const onAuthSuccess = () => { setIsAuthenticated(true); };

  const contentTitle = useMemo(() => (
    <div className="text-center space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        StudyBuddy AI
      </h1>
      <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
        Code agents that think, talk and act. Your intelligent study companion that explains, quizzes, and schedules.
      </p>
      <div className="max-w-2xl mx-auto">
        <SearchBar value={query} onChange={setQuery} onSubmit={onSubmitSearch} />
      </div>
    </div>
  ), [query]);

  return (
    <Layout>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogin={openLogin}
        onSignup={openSignup}
        onProfile={() => {}}
        onLogo={() => {}}
      />

      <div className="mt-4 sm:mt-8">
        <Hero>
          {contentTitle}
        </Hero>
      </div>

      {!isAuthenticated && (
        <div className="mt-10 text-center text-sm text-white/70">
          Innovative solution for agent verse · Tagline: Code agents that think, talk and act · Focus: plan, reason and execute real tasks.
        </div>
      )}

      {showAuth && (
        <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onSuccess={onAuthSuccess} />
      )}
    </Layout>
  );
}

export default App;
