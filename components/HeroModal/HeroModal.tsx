import { Dispatch, SetStateAction, useState } from "react";
import { Hero } from "../../types/hero";
import Image from "next/image";

type Props = {
  hero: Hero;
  setHeroModal: Dispatch<SetStateAction<Hero | null>>;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
};

export default function HeroModal({
  hero,
  setHeroModal,
  reload,
  setReload,
}: Props) {
  const [superpowersInput, setSuperpowersInput] = useState("");
  const [imagesInput, setImagesInput] = useState("");
  const [currentHero, setCurrentHero] = useState(hero);
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(currentHero.nickname);
  const [realname, setRealName] = useState(currentHero.real_name);
  const [origin, setOrigin] = useState(currentHero.origin_description);
  const [phrase, setPhrase] = useState(currentHero.catch_phrase);
  const [superpowers, setSuperpowers] = useState<string[]>(
    currentHero.superpowers
  );
  const [images, setImages] = useState<string[]>(currentHero.images);
  const validateImage = (image: string) => {
    const validImage =
      typeof image === "string" &&
      (image.startsWith("/") ||
        image.startsWith("http://") ||
        image.startsWith("https://"));

    const validSrc = validImage ? image : "/fallback.webp";
    return validSrc;
  };

  const reset = () => {
    setNickname(currentHero.nickname);
    setRealName(currentHero.real_name);
    setOrigin(currentHero.origin_description);
    setPhrase(currentHero.catch_phrase);
    setSuperpowersInput("");
    setImagesInput("");
    setImages(currentHero.images);
    setSuperpowers(currentHero.superpowers);
    setEditing(false);
  };

  const toggleDeleteButton = () => {
    fetch(`http://localhost:3005/superheroes/remove/${currentHero.id}`, {
      method: "DELETE",
    }).finally(() => setReload(!reload));

    setHeroModal(null);
  };

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
    }).then(() => {
      setCurrentHero(newHero);
    });
    setEditing(false);
    setReload(!reload);
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50"
      onClick={(event) =>
        event.target === event.currentTarget ? setHeroModal(null) : 0
      }
    >
      <div className="bg-white overflow-y-auto overflow-x-hidden rounded-2xl shadow-lg max-h-screen w-full max-w-md flex p-6 flex-col relative">
        <button
          onClick={() => setHeroModal(null)}
          className=" text-gray-400 hover:text-black text-xl absolute right-2 top-2 py-0.5 px-1"
        >
          &times;
        </button>
        {!editing ? (
          <div className="flex flex-col items-center">
            <div className="flex">
              {images.map((image) => (
                <div key={image}>
                  <Image
                    key={image}
                    src={validateImage(image)}
                    width={175}
                    height={175}
                    alt="hero-image"
                  />
                </div>
              ))}
            </div>
            <h2>Nickname: {currentHero.nickname}</h2>
            <h2>Real name: {currentHero.real_name}</h2>
            <div className="flex gap-1 flex-wrap">
              <h2>Super powers:</h2>
              {currentHero.superpowers.map((superpower) => (
                <h3 key={superpower}>{superpower}</h3>
              ))}
            </div>
            <h3>Phrase: {currentHero.catch_phrase}</h3>
            <p>Origin description: {currentHero.origin_description}</p>

            <div className="flex justify-between py-4">
              <button
                className="border-2 border-black py-2 px-4 rounded-full bg-amber-300 cursor-pointer"
                onClick={() => setEditing(true)}
              >
                Edit hero
              </button>
              <button
                className="border-2 border-black py-2 px-4 rounded-full bg-red-400 cursor-pointer"
                onClick={() => toggleDeleteButton()}
              >
                Delete hero
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-4" action={toggleForm}>
            <div className="flex">
              {images.map((image) => (
                <div key={image} className="relative">
                  <span
                    className="text-red-500 absolute right-0 top-0 cursor-pointer hover:scale-125 duration-500"
                    onClick={() => toggleRemoveButton(image, "image")}
                  >
                    x
                  </span>
                  <Image
                    key={image}
                    src={validateImage(image)}
                    width={175}
                    height={175}
                    alt="hero-image"
                  />
                </div>
              ))}
            </div>
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
              {currentHero.superpowers && (
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
            <div className="flex">
              <button
                type="reset"
                className="w-full bg-red-600 text-white py-2 rounded-md transition cursor-pointer hover:scale-110 duration-500"
                onClick={() => reset()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md transition cursor-pointer hover:scale-110 duration-500"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
