import React, { useMemo } from 'react';

// Simple local generator to simulate AI content. In a full app, this would call the backend.
const sampleData = (topic) => {
  const base = topic.trim() || 'Introduction to Algorithms';
  const subtopics = [
    'Foundations and Big-O',
    'Data Structures Basics',
    'Sorting and Searching',
    'Greedy vs Dynamic Programming',
  ];

  const explanations = {
    'Foundations and Big-O': `${base}: Understand input size (n), growth rates, and how Big-O describes worst-case performance.`,
    'Data Structures Basics': `${base}: Learn arrays, stacks, queues, hash tables, and trees—how they store and access data.`,
    'Sorting and Searching': `${base}: Compare common sorts (bubble, merge, quick) and searching (linear, binary).`,
    'Greedy vs Dynamic Programming': `${base}: Learn when local-optimal choices work and when overlapping subproblems need DP.`,
  };

  const examples = {
    'Foundations and Big-O': [
      'What is the time complexity of traversing an array?','How does Big-O ignore constants and lower-order terms?','Why is O(n log n) often better than O(n^2)?'
    ],
    'Data Structures Basics': [
      'When would you use a stack vs a queue?','What is the average lookup time for a hash table?','How does a binary tree differ from a linked list?'
    ],
    'Sorting and Searching': [
      'When does quicksort degrade in performance?','Why is merge sort stable?','How does binary search work on a sorted array?'
    ],
    'Greedy vs Dynamic Programming': [
      'Give an example where greedy fails.','What defines overlapping subproblems?','Name a classic DP problem.'
    ],
  };

  const quizzes = {
    'Foundations and Big-O': [
      { q: 'Traversing an array of n items is:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], answer: 2 },
      { q: 'Big-O focuses on:', options: ['Exact timings', 'Growth rates', 'Best case only', 'Space only'], answer: 1 },
    ],
    'Data Structures Basics': [
      { q: 'Average hash table lookup is:', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], answer: 0 },
      { q: 'Queue removal happens at:', options: ['Front', 'Back', 'Middle', 'Random'], answer: 0 },
    ],
    'Sorting and Searching': [
      { q: 'Binary search requires:', options: ['Random data', 'Sorted data', 'Hashing', 'Graph'], answer: 1 },
      { q: 'Worst-case quicksort is:', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], answer: 2 },
    ],
    'Greedy vs Dynamic Programming': [
      { q: 'Greedy makes decisions based on:', options: ['Global optimum', 'Local optimum', 'Backtracking', 'Random choice'], answer: 1 },
      { q: 'DP is suitable when there are:', options: ['Independent subproblems', 'Overlapping subproblems', 'No subproblems', 'Only graph problems'], answer: 1 },
    ],
  };

  return { base, subtopics, explanations, examples, quizzes };
};

const TopicGenerator = ({ topic }) => {
  const { subtopics, explanations, examples, quizzes } = useMemo(() => sampleData(topic), [topic]);

  return (
    <div className="space-y-8">
      {subtopics.map((title) => (
        <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-white/80 mt-2">{explanations[title]}</p>

          <div className="mt-4">
            <h4 className="font-medium">Practice questions</h4>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-white/90">
              {examples[title].map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <h4 className="font-medium mb-2">Quick quiz</h4>
            <QuizBlock questions={quizzes[title]} />
          </div>
        </div>
      ))}
    </div>
  );
};

const QuizBlock = ({ questions }) => {
  const [answers, setAnswers] = React.useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = React.useState(false);

  const score = React.useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
  }, [submitted, answers, questions]);

  const submit = () => setSubmitted(true);

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

const ResultCircle = ({ score, total }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="60" height="60" className="rotate-[-90deg]">
      <circle cx="30" cy="30" r={radius} stroke="#1f2937" strokeWidth="8" fill="none" />
      <circle
        cx="30"
        cy="30"
        r={radius}
        stroke="#22c55e"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="none"
      />
      <text x="30" y="34" textAnchor="middle" className="fill-white text-xs font-semibold rotate-[90deg]">
        {score}/{total}
      </text>
    </svg>
  );
};

export default TopicGenerator;
