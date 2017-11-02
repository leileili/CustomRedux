class Sub {
	constructor(owner, handler) {
		this.owner = owner;
		this.handler = handler;
	}
	run(data) {
		this.handler.call(this.owner, data)
	}
}

class Topic {
	constructor(topicName) {
		this.name = topicName;
		this.subMap = {}
	}
}

class CommunicationManager{
	
	constructor(){
		this.topicMap = {};
		window.cm = this;
		this.dir = {};
	}
	init(store, routeData){
		this.store = store;
		var self = this;
		this.setValue("store", store);		
		store.subscribe(()=> {	
			self.publish(self.getValue("currentAction"))
		})
		
	}
	dispatch(action) {
		this.store.dispatch(action)
	}
	
	getStore(){
		return this.store;
	}
	
	getValue(key) {
		return this.dir[key]
	}
	
	setValue(key, value) {
		this.dir[key] = value;
	}
	
	subscribe(topicName, handler, owner){
			 var topic = this.topicMap[topicName];
			 if (topic===undefined) {
				 topic = this.topicMap[topicName] = new Topic(topicName)
			 }
			 topic.subMap[owner.id] = new Sub(owner, handler)
	}
	publish(action){
	    	 var topic = this.topicMap[action.type];
	    	 
			 if (topic===undefined) {
				 console.log("WARNING: there is no subscriber for topic:"+action.type)
				 return
			 }
			 console.log("Publish:"+topic.name);
			 for (var t in topic.subMap) {
				 var sub = topic.subMap[t];
				 sub.run(action.data);
			 }
	}
	
}

const cm = new CommunicationManager();
export default cm;
	

