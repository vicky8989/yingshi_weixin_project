<template>
  <footer class="aui-bar aui-bar-tab" id="footer">
    <router-link to="/home" class="aui-bar-tab-item" >
      <i class="iconfont icon-shouye aui-font-size-20"></i>
      <div class="aui-bar-tab-label">首页</div>
    </router-link>
    <router-link to="/signin" class="aui-bar-tab-item" >
      <i class="iconfont icon-huiyishi aui-font-size-20"></i>
      <div class="aui-bar-tab-label">报名</div>
    </router-link>
    <router-link to="/award" class="aui-bar-tab-item">
      <i class="iconfont icon-icon133 aui-font-size-20"></i>
      <div class="aui-bar-tab-label">奖品</div>
    </router-link>
    <router-link to="/pink" class="aui-bar-tab-item" >
      <i class="iconfont icon-paihangbang aui-font-size-20"></i>
      <div class="aui-bar-tab-label">榜单</div>
    </router-link>
  </footer>
</template>
<script>
    export default{
        name:'BottomNav',
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
