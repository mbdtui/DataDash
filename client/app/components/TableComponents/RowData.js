import React from 'react';

export default class RowData extends React.Component {
	render() {
		var data = [];
		for (var property in this.props.data) {
	        data.push(this.props.data[property]);
	        // console.log(property);
	    }
	    var cellData = [];
	    var color;
	    console.log(data);
	    data.map((cell, i) => {
	    	var cellColor = "active";
	    	if(i == 0 && cell=='S') {
				cellData.push(<td className="warning" key={i}>{JSON.stringify(cell).replace(/\"/g,'')}</td>);
	    	} else if(i == 0 && cell=='R') {

							cellData.push(<td className="success" key={i}>{JSON.stringify(cell).replace(/\"/g,'')}</td>);
						} else {							
							cellData.push(<td key={i}>{JSON.stringify(cell).replace(/\"/g,'')}</td>);
						}
	    	// 			if(typeof(cell) === 'object') {	    					
						// 	cellData.push(<td key={i}>{JSON.stringify(cell)}</td>);
	    	// 			} else {	    					
	    				// }
					})
		return (
			<tr>
				{cellData}
			</tr>
		);
	}
}