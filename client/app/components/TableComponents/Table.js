import React from 'react';
import RowData from './RowData.js';

export default class Table extends React.Component {
	render() {
		var rows = [];
		var heads = [];
		for (var property in this.props.result[0]) {
	        heads.push(property);
	    }
		this.props.result.forEach((rowData, i)=>{
			rows.push(<RowData data={rowData} key={i}/>);
		});
		var tableHeader = [];
		heads.forEach((head, i) => {
			tableHeader.push(<th key={i}>{head}</th>);
		});
		return (
			<table className="table table-bordered">
				<thead><tr>{tableHeader}</tr></thead>
				<tbody>{rows}</tbody>
			</table>
			);
	}
}