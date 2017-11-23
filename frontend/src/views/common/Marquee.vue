<template>
  <marquee class="notice"  direction="left" align="middle"> <i class="iconfont icon-laba cl-white">{{tips}}</i> </marquee>
</template>
<script>
    export default{
        data(){
            return{ }
        },
        props:{
           tips:String,
        }
    }
</script>
