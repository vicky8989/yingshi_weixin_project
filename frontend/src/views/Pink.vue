<template>
    <div>我是排行榜
      <BottomNav/>
    </div>
</template>
<style scoped>

</style>
<script>
import BottomNav from './common/BottomNav.vue'
 export default {
  name: 'Pink',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
     BottomNav,
  }
}
</script>
