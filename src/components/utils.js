
export const generatePokeObjectsArray = async (index) => {
  const TOTAL_POKEMON = 721;
  let pokeIds = new Set();
  const url = "https://pokeapi.co/api/v2/pokemon/";
  let array = [];
  while (pokeIds.size < index) {
    let pokeId = getRandomInt(TOTAL_POKEMON);
    if (!pokeIds.has(pokeId)) {
      pokeIds.add(pokeId);
    }
  }
  // To keep track of index for state in App
  let i = 0;
  for (const pokeId of pokeIds) {
    const pokemon = await getData(url + pokeId);
    const pokeObj = {
      id: i++,
      pokeId: pokeId,
      pokeName: pokemon.name,
      pokeSpriteUrl: pokemon.sprite.front_default,
      pokeCryUrl: pokemon.cries.legacy,
      pokeType: pokemon.types[0].type.name,
    };
    array.push(pokeObj);
  }
  return array;
};

const getRandomInt = (max) => (Math.floor(Math.random() * max)+1);

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
}


// TODO array shuffle helper function