import React from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router';

class _HeaderContainer extends React.Component{
	handleLink(e, url) {
		browserHistory.push(url)
	}
	render() {
		return (
				<div style={{"margintop":"auto"}}>
					<span style={{"marginRight":"50px", "color":"blue", "cursor":"pointer"}} onClick={(e)=>{this.handleLink(e, "home")}}>Demo</span>
					<span style={{"color":"blue", "cursor":"pointer"}} onClick={(e)=>{this.handleLink(e, "about")}}>About</span>
				</div>
		)
	}
	
}
const HeaderContainer = connect(
		  store => {
			    return {
			    	
			    };
			  }
			)(_HeaderContainer);
export default HeaderContainer