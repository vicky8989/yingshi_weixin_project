<template>
	<div>
		<ul class="aui-list aui-form-list">
      <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                    选手姓名
                </div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入姓名或昵称">
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                    参赛宣言
                </div>
                <div class="aui-list-item-input">
                    <div class="aui-range">
                        <textarea placeholder="一句话描述自己的参赛宣言"></textarea>
                    </div>
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                    手机
                </div>
                <div class="aui-list-item-input">
                    <div class="aui-range">
                        <input type="tel" placeholder="请输入手机号码">
                    </div>
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-center">
                请上传1-3张照片，第一张为封面图
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-center aui-list-item-btn">
                    <div class="aui-btn aui-btn-sm aui-btn-success">提交报名</div>
                </div>
        </li>
    </ul>
		<BottomNav/>
	</div>
</template>
<style scoped>
  .aui-list.aui-form-list * {
    font-size: 0.6rem;
    text-align: left;
  }
</style>

<script>
import BottomNav from './common/BottomNav.vue';
import Mock from 'mockjs';

export default {
  name:'SingIn',
  data () {
    return {
      //awardsList:[]
    }
  },
  components:{
	BottomNav
  },
  methods:{  	
  },
  mounted: function () {
  	this.$nextTick(function () {
  		var self=this;
        //self.ajaxAwardsList();
  	});
  }
}

</script>