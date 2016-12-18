import React from 'react';

export default class RowData extends React.Component {
	render() {
		var data = [];
		for (var property in this.props.data) {
	        data.push(this.props.data[property]);
	        // console.log(property);
	    }
	    var cellData = [];
	    data.map((cell, i) => {
	    				if(typeof(cell) === 'object') {	    					
							cellData.push(<td key={i}>{JSON.stringify(cell)}</td>);
	    				} else {
							cellData.push(<td key={i}>{cell}</td>);	    					
	    				}
					})
		return (
			<tr>
				{cellData}
			</tr>
		);
	}
}