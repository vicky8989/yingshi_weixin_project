<template>
	<div class="count">
		<div class="title">活动倒计时</div>
		<div class="countItem"><span>{{day}}</span>天</div>
		<div class="countItem"><span>{{hour}}</span>时</div>
		<div class="countItem"><span>{{minute}}</span>分</div>
		<div class="countItem"><span>{{second}}</span>秒</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeTime: null,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				timer: null
			}
		},
		beforeMount() {
			this.getactiveTime();
			//			if(this.conutTime) {
			//				this.countDowns(this.conutTime);
			//			}
		},
		computed: {
			conutTime() {
				return this.$store.state.conutDown;
			},
		},
		mounted: function() {
			//			this.countDowns(this.conutTime);
		},
		methods: {
			getactiveTime() {
				let self = this;
				this.ApiSever.getActivity().then(res => {
					if(res && res.data && res.data.length > 0) {
						let result = res.data[0];
						self.activeTime = result.voteend;
						if(self.activeTime) {
							self.countDowns(self.activeTime);
						}
					}
				});
			},
			tick(d) {
				
				var _this = this;
				_this.curTime = (new Date(d)).getTime() / 1000 - (new Date()).getTime() / 1000;

				_this.$emit('validCurTime', _this.curTime);
				if(_this.curTime > 0) {
					_this.day = Math.floor(_this.curTime / (60 * 60 * 24));
					_this.hour = Math.floor(_this.curTime / (60 * 60)) - (_this.day * 24);
					_this.minute = Math.floor(_this.curTime / 60) - (_this.day * 24 * 60) - (_this.hour * 60);
					_this.second = Math.floor(_this.curTime) - (_this.day * 24 * 60 * 60) - (_this.hour * 60 * 60) - (_this.minute * 60)
				}
				
				if(_this.day == 0 && _this.hour == 0 && _this.minute == 0 && _this.second == 0) {
					_this.day = "00";
					_this.hour = "00";
					_this.minute = "00";
					_this.second = "00";

				} else {
					if(_this.day <= 9) {
						_this.day = "0" + _this.day
					}
					if(_this.hour <= 9) {
						_this.hour = "0" + _this.hour
					}
					if(_this.minute <= 9) {
						_this.minute = "0" + _this.minute
					}
					if(_this.second <= 9) {
						_this.second = "0" + _this.second
					}
					if(_this.curTime <= 0) {
						clearInterval(_this.timer)
					}
					_this.curTime--

				}
			},
			countDowns(d) {
				
				let self = this;
				self.tick(d)
				this.timer = window.setInterval(function() {
					self.tick(d)
				}, 1000)
			}
		},
		destroyed() {
			clearInterval(this.timer);
		}

	}
</script>

<style scoped>
	.count {
		width: 19rem;
		height: auto;
		padding: 0 10%;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.title {
		font-size: 0.75rem;
		height: 2rem;
		line-height: 2rem;
		color: #666;
		text-align: center;
	}
	
	.countItem {
		width: 3rem;
		height: 1.5rem;
		line-height: 1.5rem;
		border: 1px solid #ebebeb;
		float: left;
		border-radius: 5px;
		font-size: 0.75rem;
		font-weight: 500;
		color: #666;
		margin-left: 0.5rem;
		box-shadow: 0 1px 2px 1px #ebebeb;
		text-align: center;
		background-color: white;
	}
	
	.countItem:first-of-type {
		margin-left: 0;
	}
</style>