import React from 'react';
import rickmorty from "../api/rickmorty";

class App extends React.Component {

	fun = async () => {
		const a = await rickmorty.get('character', {
			params: {
				page: 1
			}
		});
		console.log(a.data);
	}

	render() {
		return (
		  <div>
			  <button onClick={this.fun}>
				  GET
			  </button>
		  </div>
        );
	}
}

export default App;
