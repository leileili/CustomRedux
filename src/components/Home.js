import React from "react";
import HeaderContainer from './HeaderContainer'
import { Grid, Row, Col } from 'react-bootstrap';
import NavigationContainer from './NavigationContainer'
import ContentContainer from './ContentContainer'

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
  		
      <div >      
      	<HeaderContainer/>
      	<Grid>
			<Row>
				<Col sm ={3} md={3}>
					<NavigationContainer/>
				</Col>
				<Col sm ={9} md={9}>
					<ContentContainer/>
				</Col>
			</Row>
		</Grid>
      </div>
    );
  }
}


