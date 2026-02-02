import { useCounter } from "../hooks/useCounter";
import { usePokemon } from "../hooks/usePokemon";

export const PokemonPage = () => {

    const { count, increment, decrement, reset } = useCounter();

    const { pokemon, isLoading, formatedId } = usePokemon({id: count});

    if (isLoading) {
        return (
            <div className="bg-gradient flex flex-col items-center">
                <h1 className="text-2xl font-thin text-white">Cargando...</h1>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="bg-gradient flex flex-col items-center">
                <h1 className="text-2xl font-thin text-white">No se encontró el Pokémon</h1>
            </div>
        );
    }

    return (
        <div className="bg-gradient flex flex-col items-center">
            <h1 className="text-2xl font-thin text-white">Pokémon</h1>
            <h3 className="text-xl font-bold text-white">#{formatedId} {pokemon?.name}</h3>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`}
                alt=""
            />

            <div className="flex gap-2">

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={decrement}>
                    Anterior
                </button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={increment}>
                    Siguiente
                </button>

            </div>
        </div>
    );
};