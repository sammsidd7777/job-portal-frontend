import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../RTK/AuthService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setMessage("");

    try {
      const res = await loginUser(data).unwrap();

      console.log("Login user:", res?.user);

      dispatch(
        setCredentials({
          user: res?.user,
          token: res?.token,
        })
      );

      // Close login modal
      if (onClose) {
        onClose();
      }

      // Redirect HR
      if (res?.user?.role === "hr") {
        navigate("/hr/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);

      setMessage(
        err?.data?.message ||
        err?.message ||
        "Invalid email or password"
      );
    }
  };

  return (
    <div className="w-full">

      {/* ERROR MESSAGE */}
      {message && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      {/* LOGIN FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-200 bg-gray-50
            px-4 py-3 text-sm text-gray-900 outline-none transition
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-200 bg-gray-50
            px-4 py-3 text-sm text-gray-900 outline-none transition
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r
          from-blue-600 to-indigo-600 py-3 font-semibold text-white
          shadow-lg shadow-blue-500/20 transition
          hover:-translate-y-0.5 hover:shadow-xl
          disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;