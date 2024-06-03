"use client";
import { useEffect, useState } from "react";
import { BsCloudDownload } from "react-icons/bs";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

import { useDispatch } from "react-redux";
import { login } from "@/lib/authSlice";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import Image from "next/image";

interface AuthProps {
  setHidden: (value: boolean) => void;
}

const Authentication: React.FC<AuthProps> = ({ setHidden }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [register, setRegister] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [percent, setPercent] = useState<number>();

  const fetchImageUrl = async () => {
    if (auth.currentUser) {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      const userData = userDoc.data();
      if (userData && userData.foto) {
        return userData.foto;
      }
    }
    return ""; // Return an empty string if no foto is found
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const foto = await fetchImageUrl();
        dispatch(login({ ...user, foto }));
        setHidden(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };
  //

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercent(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const userRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await setDoc(doc(db, "users", res.user.uid), {
        name: data.name,
        email: data.email,
        foto: data.img,
      });
      dispatch(login({ ...res.user, foto: data.img }));
      setHidden(false);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  return (
    <form onSubmit={register ? userRegister : handleSubmit} className="flex flex-col gap-5 items-center">
      {register && (
        <>
          <label htmlFor="image" className="flex gap-5 justify-center items-center h-[100px] w-[100px] border border-neutral-800 rounded-full cursor-pointer hover:opacity-80 hover:text-neon-blue-bg active:text-neon-blue-bg transition duration-300">
            {data.img ? <Image src={data.img} alt="avatar" width={100} height={100} className="object-cover rounded-full" /> : <BsCloudDownload className="text-4xl text-neon-blue-bg" />}
          </label>
          {percent && percent + "%"}
          <input type="file" id="image" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" id="name" placeholder="Name" className="h-12 w-72 rounded-xl px-8 border border-neon-blue bg-black text-white placeholder-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue" required onChange={handleInput} />
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        id="email"
        // value={email}
        onChange={handleInput}
        className="h-12 w-72 rounded-xl px-8 border border-neon-blue-bg bg-black text-white placeholder-neon-blue-bg focus:outline-none focus:ring-2 focus:ring-neon-blue-bg"
        required
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        // value={password}
        onChange={handleInput}
        className="h-12 w-72 rounded-xl px-8 border border-neon-blue bg-black text-white placeholder-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue"
        required
      />
      <button type="submit" disabled={percent !== 0 && percent < 100} className="h-12 w-72 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-neon-blue-light active:bg-neon-blue-dark transition duration-300 shadow-neon-blue-bg-glow">
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
