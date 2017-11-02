import React from 'react'
import TableView from './TableView'
import {connect} from 'react-redux'
import cm from '../common/CommunicationManager'
import rs from '../common/RemoteServices'

class _ContentContainer extends React.Component{

	render() {
		var data = [];
		var list = this.props.houseData;
		var filter = this.props.filterData;
		if (filter!=='') {
			for (var i=0; i<list.length; i++) {
				if (list[i].city.indexOf(filter)>-1) {
					data.push(list[i])
				}
			}
		} else {
			data = list
		}
		return (
				<div>
					<TableView data={data}/>
				</div>
		)
	}
	
}


const ContentContainer = connect(
		  store => {
			    return {
			    	houseData: store.CommonReducer.houseData,
			    	filterData: store.CommonReducer.filterData

			    };
			  }
			)(_ContentContainer);
export default ContentContainer