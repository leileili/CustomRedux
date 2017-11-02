import $ from 'jquery';
import cm from './CommunicationManager'

class RemoteServices {
	constructor() {
		this.id = "RemoteServices"
		this.init();
	};
	
	init() {
		cm.subscribe("/"+this.id+"/Create", function(param) {
			this.create(param);
		}, this);
		cm.subscribe("/"+this.id+"/Edit", function(param) {
			this.edit(param);
		}, this);
		cm.subscribe("/"+this.id+"/getAll", function(param) {
			this.getAll(param);
		}, this);
		cm.subscribe("/"+this.id+"/Get", function(param) {
			this.get(param);
		}, this);
		cm.subscribe("/"+this.id+"/Delete", function(param) {
			this.remove(param);
		}, this);
	}
	
	create(param) {
		$.post(param.url, param.data, function(res) {
			cm.publish({"type":"/"+this.id+"/getAll"+"/Response", "data":res});
			if (param.handler) {
				param.handler(res)
			}
		});
	}
	edit(param) {
	}
	getAll(param) {
		var self = this;
		$.get(param.url, function(res) {
			var data = eval("("+res+")")
			cm.dispatch({"type":"houseData", "data":data.comparables})
			//cm.publish({"type":"/"+self.id+"/getAll"+"/Response", "data":res})
			if (param.handler) {
				param.handler(res)
			}
		});
	}
	remove(param) {
	}		
	
}
const rs = new RemoteServices();
export default rs;
