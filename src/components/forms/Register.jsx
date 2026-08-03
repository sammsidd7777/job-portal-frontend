import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Building2, X } from "lucide-react";

import { useGetAllcompanyQuery } from "../../RTK/CompanyService";
import { useRegisterUserMutation } from "../../RTK/AuthService";
import CreateCompany from "./hr/CreateCompany";

const Register = ({ changeTologin }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "user",
      company: "",
    },
  });

  const { data: companyData, refetch } = useGetAllcompanyQuery();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const role = watch("role");

  const [showCreateCompany, setShowCreateCompany] = useState(false);

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();

      alert("Registration successful. Please login.");
      changeTologin();
    } catch (err) {
      alert(err?.data?.message || "Registration failed");
    }
  };

  const handleCompanyCreated = async (newCompany) => {
    await refetch();

    setShowCreateCompany(false);

    reset((prev) => ({
      ...prev,
      company: newCompany._id,
    }));
  };

  return (
    <>
      {/* Create Company Modal */}
      {showCreateCompany && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowCreateCompany(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <CreateCompany
              onSuccess={handleCompanyCreated}
              onClose={() => setShowCreateCompany(false)}
            />
          </div>
        </div>
      )}

      {/* Register Form */}
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Create a strong password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Account Type
            </label>

            <select
              {...register("role")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="user">Candidate / Job Seeker</option>
              <option value="hr">HR / Recruiter</option>
            </select>
          </div>

          {/* Company */}
          {role === "hr" && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Select Company
              </label>

              <div className="relative">
                <Building2
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  {...register("company", {
                    required: "Please select a company",
                  })}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  onChange={(e) => {
                    if (e.target.value === "new") {
                      setShowCreateCompany(true);
                    }
                  }}
                >
                  <option value="">Select your company</option>

                  {companyData?.companies?.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.companyName}
                    </option>
                  ))}

                  <option value="new">
                    ➕ Create New Company
                  </option>
                </select>
              </div>

              {errors.company && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.company.message}
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-xs text-gray-500">
            By creating an account, you agree to our terms and privacy policy.
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;