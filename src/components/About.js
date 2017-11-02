import React from "react";
import HeaderContainer from './HeaderContainer'

// About page component
export default class About extends React.Component {
  // render
  render() {
    return (
      <div>
      	<HeaderContainer/>
        <h5>This demo is a React Redux web application.</h5>
      </div>
    );
  }
}
