import Image from "next/image";
import { Hero } from "../../types/hero";
import { Dispatch, SetStateAction } from "react";

type Props = {
  hero: Hero;
  setHeroModal: Dispatch<SetStateAction<Hero | null>>;
};

export default function HeroItem({ hero, setHeroModal }: Props) {
  const validImage =
    typeof hero.images[0] === "string" &&
    (hero.images[0].startsWith("/") ||
      hero.images[0].startsWith("http://") ||
      hero.images[0].startsWith("https://"));

  const validSrc = validImage ? hero.images[0] : "/fallback.webp";
  return (
    <article
      className="flex flex-col items-center gap-3 bg-neutral-300 p-8 rounded-2xl cursor-pointer hover:scale-110 duration-500"
      onClick={() => setHeroModal(hero)}
    >
      <h2 className="font-bold">{hero.nickname}</h2>
      <Image
        width={175}
        height={175}
        src={validSrc}
        alt="hero-image"
        priority={true}
      />
    </article>
  );
}
