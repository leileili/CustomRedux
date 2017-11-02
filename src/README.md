***How to extend Redux with pub/sub in real system ?***

<p>
<b>Problem 1:</b>	
In a web application systems where components need to communicate to each other,if we use React Redux , the standard approach is using Redux store subscription. The subscription will be sent to all the subscribers and in a real world web application, it might mean more than hundreds or thousands components will receive the notification and for each component it needs to use getState() to check if this call is for it, but in the fact maybe there is only one component need to be notified. In this case the universal subscription approach will be a concern issue for performance. 

<br/>
<b>Problem 2:</b>
When there's no existing reducer match the requested action type, what will the Redux do? The state won't be changed, and so no components will receive any notification. But what if you need to make some components changes based on another components changes without updating state?
<br/>
<br/>
<b>Solution:</b>
I'm using customized publish/subscribe other than Redux store subscription to solve the problems, it also uses containers and components pattern of react.

In a regular redux application, the store sends out subscription to all the subscribers, with empty parameter. That's why the subscribers won't know what the current state is after receiving notification from store. Each subscriber has to check the current state by using getState(). But in my project, since there are more than hundreds of components, I don't want to use such method, it is very inefficient. 

I have a center piece called CommunicationManager which has publish, subscribe and also has a single store.subscribe.
I'm using a middleware to save the current action whenever there is a dispatch. So whenever the store send out subscribe, I pass the current action with it. In this way, the subscribers will know what current action is without using getState().
The CommunicationManager uses map to sort the topics coming from subscribers and publishers.

Also for the problem of having no match reducer for a specific action type, I don't create a new reducer for the job; instead of I'm using subscribe and publish pattern to take care of the request. And some of my components don't have redux connect, but they need to get notified by other components' dispatch, subscribe and publish work for them too.

I put together a small demo to explain how it was done in my work project. 


Here is the flow chart:
![Custom React Redux workflow](./Custom_React_Redux.png?raw=true "Custom React Redux workflow Picture")


**Live Demo:**

<a href="https://leileili.github.io/Custom_React_Redux/">Custom React Redux Demo</a>
