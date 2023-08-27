import Pokemon from "../Pokemon/Pokemon.jsx";
import usePokemonList from "../../hooks/usePokemonList.jsx";
import "./PokemonList.css";
function PokemonList() {

  const [pokemonListState, setPokemonListState] = usePokemonList();

  return (
    <div className="pokemonList-wrapper">
      <h3 className="listname" style={{ color: "#AE445A" }}>
        Pokemon List
      </h3>
      <hr />
      <div className="pokeList">
        {pokemonListState.isLoading ? (
          <h2>Loading.....</h2>
        ) : (
          pokemonListState.pokemonList.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              id={pokemon.id}
            />
          ))
        )}
      </div>
      <div className="btn">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            const urlSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlSet });
          }}
          className="btn1"
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlSet });
          }}
          className="btn2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;
