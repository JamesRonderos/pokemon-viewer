import React from 'react';
import './style.css';
import pokemonType from '../../helpers/pokemonTypes';

function Card({ pokemon }) {
	return (
		<div className='Card'>
			<div className='Card__img'>
				<img src={pokemon.sprites.front_default} alt={pokemon.name} />
			</div>
			<div className='Card__name'>{pokemon.name}</div>
			<div className='Card__types'>
				{pokemon.types.map((type) => {
					return (
						<div
							className='Card__type'
							style={{
								backgroundColor: pokemonType[type.type.name]
							}}
						>
							{type.type.name}
						</div>
					);
				})}
			</div>
			<div className='Card__info'>
				<div className='Card__data Card__data--weight'>
					<p className='title'>Weight</p>
					<p>{pokemon.weight}</p>
				</div>
				<div className='Card__data Card__data--height'>
					<p className='title'>Height</p>
					<p>{pokemon.height}</p>
				</div>
				<div className='Card__data Card__data--abilities'>
					<p className='title'>Abilities</p>
					{pokemon.abilities.map((ability) => {
						return <p>{ability.ability.name}</p>;
					})}
				</div>
			</div>
		</div>
	);
}

export default Card;
