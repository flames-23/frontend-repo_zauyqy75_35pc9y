import React, { useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import AuthModal from './components/AuthModal';
import TopicGenerator from './components/TopicGenerator';

function App() {
  const [query, setQuery] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const contentRef = useRef(null);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const topic = query.trim();
    if (!topic) return;
    setCurrentTopic(topic);
    // Smooth scroll to generated content
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const openLogin = () => { setAuthMode('login'); setShowAuth(true); };
  const openSignup = () => { setAuthMode('signup'); setShowAuth(true); };
  const onAuthSuccess = () => { setIsAuthenticated(true); };

  const heroContent = useMemo(() => (
    <div className="text-center space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        StudyBuddy AI
      </h1>
      <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
        Your intelligent study companion that explains concepts, gives examples, and quizzes you with immediate feedback.
      </p>
      <div className="max-w-2xl mx-auto">
        <SearchBar value={query} onChange={setQuery} onSubmit={onSubmitSearch} placeholder="Enter your Topic" />
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
        onLogo={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />

      <div className="mt-4 sm:mt-8">
        <Hero>
          {heroContent}
        </Hero>
      </div>

      {!isAuthenticated && (
        <div className="mt-10 text-center text-sm text-white/70">
          Learn any topic with a clear roadmap, hands-on examples, and bite-sized quizzes.
        </div>
      )}

      {currentTopic && (
        <section ref={contentRef} className="mt-12 mb-20">
          <header className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Roadmap: {currentTopic}</h2>
              <p className="text-white/70 mt-1">Auto-generated breakdown with explanations, practice questions, and a quick quiz in each section.</p>
            </div>
            <button
              onClick={() => { setCurrentTopic(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-3 py-2 text-sm rounded-md border border-white/20 hover:border-white/40"
            >
              New topic
            </button>
          </header>

          <TopicGenerator topic={currentTopic} />
        </section>
      )}

      {showAuth && (
        <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onSuccess={onAuthSuccess} />
      )}
    </Layout>
  );
}

export default App;
