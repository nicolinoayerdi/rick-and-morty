import React from "react";
import './Dropdown.css';

class Dropdown extends React.Component {

	state = { value: 'Gender' };

	onChange = (newValue) => {
		this.setState({ value: newValue });
		this.props.onChange(newValue);
	}

	render() {
		return (
			<select className="select" value={this.state.value} onChange={(e) => this.onChange(e.target.value)}>
				<option disabled value="Gender" hidden className="placeholder">Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="unknown">Unknown</option>
			</select>);
	}
}

export default Dropdown;
