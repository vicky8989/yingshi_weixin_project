<template>
  <div class="pd-10 aui-font-size-12 bg-2 aui-text-center">
    <div class="text-white">活动倒计时</div>
    <div class="aui-margin-t-10">
      <div class="countItem  aui-margin-r-10 cl-2"><span >{{day}}</span>天</div>
      <div class="countItem  aui-margin-r-10"><span >{{hour}}</span>时</div>
      <div class="countItem  aui-margin-r-10"><span >{{minute}}</span>分</div>
      <div class="countItem  "><span >{{second}}</span>秒</div>
    </div>
  </div>
</template>
<script>
    export default{
      name:'conutDown',
        data(){
            return{
              curTime:0,
               day:0,
               hour:0,
               minute:0,
               second:0,

            }
        },
         mounted: function () {
            this.countDown( this.time)
         },
        methods:{
             countDown(d){
               var _this=this;
               _this.curTime =(new Date(d)).getTime()/1000 -(new Date()).getTime()/1000;
                console.log(_this.curTime)
              var timer = window.setInterval(function () {
                  if (_this.curTime > 0) {
                    _this.day = Math.floor(_this.curTime / (60 * 60 * 24));
                    _this.hour = Math.floor(_this.curTime / (60 * 60)) - (_this.day * 24);
                    _this.minute = Math.floor(_this.curTime / 60) - (_this.day * 24 * 60) - (_this.hour * 60);
                    _this.second = Math.floor(_this.curTime) - (_this.day * 24 * 60 * 60) - (_this.hour * 60 * 60) - (_this.minute * 60)
                  }
                  if (_this.day <= 9) {
                    _this.day = "0" + _this.day
                  }
                  if (_this.hour <= 9) {
                    _this.hour = "0" + _this.hour
                  }
                  if (_this.minute <= 9) {
                    _this.minute = "0" + _this.minute
                  }
                  if (_this.second <= 9) {
                    _this.second = "0" + _this.second
                  }
                  if (_this.curTime== 0) {
                    clearInterval(timer)
                     }
                  _this.curTime--
               },1000)
            }
        },
        props:{
         time:String,
        }
    }
</script>
