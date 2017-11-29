<template>
  <marquee class="notice"  direction="left" align="middle"> <i class="iconfont">&#xe6bf;  {{tips}}</i> </marquee>
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
