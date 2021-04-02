import React from 'react';
import rickmorty from "../api/rickmorty";
import CharacterList from "./CharacterList";
import 'semantic-ui-css/semantic.min.css';


class App extends React.Component {

	state = { characters: [] }

	fun = async () => {
		const a = await rickmorty.get('character', {
			params: {
				page: 1
			}
		});
		this.setState({ characters: a.data.results });

	}

	render() {
		if (this.state.characters.length === 0) {
			return <button onClick={this.fun}>GET</button>
		}
		return (
		  <div>
			  <CharacterList characters={this.state.characters}/>
		  </div>
        );
	}
}

export default App;
