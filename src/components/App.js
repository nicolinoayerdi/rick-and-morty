import React from 'react';
import rickmorty from "../api/rickmorty";
import CharacterList from "./CharacterList";
import 'semantic-ui-css/semantic.min.css';
import './App.css'
import {Pagination} from "semantic-ui-react";
import Search from "./Search";
import Dropdown from "./Dropdown";


class App extends React.Component {

	state = {
		characters: [],
		info: { count: 0, pages: 0},
		page: 1,
		filter: {
			name: '',
			gender: null
		}
	};

	getCharacters = async (page, filter) => {
		try {
			const a = await rickmorty.get('character', {
				params: {
					page: page ? page : undefined,
					name: filter?.name ? filter.name : undefined,
					gender: filter?.gender ? filter.gender : undefined
				}
			});
			this.setState({
				characters: a.data.results,
				info: a.data.info,
				page: page,
				filter: filter
			});
		} catch (e) {
			this.setState({
				characters: [],
				info: {
					count: 0,
					next: null,
					pages: 0,
					prev: null
				},
				page: 1,
				filter: filter
			})
		}

	}

	componentDidMount() {
		this.getCharacters(1).then();
	}

	render() {
		return (
			<div>
				<div className="page">
					<h1>RICK AND MORTY</h1>
					<div className="filters">
						<div>
							<Dropdown onChange={(valueSelected) =>
								this.getCharacters(1, {
									name: this.state.filter?.name,
									gender: valueSelected
								})}
							/>
						</div>
						<div>
							<Search
								value={this.state.filter?.name}
								placeholder="Search by name..."
								value={this.state.filter?.name}
								onSubmit={(filterValue) => this.getCharacters(1, {
								name: filterValue,
								gender: this.state.filter?.gender
							})}/>
						</div>
						<Pagination
							onPageChange={(a, v) => this.getCharacters(v.activePage, this.state.filter)}
							activePage={this.state.page}
							totalPages={this.state.info.pages}
							ellipsisItem={null}
							siblingRange={3}
							boundaryRange={0}
						/>
					</div>
					<CharacterList characters={this.state.characters} info={this.state.info}/>
				</div>
			</div>

        );
	}
}

export default App;
