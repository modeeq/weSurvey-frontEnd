import React from 'react';

import './homePage.css';
export default class homePage extends React.Component {
	constructor() {
		super();
		this.state = {
			step: 2
		};
	}

	//change laptop images evert 3000 secs
	componentDidMount() {
		setInterval(() => {
			if (this.state.step === 2) {
				this.setState({ step: 0 });
			} else {
				this.setState({ step: this.state.step + 1 });
			}
		}, 3000);
	}
	render() {
		return (
			<div className='homePage'>
				<div className='h-info'>
					<h1>
						Create Beautiful <br />
						Surveys
					</h1>
					<h4>Sign up for free unlimited surveys</h4>
					<div className='h-steps'>
						<p id={this.state.step === 0 ? 'currentStep' : ''}>
							<i class='fa fa-check-square-o' aria-hidden='true'></i>Design your
							survey
						</p>
						<p id={this.state.step === 1 ? 'currentStep' : ''}>
							<i class='fa fa-check-square-o' aria-hidden='true'></i>Share your
							survey online
						</p>
						<p id={this.state.step === 2 ? 'currentStep' : ''}>
							<i class='fa fa-check-square-o' aria-hidden='true'></i>Review your
							survey results
						</p>
					</div>
					<button
						onClick={() => {
							window.location = '/register';
						}}
					>
						Get Started
					</button>
				</div>
				<div className='h-img'>
					<img src={'/img/img' + this.state.step + '.png'} alt='' />
				</div>
			</div>
		);
	}
}
