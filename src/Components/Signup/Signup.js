import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../Firebase/Firebase.init';
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });

  
  // console.log(email);

  const googleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/")

      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

      });
  }

  const handleEmail = (emailInput) => {
    if (/\S+@\S+\.\S+/.test(emailInput)) {

      setEmail({ value: emailInput, error: "" });
    }
    else {
      setEmail({ value: "", error: "Invalid email" });
    }
  }

  const handlePassword = (passwordInput) => {
    if (passwordInput.length < 6) {
      setPassword({ value: '', error: "password min 6 character" });
    } else {
      setPassword({ value: passwordInput, error: "" });
    }

  }
  const handlesetConfirmPassword = (confirmPasswordInput) => {
    if(confirmPasswordInput === password.value){
      setConfirmPassword({ value: confirmPasswordInput, error: "" });
    }
    else{
      setConfirmPassword({ value:"", error: "Password Mismatched" }); 
    } 
  }



  const handleSignup = event => {
    event.preventDefault();
    // toast.error("hello", {is: 'a'})
    // toast.success("hello", {is: 'b'})

    if(email.value === ""){
      setEmail({ value: "", error: "Email is required" });
    }
    if(password.value === ""){
      setPassword({ value: "", error: "Password is required" });
    }
   

    if (email.value && password.value && confirmPassword.value === password.value) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate('/')
          toast.success("success", {is: 'b'})
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("email-already-in-use", {is: 'a'})
          // ..
        });
    }
  };

  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input onBlur={(event) => handleEmail(event.target.value)} type='email' name='email' id='email' />
            </div>
            {
              email?.error && <p style={{ color: 'red', textAlign: 'center', marginTop: '2px' }}>{email.error}</p>
            }
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input onBlur={(event) => handlePassword(event.target.value)} type='password' name='password' id='password' />
            </div>
            {
              password?.error && <p style={{ color: 'red', textAlign: 'center', marginTop: '2px' }}>{password.error}</p>
            }
          </div>
          <div className='input-field'>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <div className='input-wrapper'>
              <input onBlur={(event) => handlesetConfirmPassword(event.target.value)}
                type='password'
                name='confirmPassword'
                id='confirm-password'
              />
            </div>
            {
              confirmPassword?.error && <p style={{ color: 'red', textAlign: 'center', marginTop: '2px' }}>{confirmPassword.error}</p>
            }
          </div>
          <button type='submit' className='auth-form-submit'>
            Sign Up
          </button>
        </form>
        <p className='redirect'>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={googleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
