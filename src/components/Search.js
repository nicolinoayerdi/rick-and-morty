import React from 'react';

class Search extends React.Component {

	onFormSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit();
	}

	onChange = (event) => {
		event.preventDefault();
		this.props.onChange(event.target.value);
	}

	render() {
		return (
			<form style={{'height': '100%'}} onSubmit={(event) => this.onFormSubmit(event)}>
				<div className="ui icon input" style={{'height': '100%'}}>
					<input
						className="prompt"
						type="text"
						placeholder={this.props.placeholder}
						value={this.props.value}
						onChange={e => this.onChange(e)}
					/>
				</div>
				<div className="results"/>
			</form>
		);
	}
}

export default Search;
