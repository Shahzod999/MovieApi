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
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";

interface Comment {
  id: string;
  timeStamp: Timestamp; // Change type to Timestamp
  comment: string;
  likes: number;
  name: string;
}

const CommentsSection = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  const [hidden, setHidden] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutSide(menuRef, () => {
    setHidden(false);
  }); //для закрытия окна при нажатии на вне элемента

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsCollection = collection(db, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsList = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Comment[];
      setComments(commentsList);
    };
    fetchComments();
  }, [user]);

  const commentHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input = formData.get("commentInput") as string;

    const newComment: Omit<Comment, "id"> = {
      comment: input,
      timeStamp: serverTimestamp() as unknown as Timestamp,
      likes: 0,
      name: user?.email || "Anonymous",
    };
    event.currentTarget.reset();

    try {
      const commentsCollection = collection(db, "comments");
      const docRef = await addDoc(commentsCollection, {
        ...newComment,
        timeStamp: serverTimestamp(),
      });
      setComments((prev) => [...prev, { ...newComment, id: docRef.id }]);
    } catch (error) {
      console.log("Error adding comment: ", error);
    }
  };

  return (
    <>
      <div className="fixed bg-stone-900 rounded-lg p-[20px] flex flex-col gap-5">
        <div className="p-[10px] border-b-[1px] border-gray-500 flex flex-wrap justify-between items-center gap-7">
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
            {comments.map((comment) => (
              <>
                <div className="flex gap-2 mb-10" key={comment.id}>
                  <Image src={Pic} alt="" className="w-[30px] h-[30px] object-cover rounded-full" />
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                      <span>{comment.name}</span>
                      <span>{comment.timeStamp.toDate().toLocaleString()}</span>
                    </div>
                    <p>{comment.comment}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex  gap-2 items-center">
                        <SlLike />
                        <strong>{comment.likes}</strong>
                      </div>
                      <span>Reply</span>
                    </div>
                  </div>
                </div>
              </>
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
