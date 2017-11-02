import React from 'react'
import { BootstrapTable,TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ContentContainer from './ContentContainer'
import cm from '../common/CommunicationManager'

export default class TableView extends React.Component{
	render() {
		return (
				<div style={{"height":"300px"}}>
					<p> Here are the house data loaded from a json file.</p>
					<BootstrapTable data={ this.props.data }>
				        <TableHeaderColumn dataField='street' isKey>street</TableHeaderColumn>
				        <TableHeaderColumn dataField='city'>city</TableHeaderColumn>
				        <TableHeaderColumn dataField='state'>state</TableHeaderColumn>
				        <TableHeaderColumn dataField='zipcode'>zipcode</TableHeaderColumn>
				      </BootstrapTable>	

				</div>
		)
	}
	
}
