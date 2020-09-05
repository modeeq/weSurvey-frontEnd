import React from 'react';
import './notFound.css';
const notFound = () => {
	return (
		<div className='notFound'>
			<h1>
				<i class='fa fa-frown-o' id='icon'></i> 404
			</h1>
			<p>page not found</p>
		</div>
	);
};

export default notFound;
