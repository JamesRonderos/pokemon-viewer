import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import Card from './components/card';
import Navbar from './components/nav';
import './App.css';

function App() {
	const [pokemonData, setPokemonData] = useState([]);
	const [nextUrl, setNextUrl] = useState('');
	const [prevUrl, setPrevUrl] = useState('');
	const [loading, setloading] = useState(true);
	const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

	useEffect(() => {
		async function fetchData() {
			let response = await getAllPokemon(initialUrl);
			setNextUrl(response.next);
			setPrevUrl(response.previous);
			await loadingPokemon(response.results);
			setloading(false);
		}
		fetchData();
	}, []);

	const next = async () => {
		setloading(true);
		let data = await getAllPokemon(nextUrl);
		await loadingPokemon(data.results);
		setNextUrl(data.next);
		setPrevUrl(data.previous);
		setloading(false);
	};

	const prev = async () => {
		if (!prevUrl) return;
		setloading(true);
		let data = await getAllPokemon(prevUrl);
		await loadingPokemon(data.results);
		setNextUrl(data.next);
		setPrevUrl(data.previous);
		setloading(false);
	};

	const loadingPokemon = async (data) => {
		let _pokemonData = await Promise.all(
			data.map(async (pokemon) => {
				let pokemonRecord = await getPokemon(pokemon.url);
				return pokemonRecord;
			})
		);
		setPokemonData(_pokemonData);
	};

	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<Navbar />
					<div className='btn'>
						<button onClick={prev}>Prev</button>
						<button onClick={next}>Next</button>
					</div>
					<div className='grid-container'>
						{pokemonData.map((pokemon, i) => {
							return <Card key={i} pokemon={pokemon} />;
						})}
					</div>
					<div className='btn'>
						<button onClick={prev}>Prev</button>
						<button onClick={next}>Next</button>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
