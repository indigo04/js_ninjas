"use client";

import { useEffect, useState } from "react";
import HeroItem from "../HeroItem/HeroItem";
import { Hero } from "../../types/hero";
import CreateModal from "../CreateModal/CreateModal";
import Pagination from "../Pagination/Pagination";
import HeroModal from "../HeroModal/HeroModal";

export default function HeroList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [createModal, setCreateModal] = useState(false);
  const [heroModal, setHeroModal] = useState<Hero | null>(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3005/superheroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data));
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
          className="border-2 bg-purple-500 text-amber-400 font-bold text-2xl border-black py-4 px-8 rounded-3xl cursor-pointer hover:scale-110 duration-500 whitespace-nowrap"
          onClick={() => setCreateModal(true)}
        >
          Create Hero
        </button>
      </div>
      {!heroes.length && (
        <div className="relative py-10 inline-block text-5xl lg:text-7xl font-bold">
          <span className="absolute bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text blur-sm select-none">
            You have 0 heroes, create one!
          </span>
          <span className="relative text-amber-400">You have 0 heroes, create one!</span>
        </div>
      )}

      {createModal && (
        <CreateModal
          setCreateModal={setCreateModal}
          setHeroes={setHeroes}
          heroes={heroes}
        />
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
