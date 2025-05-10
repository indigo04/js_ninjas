"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Hero } from "../../types/hero";
import Image from "next/image";

type Props = {
  currentHero?: Hero;
  setCurrentHero?: Dispatch<SetStateAction<Hero>>;
  editing?: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
};

export default function ModalForm({
  setModal,
  currentHero,
  setCurrentHero,
  editing,
  reload,
  setReload,
}: Props) {
  const [nickname, setNickname] = useState(
    currentHero ? currentHero.nickname : ""
  );
  const [realname, setRealName] = useState(
    currentHero ? currentHero.real_name : ""
  );
  const [origin, setOrigin] = useState(
    currentHero ? currentHero.origin_description : ""
  );
  const [phrase, setPhrase] = useState(
    currentHero ? currentHero.catch_phrase : ""
  );
  const [superpowers, setSuperpowers] = useState<string[]>(
    currentHero ? currentHero.superpowers : []
  );
  const [superpowersInput, setSuperpowersInput] = useState("");
  const [images, setImages] = useState<string[]>(
    currentHero ? currentHero.images : []
  );
  const [imagesInput, setImagesInput] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const reset = () => {
    setNickname(currentHero ? currentHero.nickname : "");
    setRealName(currentHero ? currentHero.real_name : "");
    setOrigin(currentHero ? currentHero.origin_description : "");
    setPhrase(currentHero ? currentHero.catch_phrase : "");
    setSuperpowersInput("");
    setImagesInput("");
    setImages(currentHero ? currentHero.images : []);
    setSuperpowers(currentHero ? currentHero.superpowers : []);
    setModal(false);
  };

  const toggleCurrentImage = (order: string) => {
    if (images) {
      if (order === "prev") {
        if (currentImage > 0) {
          setCurrentImage(currentImage - 1);
        } else {
          setCurrentImage(images.length - 1);
        }
      } else {
        if (images.length - 1 > currentImage) {
          setCurrentImage(currentImage + 1);
        } else {
          setCurrentImage(0);
        }
      }
    }
    return;
  };

  const validateImage = (image: string) => {
    const validImage =
      typeof image === "string" &&
      (image.startsWith("/") ||
        image.startsWith("http://") ||
        image.startsWith("https://"));

    const validSrc = validImage ? image : "/fallback.webp";
    return validSrc;
  };

  const toggleRemoveButton = (item: string, input: string) => {
    if (input === "superpower") {
      setSuperpowers(superpowers.filter((superpower) => superpower !== item));
    }

    if (input === "image") {
      setImages(images.filter((image) => image !== item));
      setCurrentImage(0);
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

  const toggleCreateForm = () => {
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
    }).finally(() => {
      setReload(!reload);
      setModal(false);
    });
  };

  const toggleEditForm = () => {
    if (superpowers.length === 0) {
      return;
    }

    if (images.length === 0) {
      return;
    }

    if (currentHero && setCurrentHero) {
      const newHero = {
        id: currentHero.id,
        nickname,
        real_name: realname,
        origin_description: origin,
        superpowers,
        catch_phrase: phrase,
        images,
      };
      fetch(`http://localhost:3005/superheroes/edit/${currentHero.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHero),
      })
        .then(() => {
          setCurrentHero(newHero);
        })
        .finally(() => {
          setModal(false);
          setReload(!reload);
        });
    }
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50"
      onClick={(event) =>
        event.target === event.currentTarget ? setModal(false) : 0
      }
    >
      <div className="bg-gradient-to-r from-cyan-200 to-blue-200 overflow-y-auto overflow-x-hidden rounded-2xl shadow-lg max-h-screen w-full max-w-md flex p-6 flex-col relative">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-yellow-300 drop-shadow-[2px_2px_0px_#f0f] mb-4">
            Create your hero
          </h2>
          <button
            onClick={() => setModal(false)}
            className=" text-gray-400 hover:text-black text-xl hover:scale-150 duration-500"
          >
            &times;
          </button>
        </div>
        {images.length > 0 && (
          <div className="flex justify-center gap-8 items-center">
            {images.length > 1 && (
              <span
                className="cursor-pointer py-8 px-2 border-2 text-blue-600 border-yellow-300"
                onClick={() => toggleCurrentImage("prev")}
              >
                &lt;
              </span>
            )}
            <Image
              src={validateImage(images ? images[currentImage] : "")}
              height={150}
              width={150}
              alt="hero-image"
            />
            {images.length > 1 && (
              <span
                className="cursor-pointer py-8 px-2 border-2 text-blue-600 border-yellow-300"
                onClick={() => toggleCurrentImage("next")}
              >
                &gt;
              </span>
            )}
          </div>
        )}
        <form
          className="space-y-4"
          action={editing ? toggleEditForm : toggleCreateForm}
        >
          <div>
            <label className="block text-sm font-bold text-gray-700">
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
            <label className="block text-sm font-bold text-gray-700">
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
            <label className="block text-sm font-bold text-gray-700">
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
            <label className="block text-sm font-bold text-gray-700">
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
            <label className="block text-sm font-bold text-gray-700">
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
            <label className="block text-sm font-bold text-gray-700">
              Images
            </label>
            {images && (
              <div className="flex flex-col">
                {images.map((image) => (
                  <div key={image} className="flex gap-2 items-start">
                    <h3 className="overflow-hidden" key={image}>
                      {image}
                    </h3>
                    <span
                      className="text-red-500 cursor-pointer"
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
          {editing ? (
            <div className="flex justify-between">
              <button
                type="reset"
                className="border-2 bg-white text-red-500 font-bold border-red-500 shadow-lg py-2 px-8 rounded-full hover:scale-110 duration-500 cursor-pointer"
                onClick={reset}
              >
                Close
              </button>
              <button
                type="submit"
                className="border-2 font-bold border-yellow-400 text-yellow-400 bg-white shadow-lg py-2 px-8 rounded-full hover:scale-110 duration-500 cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full border-2 text-blue-600 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full shadow-lg drop-shadow-[2px_2px_0px_#ff0] py-2 cursor-pointer hover:scale-110 duration-500"
            >
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
