import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "../features/noteSlice";
import formattedDate from "../hooks/UseformattedDate";

const CreateNote = () => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();

    if (title && details) {
      const note = {
        id: uuidv4(),
        title,
        details,
        date: formattedDate(),
      };
      dispatch(addNote(note));

      navigate("/");
    }
  };

  return (
    <section className="w-full sm:w-md mx-auto py-4 px-4 sm:px-0">
      <main className="bg-[#3F3A47] my-8 shadow-2xl rounded-4xl">
        <header className="flex justify-between items-center py-4 px-4">
          <Link
            to={"/"}
            className="bg-[#4f4bbd] text-amber-50/80 h-13 w-13 flex items-center justify-center rounded-2xl hover:scale-104 active:shadow-none active:scale-95 transition-all duration-100"
          >
            <MdArrowBackIos size={28} />{" "}
          </Link>

          <h1 className="text-amber-50/70 text-2xl sm:text-3xl ">New Note</h1>

          <button
            onClick={handleSubmit}
            className="bg-[#4f4bbd] text-amber-50/80 h-13 w-13 flex items-center justify-center rounded-2xl hover:scale-104 active:shadow-none active:scale-95 transition-all duration-100"
          >
            <IoMdCheckmark size={32} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full px-4 py-2 rounded-xl text-3xl text-amber-50/80 outline-none"
          />
          <textarea
            rows={16}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-4 py-2 rounded-xl text-lg text-amber-50/80 outline-none"
            placeholder="Write note details"
          ></textarea>
        </form>
      </main>
    </section>
  );
};

export default CreateNote;
