import React from "react";
import './Dropdown.css';

class Dropdown extends React.Component {

	onChange = (newValue) => {
		this.props.onChange(newValue);
	}

	render() {
		let options = Object.values(this.props.options).map(option => {
			return <option value={option.value}>{option.label}</option>
		});
		return (
			<select className="select"
					value={this.props.value}
					onChange={(e) => this.onChange(e.target.value)}>
				<option disabled value={this.props.placeholder.value} hidden className="placeholder">{this.props.placeholder.label}</option>
				{options}
			</select>);
	}
}

export default Dropdown;
