import React from 'react';
import ResultCircle from './ResultCircle';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const TopicGenerator = ({ topic }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let active = true;
    const run = async () => {
      if (!topic) return;
      setLoading(true);
      setError('');
      setData(null);
      try {
        const res = await fetch(`${API_BASE}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic }),
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || 'Failed to generate');
        }
        const json = await res.json();
        if (!active) return;
        setData(json);
      } catch (e) {
        if (!active) return;
        setError(e.message || 'Something went wrong');
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => { active = false; };
  }, [topic]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm animate-pulse">
        <div className="h-5 w-40 bg-white/10 rounded" />
        <div className="mt-3 h-4 w-full bg-white/10 rounded" />
        <div className="mt-2 h-4 w-5/6 bg-white/10 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
        <div className="font-medium text-red-300">Could not generate content</div>
        <div className="text-red-200/80 text-sm mt-1">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { subtopics = [], explanations = {}, examples = {}, quizzes = {} } = data;

  return (
    <div className="space-y-8">
      {subtopics.map((title) => (
        <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-white/80 mt-2">{explanations[title]}</p>

          <div className="mt-4">
            <h4 className="font-medium">Practice questions</h4>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-white/90">
              {(examples[title] || []).map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <h4 className="font-medium mb-2">Quick quiz</h4>
            <QuizBlock questions={quizzes[title] || []} />
          </div>
        </div>
      ))}
    </div>
  );
};

const QuizBlock = ({ questions }) => {
  const [answers, setAnswers] = React.useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }, [questions]);

  const score = React.useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
  }, [submitted, answers, questions]);

  const submit = () => setSubmitted(true);

  if (!questions.length) {
    return <div className="text-sm text-white/70">No quiz available for this section.</div>;
  }

  return (
    <div>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <div className="mb-2 font-medium">{i + 1}. {q.q}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, idx) => {
              const selected = answers[i] === idx;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => !submitted && setAnswers((a) => a.map((v, j) => (j === i ? idx : v)))}
                  className={`text-left rounded-lg border px-3 py-2 transition ${selected ? 'border-green-400 bg-green-500/20' : 'border-white/10 hover:border-white/30'}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button onClick={submit} className="mt-2 rounded-lg bg-green-500 text-black font-medium px-4 py-2 hover:bg-green-400">
          Submit Quiz
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-4">
          <div className="text-sm text-white/80">Result:</div>
          <ResultCircle score={score} total={questions.length} />
        </div>
      )}
    </div>
  );
};

export default TopicGenerator;
