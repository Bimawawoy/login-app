import { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';
    const data = { username, password };

    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch(error => {
        console.error(error);
        alert(error.response.data.message);
      });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-700"
           style={{ transform: isLogin ? 'rotateY(0deg)' : 'rotateY(180deg)' }}>
        <h2 className="text-2xl text-white text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="w-full px-3 py-2 text-black rounded-lg focus:outline-none" type="text" id="username" placeholder="Username"
                   value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="w-full px-3 py-2 text-black rounded-lg focus:outline-none" type="password" id="password" placeholder="Password"
                   value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={toggleForm}
          className="mt-4 text-blue-300 hover:text-blue-500 focus:outline-none">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default App;
