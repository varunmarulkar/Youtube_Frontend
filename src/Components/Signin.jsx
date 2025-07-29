import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Signin = () => {

  // Form input states
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Context function to set sign-in status globally
  const { setIsSigned } = useOutletContext()

  const navigate = useNavigate()

  // Handle sign-in form submission
  async function handleSignin(e) {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Signup Failed")
      }

      // Update auth status and navigate to login
      setIsSigned(true)
      navigate("/Login")
    } catch (error) {
      alert(error.message)
    }


  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h1>

        <form className="flex flex-col" onSubmit={handleSignin}>
          <input
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            required
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Submit
          </button>

          <Link to="/login" className="mt-4 text-center text-sm text-blue-600 hover:underline">
            Already have an account? Log In
          </Link>
        </form>
      </div>
    </div>
  );

}

export default Signin
