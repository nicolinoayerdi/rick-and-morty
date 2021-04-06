import React from 'react';
import rickmorty from "../api/rickmorty";
import CharacterList from "./CharacterList";
import 'semantic-ui-css/semantic.min.css';
import './App.css'
import {Pagination} from "semantic-ui-react";
import Search from "./Search";
import Dropdown from "./Dropdown";

const GENDER_OPTIONS = {
	Male: {value: "Male", label: "Male"},
	Female: {value: "Female", label: "Female"},
	Unknown: {value: "unknown", label: "Unknown"}
};
const GENDER_ALL = {value: '', label: "Gender"};

Object.freeze(GENDER_OPTIONS);

class App extends React.Component {
	state = {
		characters: [],
		info: { count: 0, pages: 0},
		page: 1,
		filter: {
			name: '',
			gender: GENDER_ALL.value
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

	updateSearchValue(value) {
		this.setState({...this.state, filter: {...this.state.filter, name: value}});
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
							<button className="ui button"
									onClick={() => this.getCharacters(1, {name: '', gender: GENDER_ALL.value})}>Clear
							</button>
						</div>
						<div>
							<Dropdown
								value={this.state.filter?.gender}
								options={GENDER_OPTIONS}
								placeholder={GENDER_ALL}
								onChange={(valueSelected) =>
									this.getCharacters(1, {
										name: this.state.filter?.name,
										gender: valueSelected
									})}
							/>
						</div>
						<div>
							<Search
								placeholder="Search by name..."
								value={this.state.filter?.name}
								onChange={(value) => this.updateSearchValue(value)}
								onSubmit={ _ => {
									this.getCharacters(1, {
										name: this.state.filter.name,
										gender: this.state.filter?.gender
									});
								}}/>
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

					<div className="ui large label results">
						Results:
						<div className="detail">
							{this.state.info.count}
						</div>
					</div>
				</div>
			</div>

        );
	}
}

export default App;
