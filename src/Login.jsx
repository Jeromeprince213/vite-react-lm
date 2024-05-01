import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitRef = useRef(null); // Ref for submit button

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // If already submitting, do nothing
    setIsSubmitting(true); // Set submitting state to true
    try {
      const res = await axios.post('https://sfw2zmowq5.execute-api.ap-southeast-2.amazonaws.com/betaogin', {
        email,
        password
      });
      localStorage.setItem('token', res.data.val.idToken.jwtToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.data) {
        console.log('Error Response Data:', error.response.data);
        setResponse(JSON.stringify(error.response.data));
      } else {
        setResponse('An unknown error occurred.');
      }
    } finally {
      setIsSubmitting(false); // Set submitting state back to false
      submitRef.current.disabled = false; // Re-enable submit button
    }
  };

  if (isAuthenticated) {
    return <Navigate replace to="/home" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 rounded-lg shadow-md p-8">
        <img src="https://via.placeholder.com/150" alt="Company Logo" className="mx-auto h-16 w-auto" /> {/* Placeholder logo */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-100">Remember me</label>
            </div>
          </div>
          <div>
            <button ref={submitRef} type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M4 8a6 6 0 1112 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm2-2v4a4 4 0 004 4h4a4 4 0 00-4-4V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
                </svg>
              </span>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div>
          <h2 className="text-center text-red-500">{response}</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
