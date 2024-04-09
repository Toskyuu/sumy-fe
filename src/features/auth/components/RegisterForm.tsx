import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Hasła nie są takie same');
      setLoading(false);
      return;
    }

    try {
      navigate('/');
    } catch (error) {
      console.log(error);
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <div className="mb-1">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-1">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
            Hasło
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-1">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="confirmPassword">
            Potwiedź hasło
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="confirmPassword"
            type="password"
            placeholder="**********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-1 h-6 text-xs italic text-red-500">{error || ' '}</div>
        <div className="mt-1 flex flex-col space-y-4">
          <button
            className="focus:shadow-outline rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
            disabled={loading}>
            {loading ? 'Rejestracja...' : 'Zarejestruj się'}
          </button>
        </div>
      </form>
    </>
  );
};
