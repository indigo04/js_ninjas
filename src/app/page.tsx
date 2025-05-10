import HeroList from "../../components/HeroList/HeroList";

export default function Home() {
  return (
    <main className="container mx-auto">
        <h1 className="text-6xl font-bold text-yellow-300 drop-shadow-[2px_2px_0px_#f0f] py-10">
          Superheroes
        </h1>
      <HeroList />
    </main>
  );
}
