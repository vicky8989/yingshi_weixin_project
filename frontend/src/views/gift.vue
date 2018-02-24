<template>
	<div id="gift">
		<div class="div_info" @click="gotoUserpage">
			<div class="div_img">
				<img :src="userData.headimgurl" />
			</div>
			<div class="div_msg">
				<div class="div_name">{{userData.name}}</div>
				<span>给他送一份礼物吧</span>
			</div>
			<i class="iconfont">&#xe686;</i>
		</div>
		<ul class="user_vote">
			<li>
				<i class="iconfont">&#xe648;</i>编号
				<p>{{userData.code}}</p>
			</li>
			<li>
				<i class="iconfont">&#xe659;</i>票数
				<p>{{userData.votenum}}</p>
			</li>
			<li>
				<i class="iconfont">&#xe619;</i>热度
				<p>{{userData.hot}}</p>
			</li>
			<li>
				<i class="iconfont">&#xe62f;</i>礼物
				<p>{{userData.giftnum}}点</p>
			</li>
		</ul>
		<ul class="gift_list">
			<li v-for="(list, index) in giftList" key="index" @click="handleCheckgift(list._id,list.name,list.num)">
				<div class="div_box" :class="{'active':list._id==currentId}">
					<div class="div_img">
						<img :src="imgURL+list.giftimg" :width="imgWid" :height="imgHei" />
					</div>
					<p>{{list.name}}</p>
					<span>{{list.num}}</span>
				</div>
			</li>

		</ul>
		<div class="div_select">
			<div class="div_label">请选择以上礼物</div>

			<div class="list_selectinput">
				<select @change="changeGiftNum">
					<option  v-for="n in 100" :value="n">{{n}}</option>
				</select>
			</div>

		</div>
		<div class="purchasing">
			<a href="javascript:;" class="purchasing_btn" @click="purchase">立刻购买</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				giftList: [],
				feeUnit:0,
				user:{headimgurl:'',nickname:'',},
				currentId: null,
				currentGiftName:'',
				currentGiftNum:1,
				userId:this.$route.query.id,
				openId:this.$route.query.openid,
				userData: {
					voteNum: 12,
					hot: 12,
					giftnum: 12,
					code: 12
				},
				imgWid:60,
				imgHei:60,
				imgURL: this.ApiSever.imgUrl
			}
		},
		created() {},
		components: {
		},
		methods: {
			//通过id获取本个人的信息
			getUserInfo() {
				console.log(this.$route.query)
				let openid = this.openId,sid= this.userId;

				let self = this;

				this.ApiSever.getUserDataByID(openid,this.ApiSever.AID).then(res => {
					console.log(res);
					let result = res.body;
					self.userData = result[0];
					if(!self.userData) self.userData = {};
					self.ApiSever.getUserInfo(openid).then(user => {
						console.log('get userinfo',user);
						if(user && user.data && user.data.length >0 ) {
							let info = user.data[0];
							self.userData.headimgurl = info.headimgurl;
							self.userData.unickname = user.nickname;
							self.$forceUpdate();
						}
					});
					//请求用户信息
					self.ApiSever.getPresentsTotal(sid).then(giftNum => {
						let num = giftNum.body&& giftNum.body.length>0?giftNum.body[0].value:0;
						self.userData.giftnum = num;
						self.$forceUpdate();
					});
				});
			},

			changeGiftNum(event) {
				this.currentGiftNum = parseInt(event.target.value);
				//this.currentGiftNum *= this.currentNum;
			},

			getGiftsList() {
				let self = this;
				this.ApiSever.getGiftsList().then(res => {
					console.log(res);
					self.giftList = res.body;
				});
			},

			getFeeUnit() {
				let self = this;
				this.ApiSever.getPrize().then(res => {
					console.log(res);
					self.feeUnit = res.body.prize;
				});

			},

			//选择礼物
			handleCheckgift(id,name,num) {
				if(this.currentId == id) {
					this.currentId = null;
					this.currentGiftName = '';
					this.currentNum = 0;
					return false;
				}
				this.currentId = id;
				this.currentGiftName = name;
				this.currentNum = num;
			},

			//跳转到某个具体的界面
			handleJump() {
				this.$router.push({
					path: '/index'
				});
			},

			gotoUserpage(){
				this.$router.push({
					path: '/votes/'+this.userId+'/'+this.openId,
					params: {
						id: this.userId,
						openid:this.openId
					}
				});
			},
			_get_date_string () {
			  var date = moment().format('YYYY MM DD HH mm ss');

			  return date.split(' ').join('_');
			},
			_get_out_trade_no () {
			  return _get_date_string ()  + "" + Math.random().toString().substr(2, 10);
			},
			pay_h5(body,detail,fee){
			  var ordor_id = this._get_out_trade_no();
			  var openid = this.$store.state.wxUser.openid;
			  $.get('/wechats/pay_h5?id=' + openid + '&order_id=' + ordor_id + '&body='+body+'&detail='+detail+'&fee='+fee+'&cb_url=/wechats/pay_calllback/'+ ordor_id, function(data){
			    var r = data.data;
			    console.log('pay',data);
			    // WeixinJSBridge.invoke('getBrandWCPayRequest', r, function(res){
			    //   if(res.err_msg == "get_brand_wcpay_request:ok"){
			    //     alert("支付成功");
			    //     // 这里可以跳转到订单完成页面向用户展示
			    //   }else{
			    //     alert("支付失败，请重试");
			    //   }
			    // });
			  });
			},

			//购买礼物
			purchase() {
				//alert('purchase');
				if(!this.currentId) return;
				let self = this;

				if(self.feeUnit == 0) return;//如果没有取到对应价格。

				//alert(JSON.stringify(self.$store.state.wxUser));
				let data = {
					sid:self.userData._id,
					openid:self.$store.state.wxUser.openid,
					nickname:self.$store.state.wxUser.nickname,
					headimgurl:self.$store.state.wxUser.headimgurl,
					num:self.currentGiftNum,
					giftname:self.currentGiftName,
					gid:self.currentId,
					time:self.$moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
				};

				//换算成‘分’
				let fee_ = parseFloat(self.currentNum / self.feeUnit * self.currentGiftNum).toFixed(2) * 100;
				var order = {
					body:self.currentGiftName+'*'+self.currentGiftNum+'个',
					detail:self.currentGiftNum+'个',
					fee: fee_,
					openid:self.$store.state.wxUser.openid
				};

				let _this=this;
		        let jsApiParameters={};
		        let onBridgeReady=function(){
		            WeixinJSBridge.invoke(
		                    'getBrandWCPayRequest',
		                    jsApiParameters,
		                    (res)=>{
		                    	//alert('orderpay:'+alert(JSON.stringify(res)));
		                        if (res.err_msg == "get_brand_wcpay_request:ok") {
		                        	_this.$store.dispatch('setSendGiftStatus',true);
		                            //alert('支付成功');
		                            _this.ApiSever.addPresentDetail(data).then(res=> {
		                            	_this.gotoUserpage();
										// _this.$router.push({
										// 	path: '/votes/' + _this.userData._id+'/'+_this.openId,
										// 	params: {
										// 		id: _this.userData._id,
										// 		openid:_this.openId
										// 	}
										// });
									});
		                           //window.location.reload();
		                        }
		                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
		                            //_this.alert('取消支付');
		                            window.location.reload();
		                        }
		                    }
		            );
		        }
		        let callpay=function() {
		        	//alert(WeixinJSBridge);
		            if (typeof WeixinJSBridge == "undefined") {
		                if (document.addEventListener) {
		                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		                } else if (document.attachEvent) {
		                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		                }
		            } else {
		                onBridgeReady();
		            }
		        }

				//this.pay_h5(self.currentGiftName,self.currentGiftName,0.01);
				self.ApiSever.addOrder(order).then(response => {
					console.log('weixin pay',response);
					if(response.status == 200 && response.ok === true) {
                        jsApiParameters=response.data;
                        callpay();
                    } else {
                        console.log('error',response.bodyText);
                    }
				});				
			}
		},

		mounted() {
			if(!this.userId) this.handleJump();
			this.getUserInfo();
			this.getGiftsList();
			this.getFeeUnit();
		}
	}
</script>

<style type="text/css" scoped>

</style>