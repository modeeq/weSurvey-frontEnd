import React from 'react';

import './Header2.css';
const header = () => {
	return (
		<div className=' header2'>
			<h1 onClick={() => (window.location = '/')}>weSurvey</h1>
			<ul className='nav'>
				<span>
					<a href='/login'>
						<li>Login</li>
					</a>
					<button
						onClick={() => {
							window.location = '/register';
						}}
					>
						Get started
					</button>
				</span>
			</ul>
			<div className='menu'>
				<i class='fa fa-list' id='icon'></i>

				<div className='list'>
					<a href='/register'>
						<li>
							<i class='fa fa-user-plus' aria-hidden='true' />
							Get started
						</li>
					</a>
					<a href='/login'>
						<li>
							<i class='fa fa-sign-out' aria-hidden='true' />
							Login
						</li>
					</a>
				</div>
			</div>
		</div>
	);
};
export default header;
