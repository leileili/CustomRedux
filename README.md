Installation instructions:<br/><br/>

0). install required environment<br/>
    - node.js<br/>
    - git<br/>
    - webpack<br/>
    
1). clone the repository with git<br/>

2). To install, at the root directory, run<br/>
  npm install<br/>
  
3). To run on a development web server, type<br/>
  npm start<br/><br/>
  

4). To build a production version, run<br/>
  webpack -p<br/>
  The command above will generate two files:<br/><br/>
  index.html<br/>
  bundle.js<br/><br/>
  
  To deploy the product version, simply copy the two files above<br/> to <b>the root of the web server</b><br/>
  so that this application can be launch as the default application when access the web server url.<br/>
  For example, in case you have a web server running at 192.168.100, then http://192.168.100 will launch<br/>
  the application (in order to deploy this application to an arbitrary location we need to setup the routing in the web server) <br/>

5). To test, run<br/>
  npm test<br/><br/>
  

