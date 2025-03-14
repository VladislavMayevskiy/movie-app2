import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import './styles/tailwind.css';

// Define your Login component (assuming you have it)
function Login() {
  return <div>Login Page</div>;
}

// Define your AuthPage component with routes
function AuthPage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <AuthPage /> {/* Include AuthPage for routing */}
  </BrowserRouter>
);
