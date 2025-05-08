"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Hero } from "../../types/hero";

type Props = {
  setCreateModal: (modal: boolean) => void;
  setHeroes: Dispatch<SetStateAction<Hero[]>>;
  heroes: Hero[];
};

export default function CreateModal({
  setCreateModal,
  setHeroes,
  heroes,
}: Props) {
  const [nickname, setNickname] = useState("");
  const [realname, setRealName] = useState("");
  const [origin, setOrigin] = useState("");
  const [phrase, setPhrase] = useState("");
  const [superpowers, setSuperpowers] = useState<string[]>([]);
  const [superpowersInput, setSuperpowersInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imagesInput, setImagesInput] = useState("");

  const toggleRemoveButton = (item: string, input: string) => {
    if (input === "superpower") {
      setSuperpowers(superpowers.filter((superpower) => superpower !== item));
    }

    if (input === "image") {
      setImages(images.filter((image) => image !== item));
    }

    return;
  };

  const toggleInput = (input: string) => {
    if (input === "superpower") {
      if (superpowersInput.length === 0) {
        return;
      }
      setSuperpowers([
        ...superpowers.filter((el) => el !== superpowersInput),
        superpowersInput,
      ]);
      setSuperpowersInput("");
    }
    if (input === "image") {
      if (imagesInput.length === 0) {
        return;
      }
      setImages([...images.filter((el) => el !== imagesInput), imagesInput]);
      setImagesInput("");
    }

    return;
  };

  const toggleForm = () => {
    if (superpowers.length === 0) {
      return;
    }

    if (images.length === 0) {
      return;
    }

    const newHero = {
      nickname,
      real_name: realname,
      origin_description: origin,
      superpowers,
      catch_phrase: phrase,
      images,
    };
    fetch("http://localhost:3005/superheroes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHero),
    })
      .then((res) => res.json())
      .then((data) => setHeroes([...heroes, data]));
    setCreateModal(false);
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50"
    >
      <div className="bg-white overflow-y-auto overflow-x-hidden rounded-2xl shadow-lg max-h-screen w-full max-w-md flex p-6 flex-col relative">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Create your hero</h2>
          <button
            onClick={() => setCreateModal(false)}
            className=" text-gray-400 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>
        <form className="space-y-4" action={toggleForm}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nickname
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nickname:"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Real name
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name:"
              value={realname}
              onChange={(event) => setRealName(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Origin description
            </label>
            <textarea
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Origin:"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Super powers
            </label>
            {superpowers && (
              <div className="flex gap-4 flex-wrap">
                {superpowers.map((superpower) => (
                  <div key={superpower} className="flex gap-2">
                    <h3 key={superpower}>{superpower}</h3>
                    <span
                      className="text-red-500 cursor-pointer hover:scale-125 duration-500"
                      onClick={() =>
                        toggleRemoveButton(superpower, "superpower")
                      }
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Super power:"
                value={superpowersInput}
                onChange={(event) => setSuperpowersInput(event.target.value)}
              />
              <span
                className="border-2 border-black py-1 px-2 shrink-0 cursor-pointer"
                onClick={() => toggleInput("superpower")}
              >
                +
              </span>
            </div>
            {!superpowers.length && (
              <p className="text-red-500">
                You must add at least 1 super power
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Catch phrase
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phrase:"
              value={phrase}
              onChange={(event) => setPhrase(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            {images && (
              <div className="flex flex-col flex-wrap">
                {images.map((image) => (
                  <div key={image} className="flex gap-2">
                    <h3 key={image}>{image}</h3>
                    <span
                      className="text-red-500 cursor-pointer hover:scale-125 duration-500"
                      onClick={() => toggleRemoveButton(image, "image")}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Image:"
                value={imagesInput}
                onChange={(event) => setImagesInput(event.target.value)}
              />
              <span
                className="border-2 border-black py-1 px-2 shrink-0 cursor-pointer"
                onClick={() => toggleInput("image")}
              >
                +
              </span>
            </div>
            {!images.length && (
              <p className="text-red-500">You must add at least 1 image</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md transition cursor-pointer"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
