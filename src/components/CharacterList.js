import React from 'react'
import './CharacterList.css'

const CharacterList = (props) => {
	const characters = props.characters.map(( { id, name, status, created, image, species, gender, location}) => {

		let statusStyle = status === 'Dead' ? "dead" : '';
		let genderStyle = getGenderIcon();
		let createdString = formatDate();

		return (
			<div key={id} className="ui card">
				<div className="image"><img className={statusStyle} src={image} alt="no img"/></div>
				<div className="content">
					<div className="header">{name}</div>
					<div className="description">{status}</div>
					<div className="meta"><span className="date">{createdString}</span></div>
				</div>
				<div className="extra content">
					<div>
						<i aria-hidden={true} className={genderStyle}/>
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

		function getGenderIcon() {
			if (gender === 'Male')
				return 'male icon';
			if (gender === 'Female')
				return 'female icon';
			return '';
		}
	});

	return (
		<div className="ui cards">
			{characters}
		</div>
	);
};

export default CharacterList;
