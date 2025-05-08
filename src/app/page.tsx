import HeroList from "../../components/HeroList/HeroList";

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="relative py-10 inline-block text-5xl lg:text-7xl font-bold">
        <span className="absolute bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text blur-sm select-none">
          Superheroes
        </span>
        <span className="relative text-amber-400">Superheroes</span>
      </div>
      <HeroList />
    </main>
  );
}
