import React from 'react'
import cm from '../common/CommunicationManager'
import {connect} from 'react-redux'
import rs from '../common/RemoteServices'


class _NavigationContainer extends React.Component{
	constructor(){
		super();
		this.id = "NavigationContainer"
		this.url = "http://73.71.159.185:8888/?url=http://coolshare.com/leili/projects/house.json";
		//this.url = "./house.json";
		//debugger
		this.state = {'enableFilter':false}
		cm.subscribe("houseData", function(){
			this.setState(Object.assign({}, this.state, {"enableFilter":true}))
		},this); 
	}

	
	handleClick(e){
		cm.publish({"type":"/RemoteServices/getAll", "data":{"url":this.url}})
	}
	
	handleChange(e){
		cm.dispatch({"type":"filterData","data":this.refs.filter.value})
	}
	
	
	
	render() {
		return (
				<div style={{"height":"100px"}}>
					<p>Please click the button to get the house data:</p>
					<button onClick={(e)=>{this.handleClick(e)}} style={{"width":"150px", "display":"block"}}>Get House Data</button>
					<input ref="filter" placeholder="Filter City" disabled={!this.state.enableFilter} onChange={(e)=>{this.handleChange(e)}}/>
				</div>
		)
	}
	
}
const NavigationContainer = connect(
		store => {
		    return {
		    	
		    };
		  }
		)(_NavigationContainer);

export default NavigationContainer