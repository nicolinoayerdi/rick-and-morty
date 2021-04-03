import React from 'react';
import rickmorty from "../api/rickmorty";
import CharacterList from "./CharacterList";
import 'semantic-ui-css/semantic.min.css';
import './App.css'
import {Pagination} from "semantic-ui-react";


class App extends React.Component {

	state = { characters: [], info: { count: 0, pages: 0} };

	fun = async (page) => {
		console.log('fun', page);
		const a = await rickmorty.get('character', {
			params: {
				page: page
			}
		});
		this.setState({ characters: a.data.results, info: a.data.info });

	}

	componentDidMount() {
		this.fun(1).then();
	}

	render() {
		/*if (this.state.characters.length === 0) {
			return <button onClick={this.fun}>GET</button>
		}*/
		return (
		  <div>
			  <h1>RICK AND MORTY CHARACTERS</h1>
			  <div className="header">
				  <Pagination
					  style={{'height': '30px'}}
					  onPageChange={(a, v) => this.fun(v.activePage)}
					  defaultActivePage={1}
					  totalPages={this.state.info.pages}
					  ellipsisItem={null}
					  siblingRange={3}
					  boundaryRange={0}
				  />
			  </div>
			  <CharacterList characters={this.state.characters} info={this.state.info}/>

		  </div>
        );
	}
}

export default App;
