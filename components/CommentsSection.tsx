"use client";
import React, { useState, useEffect } from "react";
import Pic from "../public/noPic.jpg";
import Image from "next/image";
import { SlLike } from "react-icons/sl";

const CommentsSection = () => {
  const data = [
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
  const [comments, setComments] = useState(() => {
    const savedData = localStorage.getItem("comments");
    return savedData ? JSON.parse(savedData) : data;
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const commentHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input = formData.get("commentInput") as string;
    const date = new Date();
    const time = `${date.getDate()}day${date.getHours()}:${date.getMinutes()}`;

    setComments((prev) => [
      ...prev,
      {
        name: "Default",
        time,
        comments: input,
        likes: 0,
      },
    ]);
    event.currentTarget.reset();
  };

  return (
    <div className="fixed bg-stone-900 rounded-lg p-[20px] flex flex-col gap-5">
      <div className="p-[10px] border-b-[1px] border-gray-500">
        <span>Comments</span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Image src={Pic} alt="" className="w-[30px] h-[30px] object-cover rounded-full" />
          <div className="w-full">
            <form onSubmit={commentHandler}>
              <input name="commentInput" type="text" placeholder="Add comment..." className="p-[8px] rounded-lg w-full h-full" required />
            </form>
          </div>
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
  );
};

export default CommentsSection;
