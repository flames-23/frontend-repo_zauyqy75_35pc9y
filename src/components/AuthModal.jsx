import React, { useState } from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder }) => (
  <label className="block">
    <span className="text-sm text-gray-200">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1 w-full px-3 py-2 rounded-md bg-white/90 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </label>
);

const AuthModal = ({ mode = 'login', onClose, onSuccess }) => {
  const [authMode, setAuthMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // For now, simulate success; backend auth can be wired later.
    onSuccess({ email, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-gradient-to-b from-gray-900 to-black p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {authMode === 'login' ? 'Welcome back' : 'Create your account'}
          </h3>
          <button onClick={onClose} className="text-sm text-gray-300 hover:text-white">Close</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <Input label="Mobile Number" value={phone} onChange={setPhone} placeholder="e.g. +1 555 555 5555" />
          )}
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

          <button type="submit" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-orange-400 text-white font-semibold shadow">
            {authMode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-300">
          {authMode === 'login' ? (
            <button className="underline" onClick={() => setAuthMode('signup')}>New here? Create an account</button>
          ) : (
            <button className="underline" onClick={() => setAuthMode('login')}>Already have an account? Log in</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
