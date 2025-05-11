import { Dispatch, SetStateAction, useState } from "react";
import { Hero } from "../../types/hero";
import Image from "next/image";
import ModalForm from "../CreateModal/ModalForm";
import { validateImage } from "../../utils/imageHelper";
import { RemoveHero } from "../../utils/fetch";

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
  const [currentHero, setCurrentHero] = useState(hero);
  const [editing, setEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  if (!currentHero.images[currentImage]) {
    setCurrentImage(0);
  }

  const toggleCurrentImage = (order: string) => {
    if (currentHero.images) {
      if (order === "prev") {
        if (currentImage > 0) {
          setCurrentImage(currentImage - 1);
        } else {
          setCurrentImage(currentHero.images.length - 1);
        }
      } else {
        if (currentHero.images.length - 1 > currentImage) {
          setCurrentImage(currentImage + 1);
        } else {
          setCurrentImage(0);
        }
      }
    }
    return;
  };

  const toggleDeleteButton = () => {
    RemoveHero(currentHero.id).finally(() => setReload(!reload));

    setHeroModal(null);
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50"
      onClick={(event) =>
        event.target === event.currentTarget ? setHeroModal(null) : 0
      }
    >
      <div className="bg-white border-4 border-cyan-300 overflow-y-auto overflow-x-hidden rounded-2xl shadow-lg max-h-screen w-full max-w-md flex p-6 flex-col relative">
        <button
          onClick={() => setHeroModal(null)}
          className=" text-gray-400 hover:text-black text-xl absolute right-2 top-2 py-0.5 px-1 hover:scale-150 duration-500"
        >
          &times;
        </button>
        {!editing ? (
          <div className="flex flex-col items-center">
            <div className="flex">
              {currentHero.images.length > 0 && (
                <div className="flex justify-center gap-8 items-center">
                  {currentHero.images.length > 1 && (
                    <span
                      className="cursor-pointer py-8 px-2 border-2 text-blue-600 border-yellow-300"
                      onClick={() => toggleCurrentImage("prev")}
                    >
                      &lt;
                    </span>
                  )}
                  <Image
                    src={validateImage(
                      currentHero.images ? currentHero.images[currentImage] : ""
                    )}
                    height={150}
                    width={150}
                    alt="hero-image"
                  />
                  {currentHero.images.length > 1 && (
                    <span
                      className="cursor-pointer py-8 px-2 border-2 text-blue-600 border-yellow-300"
                      onClick={() => toggleCurrentImage("next")}
                    >
                      &gt;
                    </span>
                  )}
                </div>
              )}
            </div>
            <h2 className="flex gap-2 items-center font-bold text-blue-600 drop-shadow-[2px_2px_0px_#ff0]">
              Nickname:
              <p className="font-bold text-yellow-300 drop-shadow-[2px_2px_0px_#f0f]">
                {currentHero.nickname}
              </p>
            </h2>
            <h2 className="flex gap-2 items-center font-bold text-blue-600 drop-shadow-[2px_2px_0px_#ff0]">
              Real name:
              <p className="font-bold text-yellow-300 drop-shadow-[2px_2px_0px_#f0f]">
                {currentHero.real_name}
              </p>
            </h2>
            <div className="flex gap-1 flex-wrap">
              <h2 className="font-bold text-blue-600 drop-shadow-[2px_2px_0px_#ff0]">
                Super powers:
              </h2>
              {currentHero.superpowers.map((superpower) => (
                <p
                  key={superpower}
                  className="font-bold text-yellow-300 drop-shadow-[2px_2px_0px_#f0f]"
                >
                  {superpower}
                </p>
              ))}
            </div>
            <h2 className="flex gap-2 items-center font-bold text-blue-600 drop-shadow-[2px_2px_0px_#ff0]">
              Phrase:
              <p className="font-bold text-yellow-300 drop-shadow-[2px_2px_0px_#f0f]">
                {currentHero.catch_phrase}
              </p>
            </h2>
            <h3 className="flex gap-2 items-center font-bold text-blue-600 drop-shadow-[2px_2px_0px_#ff0]">
              Origin description:
              <p className="font-bold text-yellow-300 drop-shadow-[2px_2px_0px_#f0f]">
                {currentHero.origin_description}
              </p>
            </h3>

            <div className="flex justify-between gap-4 py-4">
              <button
                className="border-2 border-black py-2 px-4 rounded-full bg-amber-300 cursor-pointer hover:scale-110 duration-500"
                onClick={() => setEditing(true)}
              >
                Edit hero
              </button>
              <button
                className="border-2 border-black py-2 px-4 rounded-full bg-red-400 cursor-pointer hover:scale-110 duration-500"
                onClick={() => toggleDeleteButton()}
              >
                Delete hero
              </button>
            </div>
          </div>
        ) : (
          <ModalForm
            currentHero={currentHero}
            setCurrentHero={setCurrentHero}
            editing={editing}
            setModal={setEditing}
            reload={reload}
            setReload={setReload}
          />
        )}
      </div>
    </div>
  );
}
