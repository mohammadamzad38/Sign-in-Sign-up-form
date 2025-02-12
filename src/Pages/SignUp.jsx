import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    setErrorMessage("");
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log(result.user);
      setSuccess(true);
    })
    .catch((error) => {
      console.log("error", error.message);
      setErrorMessage(error.message);
      setSuccess(false);
    });
    
    if(!terms){
      setErrorMessage("Please Except our terms & conditions")
      return;
    }

    if (password?.length < 6) {
      setErrorMessage("Password Should be atleast 6 charecter");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,}$/;

    if (!passwordRegex?.test(password)) {
      setErrorMessage("Please fill minimmum charecter");
      return;
    }

   
  };
  return (
    <div className="card bg-base-100 w-full my-20 max-w-sm shrink-0 shadow-2xl relative">
      <h1 className="text-center p-5 border rounded-t-xl bg-gray-300 font-bold">
        Sign Up Now!
      </h1>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-14 bottom-[205px]"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label justify-start cursor-pointer">
            <input type="checkbox" name="terms" className="checkbox checkbox-xs" />
            <span className="label-text ml-2">Accept our terms & conditions</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p className="text-center py-2">If you haven't account please <Link className="hover:text-green-500 hover:font-bold translate-8" to="/register">Register</Link></p>

      </form>
      {errorMessage && (
        <p className="text-red-700 text-center p-2">{errorMessage}</p>
      )}
      {success && (
        <p className="text-green-400 font-bold text-center p-2">
          Successfully Sign-up
        </p>
      )}
    </div>
  );
};

export default SignUp;
