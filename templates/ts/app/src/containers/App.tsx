import * as React from 'react';

/**
 * Interface sample structure to define types of your app container
 */

interface AppContainerPropsInterface {
	greetings: string;
	message: string;
	optional?: string;
}
interface AppContainerStateInterface extends AppContainerPropsInterface {}

class App extends React.Component<AppContainerPropsInterface, AppContainerStateInterface> {
	constructor(
		props: AppContainerPropsInterface,
	) {
		super(
			props,
		);
		this.state = {
			greetings:
				'Hello World',
			message:
				'This is your first application container',
		};
	}

	render() {
		return (
			<React.Fragment>
				<h1>
					{
						this
							.state
							.greetings
					}
				</h1>
				<h2>
					{
						this
							.state
							.message
					}
				</h2>
				<h3>
					Container
				</h3>
			</React.Fragment>
		);
	}
}
export default App;
