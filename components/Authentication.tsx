"use client";
import { useState } from "react";
import { BsCloudDownload } from "react-icons/bs";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login, selectedUser } from "@/lib/authSlice";

const Authentication = ({ setHidden }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerOrLogin = register ? createUserWithEmailAndPassword : signInWithEmailAndPassword;

    registerOrLogin(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login(user));
        setHidden(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  const user = useSelector(selectedUser);
  console.log(user, "userrr");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
      <label htmlFor="image" className="flex gap-5 items-center p-10 border border-neutral-800 rounded-full cursor-pointer hover:opacity-80 hover:text-neon-blue-bg active:text-neon-blue-bg transition duration-300">
        <BsCloudDownload className="text-4xl text-neon-blue-bg" />
      </label>
      <input type="file" id="image" className="hidden" />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 w-72 rounded-xl px-8 border border-neon-blue-bg bg-black text-white placeholder-neon-blue-bg focus:outline-none focus:ring-2 focus:ring-neon-blue-bg"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-12 w-72 rounded-xl px-8 border border-neon-blue bg-black text-white placeholder-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue"
        required
      />
      <button type="submit" className="h-12 w-72 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-neon-blue-light active:bg-neon-blue-dark transition duration-300 shadow-neon-blue-bg-glow">
        {register ? "Register" : "Sign In"}
      </button>
      {error && <span className="text-rose-800">Wrong Email or Password</span>}
      <span className="text-white">or</span>
      <button type="button" className="h-12 w-72 rounded-xl bg-neon-blue text-white font-semibold hover:bg-neon-blue-light active:bg-neon-blue-dark transition duration-300 shadow-neon-blue-glow" onClick={() => setRegister(!register)}>
        {register ? "Are u reddy to login?" : "Do u wanna register?"}
      </button>
    </form>
  );
};

export default Authentication;
