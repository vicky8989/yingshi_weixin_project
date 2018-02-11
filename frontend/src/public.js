export default {
	conversionTime: function(data) {
		let actionsTime = null;
		if(data) {
			let finishingTime = data.replace(/-/g, ':').replace(' ', ':');
			let timeArr = finishingTime.split(':');
			let monthTime = parseInt(timeArr[1]) - 1;
			actionsTime = new Date(timeArr[0], monthTime, timeArr[2], timeArr[3], timeArr[4], timeArr[5]) / 1000;
		} else {
			actionsTime = new Date().getTime() / 1000;
		}
		return actionsTime;
	}
}