interface CreateHeroDTO {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

interface UpdateHeroDTO {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export const GetHeroes = () => {
    const data = fetch("http://localhost:3005/superheroes");
    return data;
}

export const CreateHero = (newHero: CreateHeroDTO) => {
  const data = fetch("http://localhost:3005/superheroes/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHero),
  });

  return data;
};

export const UpdateHero = (newHero: UpdateHeroDTO) => {
  const data = fetch(
    `http://localhost:3005/superheroes/edit/${newHero.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHero),
    }
  );

  return data;
};

export const RemoveHero = (id: number) => {
    const data = fetch(`http://localhost:3005/superheroes/remove/${id}`, {
      method: "DELETE",
    })

    return data;
};
