import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../Firebase.init";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setSuccess(false);
    setLoginError(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          setLoginError("Please verify your email address");
        } else {
          setSuccess(true);
        }

        sendEmailVerification(auth, currentUser).then(() => {
          console.log("verification email sent");
        });
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide a valid email address!");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("reset email sent, please check your email");
      });
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogIn}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-control relative">
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
              <label onClick={() => handleForgetPassword()} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <button
                className="absolute right-5 top-14"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center pb-4">
            <Link to="/signup" className="hover:text-green-300 hover:font-bold">
              Create your user account
            </Link>
          </p>
          {success && (
            <p className="text-green-500 font-bold text-center py-2">
              User login Successfully
            </p>
          )}
          {loginError && (
            <p className="text-red-500 text-center py-2">{loginError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
