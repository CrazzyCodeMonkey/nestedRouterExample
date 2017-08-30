var request = require("request-promise-native");
var c = require("./CONST");

module.exports = class DGW {


	constructor(appKey){
		if (appKey){
			Object.assign(this,c.dgwSettings);
			console.log(this);
			this.appKey = appKey;
			this.invoke = request[this.httpMethod];
		} else {
			throw new Error("Invalid App Key");
		}
	}



	getUri(gatelet){
		return this.protocol + "://" + this.hostName + (this.portNumber? ":" + this.portNumber : "") + (this.apiBasePath?"/" + this.apiBasePath + "/" : "") + gatelet.replace(/\./g, '/') + this.apiExtension;
	}



	invokeByRest(gatelet, params){
		let args = {
			method: "run",
			appkey:this.appKey
		};
		Object.assign(args, params);

		let uri =this.getUri(gatelet);
		console.log(uri);

		return this.invoke(uri, {form:args});
	}



	invokeByRestOutObject(gatelet, params){
		return this.invokeByRest(gatelet, params)
			.then(data=>JSON.parse(data))
			.catch((err)=>{throw new Error("Cannot desierialize data")});
	}



}