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
    </ul>
    <div style="text-align:left;" class="aui-margin-l-15 aui-margin-b-15">
        <label class="text-black  aui-font-size-12" style="text-align:left;">请上传1-3张照片，第一张为封面图 </label>         </label>
        <div>                  
          <my-upload  :class="['aui-label', 'aui-label-outlined','myUpload']"
                :crop="false"
                @imageuploaded="imageuploaded"
                :data="param"
                text="+"
                :max-file-size="5242880"
                url="http://localhost/yingshi/upload"> </my-upload>
        </div>
      </div>
        <div class="aui-margin-t-15">
            <div class="text-gray aui-font-size-12 aui-margin-t-15 aui-margin-b-15">请如实填写报名信息 获取参赛资格！</div>
            <div class="aui-margin-t-5 aui-font-size-12 aui-btn signIn_btn">提交报名</div>
        </div>
		<BottomNav/>
	</div>
</template>
<style scoped>
  .text-black {
    color:#666;
  }

  .text-gray {
    color: #999;
  }
  .aui-list.aui-form-list * {
    font-size: 0.5rem;
    text-align: left;
    color:#666;
  }
  .myUpload {
    font-size: 32px;
    margin-top: 15px;
    width:52px;
    height: 54px;
    color:#999;
  }
  .aui-btn.signIn_btn {
    width: 90%;
    color:white;
    background-color: rgba(4,190,2,1);
    font-weight: 600;
  }
</style>

<script>
import BottomNav from './common/BottomNav.vue';
import Mock from 'mockjs';
import myUpload from 'vue-core-image-upload';

// 生成商品列数据
// Mock.mock('http://localhost/yingshi/upload', {
//         code: 1,
//         msg: '查询成功',
//         data: {
//           'imgUrl':'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png'
//         }
// });

export default {
  //name:'SingIn',
  data() {
    return {
      param:{},
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
    }
  },
  components:{
    'my-upload': myUpload,
	   BottomNav
  },
  methods: {
    imageuploaded(res) {
      
    }
  }
}

</script>