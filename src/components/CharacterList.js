import React from 'react'

const CharacterList = (props) => {
	const characters = props.characters.map(( { id, name, status, created }) => {
		return (
			<div className="item" key={id}>
				<div className="content">
					<span className="header">{name}</span>
					<div className="description">{status}</div>
				</div>
			</div>
		);
	});

	return (
		<div className="ui list">
			{characters}
		</div>
	);
};

export default CharacterList;
