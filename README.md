***How did I extend the Redux to support moreflexible communication among components***

<p>
<b>Problem 1:</b>	
In Redux, store.subscribe provides a way to notify subscribers when the store/state is changed. And store subscribers are always get invoked when an action is dispatched no matter if the action has a matched reducer. The problem is the store subscriber can not tell if the invocation is relevant when there is no matched reducer since the state is not changed. So it is impossible to use store.dispatch as a publish/subscribe system for regular communication method.
  
In my Redux project at work, I did need such a publish/subscribe system to acheive a flexible communication (Why? See details in my other article: <a href="https://github.com/leileili/independentComponentlize">Independ Componentlize Web Application</a>
  
<b>Problem 2:</b>  
The store.subscribe in Redux cause a lot of overhead. For example, say you have 1000 subcribers of Redux store. For any action, every single subscriber's handlef will be invoked and each of the handler has to call getState in order to determent if the invocation is for the subscriber. Most likely one out of 1000 detect the change and process what it want but the rest, 999 calls, are wasted.

<br/>
<br/>
<b>Solution:</b>
I used a customized publish/subscribe pattern to "extend" Redux store.subscribe to solve the problems:<br/><br/>

1. I had plain javascript signleton called CommunicationManager where the publish and subscribe are taken care. The CommunicationManager can be accessed by any components with importing.<br/><br/>
   
2. I added middleware to save the incomming action, currentAction, as a field of CommunicationManager. <br/><br/>

3. When the CommunicationManager is initialized it call store.subscribe(handler). The only thing the handler did was: <br/><br/> 
      CommunicationManager.publish(CommunicationManager.crrentAction)
  <br/><br/>

4). In this way, No matter there is a matched reducer for a dispatching, the action will be forward to my custom publish/subscribe system where the action.type is as a key to the "topic" map to obtain the list of subscribers.<br/>
So now we can use store.dispatch to update store or notify subscribers.
<br/><br/>
<b>Solution to Problem 1:</b>	
Since we save the currentAction in our middleware and "inject" the currentAction to the subscriber handler so any subscriber will receive the currentAction as the first argument of the handler and the no relavent handlers will never be invoked by my CommunicationManager (never gave a chance for non-relavent handle to determent if the invocation is for them).
<br/></br>
<b>Solution to Problem 2:</b>	
Since there is only a single subscriber to the store so there is only a single scenario for each dispatching to reach the right handler instead of 1000 scenarios with 1000 getState calls.


In a regular redux application, the store sends out subscription to all the subscribers, with empty parameter. That's why the subscribers won't know what the current state is after receiving notification from store. Each subscriber has to check the current state by using getState(). But in my project, since there are more than hundreds of components, I don't want to use such method, it is very inefficient. 

I have a center piece called CommunicationManager which has publish, subscribe and also has a single store.subscribe.
I'm using a middleware to save the current action whenever there is a dispatch. So whenever the store send out subscribe, I pass the current action with it. In this way, the subscribers will know what current action is without using getState().
The CommunicationManager uses map to sort the topics coming from subscribers and publishers.

Also for the problem of having no match reducer for a specific action type, I don't create a new reducer for the job; instead of I'm using subscribe and publish pattern to take care of the request. And some of my components don't have redux connect, but they need to get notified by other components' dispatch, subscribe and publish work for them too.

I put together a small demo to explain how it was done in my work project. 


Here is the flow chart:
![Custom React Redux workflow](./Custom_React_Redux.png?raw=true "Custom React Redux workflow Picture")


**Live Demo:**

<a href="http://coolshare.com/leili/CustomRedux/">Custom React Redux Demo</a>
