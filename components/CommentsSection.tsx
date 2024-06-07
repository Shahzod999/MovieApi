"use client";
import React, { useState, useEffect, useRef } from "react";
import Pic from "../public/noPic.jpg";
import Image from "next/image";
import { SlLike } from "react-icons/sl";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FcLike } from "react-icons/fc";
import { TbLogout } from "react-icons/tb";
import Authentication from "./Authentication";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectedUser } from "@/lib/authSlice";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";
import Cursor from "./Cursor";
import Framer from "./magnetic/Magnetic";

interface Comment {
  id: string;
  timeStamp: Timestamp; // Change type to Timestamp
  comment: string;
  likes: string[];
  foto: string;
  name: string;
  uid: string;
}

const CommentsSection = () => {
  const stickyElement = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  const [hidden, setHidden] = useState<boolean>(false);

  const toggleComments = () => {
    setHidden(!hidden);
  };

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsCollection = collection(db, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsList = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
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
      likes: [],
      foto: user?.foto || "",
      uid: user?.uid || "Anonymous",
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

  const handleLike = async (commentId: string) => {
    if (!user) return;

    try {
      const commentDoc = doc(db, "comments", commentId);
      const comment = comments.find((c) => c.id === commentId);

      if (comment) {
        if (comment.likes.includes(user.uid)) {
          // Пользователеь уже лайкнул комент можно удалить
          await updateDoc(commentDoc, {
            likes: arrayRemove(user.uid),
          });
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    likes: comment.likes.filter((uid) => uid !== user.uid),
                  }
                : comment
            )
          );
        } else {
          // Пользователеь еще не лайкал комента
          await updateDoc(commentDoc, {
            likes: arrayUnion(user.uid),
          });
          setComments((prevComments) => prevComments.map((comment) => (comment.id === commentId ? { ...comment, likes: [...comment.likes, user.uid] } : comment)));
        }
      }
    } catch (error) {
      console.log("Error updating like count: ", error);
    }
  };

  return (
    <>
      <div className="fixed bg-stone-900 rounded-lg p-[20px] flex flex-col gap-5">
        <div className="p-[10px] border-b-[1px] border-gray-500 flex flex-wrap justify-between items-center gap-7">
          <strong className="cursor-pointer">Comments</strong>

          {user ? (
            <div className="cursorTextHeader flex flex-wrap flex-1 justify-between cursorMixBlendMode">
              <strong>{user.email}</strong>
              <Framer>
                <div className="flex gap-2 items-center cursor-pointer hover:text-rose-500 relative" onClick={() => dispatch(logout())}>
                  <strong className="CursorTextLogMenu">
                    LogOut
                    <div ref={stickyElement} className="bounds"></div>
                  </strong>
                  <TbLogout size="30px" />
                </div>
              </Framer>
            </div>
          ) : (
            <div className="cursorTextHeader cursorMixBlendMode">
              <Framer>
                <div className="flex gap-2 items-center cursor-pointer hover:text-cyan-500" onClick={toggleComments}>
                  <strong className="CursorTextLogMenu">
                    Log-In
                    <div ref={stickyElement} className="bounds"></div>
                  </strong>
                  <HiOutlineUserCircle size="30px" />
                </div>
              </Framer>
            </div>
          )}
        </div>
        <Cursor stickyElement={stickyElement} />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-center items-center gap-2">
            {user?.foto ? <Image src={user.foto} alt="" width={150} height={150} className="w-[55px] h-[55px] object-cover rounded-full" /> : <Image src={Pic} alt="" className="w-[35px] h-[35px] object-cover rounded-full" />}

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
            {comments.map((comment) => {
              const isLiked = user && comment.likes.includes(user.uid);
              const LikeIcon = isLiked ? FcLike : SlLike;
              return (
                <div className="flex gap-2 mb-10" key={comment.id}>
                  {comment.foto ? <Image src={comment.foto} alt="" width={100} height={100} className="w-[35px] h-[35px] object-cover rounded-full" /> : <Image src={Pic} alt="" className="w-[35px] h-[35px] object-cover rounded-full" />}
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                      <span>{comment.name}</span>
                    </div>
                    <p>{comment.comment}</p>
                    <div className={`flex cursorMixBlendMode gap-2 items-center ${!user && "hover:after:content-['log-in-first']"}`} onClick={() => handleLike(comment.id)}>
                      <LikeIcon />
                      <strong>{comment.likes.length}</strong>
                      {/* <span>{comment.timeStamp.toDate().toLocaleString()}</span> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`fixed backdrop-blur top-0 left-0 right-0 bottom-0 grid place-items-center w-full h-full rounded-b-[25px] overflow-hidden transition-transform duration-1000 transform ${hidden ? "translate-y-0" : "-translate-y-full"}`}>
        <div className={`fixed w-[100%] h-[100%]  ${hidden ? "block" : "hidden"}`} onClick={toggleComments}></div>
        <div className="rounded-xl border border-neutral-800 p-10 bg-black/60 shadow-lg backdrop-blur-md">
          <Authentication setHidden={setHidden} />
        </div>
      </div>
    </>
  );
};

export default CommentsSection;

// backdrop-blur bg-gradient-to-r from-purple-900/10 via-black/10 to-purple-900/10
// bg-authBack bg-center bg-no-repeat bg-cover
