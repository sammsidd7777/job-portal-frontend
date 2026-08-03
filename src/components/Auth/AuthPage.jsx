import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import Login from "../forms/Login";
import Register from "../forms/Register";

const AuthPage = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Called after successful registration
  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900 md:p-8">

      {/* CLOSE BUTTON */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-9 w-9
        items-center justify-center rounded-full
        text-gray-400 transition hover:bg-gray-100
        hover:text-gray-700 dark:hover:bg-gray-800"
      >
        <IoClose size={22} />
      </button>

      {/* HEADER */}
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isLogin ? "Welcome Back 👋" : "Create Your Account"}
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {isLogin
            ? "Login to continue your journey"
            : "Join JobHunter and find your next opportunity"}
        </p>
      </div>

      {/* LOGIN / REGISTER ANIMATION */}
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Login onClose={onClose} />

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-semibold text-blue-600 hover:underline"
              >
                Register
              </button>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Register
              changeTologin={handleRegisterSuccess}
            />

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}

              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;