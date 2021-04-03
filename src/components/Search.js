import React from 'react';

class Search extends React.Component {
	state = {term: ''};

	onFormSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state.term);
	}

	render() {
		return (
			<form style={{'height': '100%'}} onSubmit={(event) => this.onFormSubmit(event)}>
				<div className="ui icon input" style={{'height': '100%'}}>
					<input
						className="prompt"
						type="text"
						placeholder={this.props.placeholder}
						value={this.state.term}
						onChange={e => this.setState({term: e.target.value})}
					/>
				</div>
				<div className="results"/>
			</form>
		);
	}
}

export default Search;
