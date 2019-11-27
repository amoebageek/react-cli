import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';

class Application extends React.Component {
	render() {
		return (
			<App />
		);
	}
}

ReactDOM.render(<Application />, document.getElementById('root'));
