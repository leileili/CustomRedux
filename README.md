***How did I extend the Redux to support more flexible communication among components***<br/><br/>
**Live Demo:**

<a href="http://coolshare.com/leili/CustomRedux/">Custom React Redux Demo</a>

<p>
<b>Problem 1:</b>	
In Redux, store.subscribe provides a way to notify subscribers when the store/state is changed. And store subscribers are always get invoked when an action is dispatched no matter if the action has a matched reducer. The problem is the store subscriber can not tell if the invocation is relevant when there is no matched reducer since the state is not changed. So it is impossible to use store.dispatch as a publish/subscribe system for regular communication method.
  
In my Redux project at work, I did need such a publish/subscribe system to acheive a flexible communication (Why? See details in my other article: <a href="https://github.com/leileili/independentComponentlize">Highly componentized web application</a>
  
<b>Problem 2:</b>  
The store.subscribe in Redux cause a lot of overhead. For example, say you have 1000 subcribers of Redux store. For any action, every single subscriber's handlef will be invoked and each of the handler has to call getState in order to determent if the invocation is for the subscriber. Most likely one out of 1000 detect the change and process what it want but the rest, 999 calls, are wasted.

<br/>
<br/>
<b>My approach:</b>
I used a customized publish/subscribe pattern to "extend" Redux store.subscribe to solve the problems:<br/><br/>

1. I had plain javascript singleton called CommunicationManager where the publish and subscribe are taken care. The CommunicationManager can be accessed by any components with importing.<br/>
   
2. I added a middleware to save the incomming action, currentAction, as a field of CommunicationManager. <br/>

3. When the CommunicationManager is initialized it call store.subscribe(handler). The only thing the handler did was: <br/><br/> 
      CommunicationManager.publish(CommunicationManager.crrentAction)
  <br/><br/>

4. In this way, No matter if there is a matched reducer for a dispatching or not, the action will be forward to my custom publish/subscribe system where the action.type is used as a key of the "topic" map to obtain the list of subscribers.<br/>
So now we can use store.dispatch to update store and as a pub/sub system to acheive a flexible communication.
<br/><br/>
<b>Solution to Problem 1:</b>	
Since we save the currentAction in our middleware and "inject" the currentAction to the subscriber handler so any subscriber will receive the currentAction as the first argument of the handler and the no relavent handlers will never be invoked by my CommunicationManager (never gave a chance for non-relavent handle to determent if the invocation is for them).
<br/></br>
<b>Solution to Problem 2:</b>	
Since there is only a single subscriber to the store so there is only a single scenario for each dispatching to reach the right handler instead of 1000 scenarios with 1000 getState calls.

**About the demo**
The demo show two cases:
1. A dispatch does two things: update the "houseData" and the action is also received by a subscriber where the filter is enabled.
2. A dispatched action has no matched reducer and delivered to a subscriber.

Here is the flow chart:
![Custom React Redux workflow](./src/Custom_React_Redux.png?raw=true "Custom React Redux workflow Picture")


