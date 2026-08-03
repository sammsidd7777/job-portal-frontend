import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../RTK/AuthService";
import { useForm } from "react-hook-form";

import EditProfileImg from "../../components/forms/candidate/EditProfileImg";
import ArrayInputField from "../../components/forms/candidate/ArrayInputField";
import AddEducation from "../../components/forms/candidate/AddEducation";
import { Link } from "react-router-dom";

const Profile = () => {
  const { data, isLoading, isError } = useGetProfileQuery();

  const [updateUser, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

  const [editProfileImg, setEditProfileImg] = useState(false);

  const [skill, setSkill] = useState("");
  const [skillArr, setSkillArr] = useState([]);
  const [skillToAdd, setSkillToAdd] = useState("");

  const [showAddEducation, setShowAddEducation] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const user = data?.user;
  const profileScore = data?.profileScore || 0;
  const thingsToUpdate = data?.thingsToUpdate || [];

  console.log(user,"userProfile")
  /*
  |--------------------------------------------------------------------------
  | Load User Data
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (user) {
      reset(user);

      const skills = user.skills || [];

      setSkillArr(skills);
      setValue("skills", skills);
    }
  }, [ reset, setValue]);

  /*
  |--------------------------------------------------------------------------
  | Update Profile
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (formData) => {
    try {
    let res =  await updateUser(formData).unwrap();
   
   

      setEditProfileImg()

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);

      alert(
        error?.data?.message ||
        "Failed to update profile"
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error State
  |--------------------------------------------------------------------------
  */

  if (isError) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-red-600">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="w-full">

      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold tracking-tight">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal information, skills, education, and resume.
          </p>

        </div>


        {/* MAIN GRID */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">


          {/* ===================================================== */}
          {/* LEFT SIDEBAR */}
          {/* ===================================================== */}

          <div className="space-y-6">


            {/* PROFILE IMAGE */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="flex flex-col items-center text-center">

                <div className="relative">

                  <div className="rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-[3px]">

                    <img
                      src={`http://localhost:5000${user?.profilePic}`}
                      alt="Profile"
                      className="h-28 w-28 rounded-full object-cover"
                    />

                  </div>


                  {/* EDIT IMAGE BUTTON */}

                  <button
                    type="button"
                    onClick={() => setEditProfileImg(true)}
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                  >
                    ✎
                  </button>


                  {/* IMAGE MODAL */}

                  {editProfileImg && (
                    <EditProfileImg
                      onClose={setEditProfileImg}
                    />
                  )}

                </div>


                <h2 className="mt-4 text-lg font-semibold">
                  {user?.name || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {user?.email}
                </p>

              </div>

            </div>


            {/* PROFILE STRENGTH */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Profile Strength
                </span>

                <span className="text-sm font-semibold text-blue-600">
                  {profileScore}%
                </span>

              </div>


              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                  style={{
                    width: `${profileScore}%`,
                  }}
                />

              </div>


              {thingsToUpdate.length > 0 ? (

                <div className="mt-4 space-y-2">

                  {thingsToUpdate.map((item, index) => (

                    <p
                      key={index}
                      className="text-xs text-slate-500"
                    >
                      • {item}
                    </p>

                  ))}

                </div>

              ) : (

                <p className="mt-4 text-xs text-green-600">
                  🎉 Profile completed 100%
                </p>

              )}

            </div>


            {/* RESUME */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-semibold">
                  Resume
                </h3>

                <span className="text-xl">
                  📄
                </span>

              </div>


              {user?.resume ? (

                <a
                  href={`http://localhost:5000/${user.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Resume →
                </a>

              ) : (

                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  <Link to="/candidate/resume" > 
                  + Upload Resume
                  </Link>
                </button>

              )}

            </div>

          </div>


          {/* ===================================================== */}
          {/* MAIN CONTENT */}
          {/* ===================================================== */}

          <div className="space-y-8 lg:col-span-2">


            {/* PERSONAL INFORMATION */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >

              <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">

                <div>

                  <h2 className="text-lg font-semibold">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Keep your profile information up to date.
                  </p>

                </div>


                <button
                  type="submit"
                  disabled={isUpdating}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>


              {/* NAME + PHONE */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>

                  <label className="text-xs font-medium text-slate-500">
                    Full Name
                  </label>

                  <input
                    {...register("name")}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
                  />

                </div>


                <div>

                  <label className="text-xs font-medium text-slate-500">
                    Phone
                  </label>

                  <input
                    {...register("phone")}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
                  />

                </div>

              </div>


              {/* BIO */}

              <div className="mt-5">

                <label className="text-xs font-medium text-slate-500">
                  Bio
                </label>

                <textarea
                  {...register("bio")}
                  rows="4"
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>


              {/* SKILLS */}

              <div className="mt-5">

                <label className="text-xs font-medium text-slate-500">
                  Skills
                </label>


                <div className="mt-2 flex gap-2">

                  <input
                    value={skill}
                    onChange={(e) =>
                      setSkill(e.target.value)
                    }
                    placeholder="e.g. React.js"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
                  />


                  <button
                    type="button"
                    onClick={() => {

                      if (!skill.trim()) return;

                      setSkillToAdd(
                        skill.trim()
                      );

                      setSkill("");

                    }}
                    className="rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Add
                  </button>

                </div>


                <ArrayInputField
                  addItem={skillToAdd}
                  initialItems={skillArr}
                  onChange={(arr) => {

                    setSkillArr(arr);

                    setValue(
                      "skills",
                      arr
                    );

                  }}
                />

              </div>

            </form>


            {/* EDUCATION */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    Education
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your educational background.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setShowAddEducation(true)
                  }
                  className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400"
                >
                  + Add
                </button>

              </div>


              {showAddEducation && (

                <AddEducation
                  onClose={() =>
                    setShowAddEducation(false)
                  }
                />

              )}

            </div>


            {/* SKILLS DISPLAY */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h3 className="mb-4 font-semibold">
                Your Skills
              </h3>


              {skillArr.length > 0 ? (

                <div className="flex flex-wrap gap-2">

                  {skillArr.map((skill, index) => (

                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="text-sm text-slate-500">
                  No skills added yet.
                </p>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;