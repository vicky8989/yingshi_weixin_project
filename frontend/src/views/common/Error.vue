<template>
    <div>
        <div class="aui-padded-t-15 cl-666">404找不到页面。。。</div>
        <BottomNav/>
    </div>
</template>
<style>

</style>
<script>
   import BottomNav from './BottomNav.vue';
    export default{
        name:'Error',
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
           BottomNav
        }
    }
</script>
