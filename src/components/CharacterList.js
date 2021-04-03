import React from 'react'
import './CharacterList.css'
import image from '../empty.jpg'

const CharacterList = (props) => {
	const characters = props.characters.map(( { id, name, status, created, image, species, gender, location}) => {

		let statusClass = getStatusClass();
		let genderClass = getGenderClass();
		let createdString = formatDate();

		return (
			<div key={id} className={`ui card ${statusClass}`}>
				<div className="image"><img src={image} alt="no img"/></div>
				<div className="content">
					<div className="header">{name}</div>
					<div className="description">
						<i className="circle icon"/>
						{status}
					</div>
					<div className="meta">
						<i className="save icon"/>
						<span className="date">{createdString}</span>
					</div>
				</div>
				<div className="extra content">
					<div>
						<i aria-hidden={true} className={genderClass}/>
						{gender}
					</div>
					<div>
						<i aria-hidden={true} className="location arrow icon"/>
						{location.name}
					</div>
					<div>
						<i aria-hidden={true} className="users icon"/>
						{species}
					</div>
				</div>
			</div>
		);

		function formatDate() {
			const creationDate = new Date(created);
			return `${creationDate.getDate()}/${creationDate.getMonth()}/${creationDate.getFullYear()}`;
		}

		function getGenderClass() {
			if (gender === 'Male')
				return 'mars icon';
			if (gender === 'Female')
				return 'venus icon';
			return 'genderless icon';
		}

		function getStatusClass() {
			if (status === 'Dead')
				return 'dead';
			if (status === 'Alive')
				return 'alive';
			return '';
		}
	});

	if (characters.length)
		return (
			<div className="ui cards characters">
				{characters}
			</div>
		);
	return (
		<div className="characters">
			<div className="no-data">
				<div>Ups! It's seems like this dimension is empty</div>
				<p>Please try other values for your search.</p>
				<img src={image}/>
			</div>
		</div>
	);
};

export default CharacterList;
