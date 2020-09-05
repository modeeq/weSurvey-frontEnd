import React from 'react';
import './steps.css';

export default class list_of_steps extends React.Component {
	render() {
		return (
			<div className={this.props.class + ' btn'} onClick={this.props.action}>
				<img src={this.props.icon} alt='' />
				<p>{this.props.title}</p>
			</div>
		);
	}
}
