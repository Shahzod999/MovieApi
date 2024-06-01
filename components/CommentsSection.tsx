"use client";
import React, { useState, useEffect, useRef } from "react";
import Pic from "../public/noPic.jpg";
import Image from "next/image";
import { SlLike } from "react-icons/sl";
import { HiOutlineUserCircle } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import Authentication from "./Authentication";
import { useClickOutSide } from "@/hooks/useClickOutside";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectedUser } from "@/lib/authSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Comment {
  name: string;
  time: string;
  comments: string;
  likes: number;
}

const CommentsSection = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  const [hidden, setHidden] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutSide(menuRef, () => {
    setHidden(false);
  }); //для закрытия окна при нажатии на вне элемента

  const data: Comment[] = [
    {
      name: "Shahzod",
      time: "17:15",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 63,
    },
    {
      name: "Mirkodir",
      time: "10:45",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 23,
    },
    {
      name: "Farhod",
      time: "07:15",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 33,
    },
    {
      name: "Farohiddin",
      time: "12:07",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 13,
    },
    {
      name: "Farohiddin",
      time: "12:07",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 13,
    },
    {
      name: "Farohiddin",
      time: "12:07",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 13,
    },
    {
      name: "Farohiddin",
      time: "12:07",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 13,
    },
    {
      name: "Farohiddin",
      time: "12:07",
      comments: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, asperiores.",
      likes: 13,
    },
  ];

  const [comments, setComments] = useState<Comment[]>(() => {
    const savedData = localStorage.getItem("comments");
    return savedData ? (JSON.parse(savedData) as Comment[]) : data;
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const commentHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input = formData.get("commentInput") as string;
    const date = new Date();
    const time = `${date.getDate()}day${date.getHours()}:${date.getMinutes()}`;

    setComments((prev: Comment[]) => [
      ...prev,
      {
        name: "Default",
        time,
        comments: input,
        likes: 0,
      },
    ]);
    event.currentTarget.reset();

    const dataComments = doc(db, "comment", user?.uid);
    await setDoc(dataComments, {
      name: "Shahzod",
      numb: "1",
      first: "test3",
    });
  };

  return (
    <>
      <div className="fixed bg-stone-900 rounded-lg p-[20px] flex flex-col gap-5">
        <div className="p-[10px] border-b-[1px] border-gray-500 flex justify-between items-center">
          <span>Comments</span>

          {user ? (
            <>
              <strong>{user.email}</strong>
              <div className="flex gap-2 items-center cursor-pointer hover:text-rose-500" onClick={() => dispatch(logout())}>
                <strong>LogOut</strong>
                <TbLogout size="30px" />
              </div>
            </>
          ) : (
            <div className="flex gap-2 items-center cursor-pointer hover:text-cyan-500" onClick={() => setHidden(!hidden)}>
              <strong>LogIn</strong>
              <HiOutlineUserCircle size="30px" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Image src={Pic} alt="" className="w-[30px] h-[30px] object-cover rounded-full" />
            {user ? (
              <div className="w-full">
                <form onSubmit={commentHandler}>
                  <input name="commentInput" type="text" placeholder="Add comment..." className="p-[8px] rounded-lg w-full h-full" required />
                </form>
              </div>
            ) : (
              <p>Please log in to leave a comment.</p>
            )}
          </div>
          <div className="overflow-y-scroll h-[60vh] noscroll">
            {comments.map((comment, index) => (
              <div className="flex gap-2 mb-10" key={index}>
                <Image src={Pic} alt="" className="w-[30px] h-[30px] object-cover rounded-full" />
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <span>{comment.name}</span>
                    <span>{comment.time}</span>
                  </div>
                  <p>{comment.comments}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex  gap-2 items-center">
                      <SlLike />
                      <strong>{comment.likes}</strong>
                    </div>
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`fixed ${hidden ? "grid" : "hidden"} top-0 left-0 right-0 bottom-0 backdrop-blur bg-gradient-to-r from-purple-900/10 via-black/10 to-purple-900/10 z-10  place-items-center`}>
        <div className="rounded-xl border border-neutral-800 p-10 bg-black/60 shadow-lg backdrop-blur-md" ref={menuRef}>
          <Authentication setHidden={setHidden} />
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
