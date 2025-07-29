import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsSigned } = useOutletContext();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login Failed");
      }
      if (!data.user || !data.token) {
        throw new Error("Login response incomplete.");
      }

      // ✅ Save JWT token and user data
      localStorage.setItem("token", data.token); // Assuming you return a token from backend
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data.user, "data user")

      setIsSigned(true);
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>

        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            required
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

        
        </form>
      </div>
    </div>
  );

}

export default Login;
