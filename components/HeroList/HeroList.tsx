"use client";

import { useEffect, useState } from "react";
import HeroItem from "../HeroItem/HeroItem";
import { Hero } from "../../types/hero";
import ModalForm from "../CreateModal/ModalForm";
import Pagination from "../Pagination/Pagination";
import HeroModal from "../HeroModal/HeroModal";

export default function HeroList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [modal, setModal] = useState(false);
  const [heroModal, setHeroModal] = useState<Hero | null>(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const show = !heroes.length && !loading;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3005/superheroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    setPages(Math.ceil(heroes.length / 5));

    if (heroes.length < 6) {
      setCurrentPage(1);
    }
  }, [heroes]);

  const visibleHeroes = heroes
    .reverse()
    .slice((currentPage - 1) * 5, (currentPage - 1) * 5 + 5);

  return (
    <main>
      <div className="flex justify-center lg:justify-start">
        <button
          className="border-2 font-bold text-blue-600 shadow-lg drop-shadow-[2px_2px_0px_#ff0] bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full text-3xl  py-4 px-8 cursor-pointer hover:scale-110 duration-500 whitespace-nowrap"
          onClick={() => setModal(true)}
        >
          Create Hero
        </button>
      </div>
      {show && (
        <div className="relative py-10 inline-block text-5xl lg:text-7xl font-bold">
          <span className="absolute bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text blur-sm select-none">
            You have 0 heroes, create one!
          </span>
          <span className="relative text-amber-400">
            You have 0 heroes, create one!
          </span>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {modal && (
        <ModalForm setModal={setModal} reload={reload} setReload={setReload} />
      )}

      {heroModal && (
        <HeroModal
          hero={heroModal}
          setHeroModal={setHeroModal}
          reload={reload}
          setReload={setReload}
        />
      )}

      {heroes && (
        <section className="flex flex-col gap-10 items-center py-10">
          <div className="flex flex-wrap gap-5 justify-evenly w-full">
            {visibleHeroes.map((hero: Hero) => (
              <HeroItem hero={hero} key={hero.id} setHeroModal={setHeroModal} />
            ))}
          </div>
          {pages > 1 && (
            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </section>
      )}
    </main>
  );
}
