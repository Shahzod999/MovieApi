"use client";
import { useState } from "react";
import { BsCloudDownload } from "react-icons/bs";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

import { useDispatch } from "react-redux";
import { login } from "@/lib/authSlice";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

interface AuthProps {
  setHidden: (value: boolean) => void;
}

const Authentication: React.FC<AuthProps> = ({ setHidden }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const registerOrLogin = register ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
    signInWithEmailAndPassword(auth, email, password)
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

  const userRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        name: "name",
        foto: "foto",
        comments: {
          comment: [],
          timeStamp: serverTimestamp(),
          likes: 0,
          name: "Anonymous",
        },
      });
      dispatch(login(res.user));
      setHidden(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={register ? userRegister : handleSubmit} className="flex flex-col gap-5 items-center">
      {register && (
        <>
          <label htmlFor="image" className="flex gap-5 items-center p-10 border border-neutral-800 rounded-full cursor-pointer hover:opacity-80 hover:text-neon-blue-bg active:text-neon-blue-bg transition duration-300">
            <BsCloudDownload className="text-4xl text-neon-blue-bg" />
          </label>
          <input type="file" id="image" className="hidden" onChange={handleChange} />
        </>
      )}

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
      {error && <span className="text-rose-500">Wrong Email or Password</span>}
      <span className="text-white">or</span>
      <button type="button" className="h-12 w-72 rounded-xl bg-neon-blue text-white font-semibold hover:bg-neon-blue-light active:bg-neon-blue-dark transition duration-300 shadow-neon-blue-glow" onClick={() => setRegister(!register)}>
        {register ? "Are u reddy to login?" : "Do u wanna register?"}
      </button>
    </form>
  );
};

export default Authentication;
