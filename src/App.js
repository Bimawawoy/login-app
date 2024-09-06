import { useState } from 'react';
import './App.css'; 

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const url = isFlipped ? 'http://localhost:5000/signup' : 'http://localhost:5000/login';
  const data = { username, password };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'User created successfully' || data.message === 'Login successful') {
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          {/* Login Card */}
          <div className="flip-card-front bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input className="w-full px-3 py-2 text-black rounded-lg focus:outline-none" type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="w-full px-3 py-2 text-black rounded-lg focus:outline-none" type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none">
                Login
              </button>
            </form>
            <button onClick={toggleForm} className="mt-4 text-blue-300 hover:text-blue-500 focus:outline-none">
              Don't have an account? Sign Up
            </button>
          </div>
          
          {/* Signup Card */}
          <div className="flip-card-back bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input className="w-full px-3 py-2 text-black rounded-lg focus:outline-none" type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="w-full px-3 py-2 text-black rounded-lg focus:outline-none" type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none">
                Sign Up
              </button>
            </form>
            <button onClick={toggleForm} className="mt-4 text-blue-300 hover:text-blue-500 focus:outline-none">
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
