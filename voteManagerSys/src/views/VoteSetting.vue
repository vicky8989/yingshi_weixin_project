<template>
	<div>

		  <div class="index_source">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>图文投票</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" disabled type="border-card" @tab-click="handleClick">
        <el-tab-pane label="活动设置" name="first">
          <el-form ref="activityForm"  :label-position="labelPosition" :model="activity" label-width="160px" :rules="rules" >
        <el-form-item label="活动标题:" prop="name">
          <el-input v-model="activity.name"></el-input>
        </el-form-item>
        <el-form-item label="封面:" prop="banner">
          <div class="photo_div">
            <div class="input_photo bg_cover" v-if="activity.banner&&activity.banner.length>0" v-for="(list, index) in activity.banner" @click="handlePictureCardPreview(list)">
              <img :src="imgURL+list" @load="successLoadImg" @error="errorLoadImg" />
              <i class="close" @click="deletePhoto(index)">×</i>
            </div>
            <div class="input_photo bg_cover" v-if="!activity.banner||activity.banner.length<3">
              <img :src="addImg" ref="regPhoto" />
              <input v-if="!activity.banner||activity.banner.length<3" type="file" multiple="multiple" placeholder="请选择" name="thumbPic" ref="thumbPic" class="imgOne" @change="updataOne" />
            </div>
            <span class="dec">注：请上传三张***大的图片</span>
          </div>
        </el-form-item>
        <el-form-item label="活动简介:" prop="info">
           <el-input type="textarea" v-model="activity.info"></el-input>
        </el-form-item>
        <el-form-item label="如何参与:" prop="participation">
          <el-input type="textarea" v-model="activity.participation"></el-input>
        </el-form-item>
        <el-form-item label="奖品介绍:" prop="process">
          <el-input type="textarea" v-model="activity.process"></el-input>
        </el-form-item>
        <el-form-item label="报名时间:" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="activity.enrolstart" style="width: 100%;" :picker-options="pickerOptions1" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="activity.enrolend" style="width: 100%;" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="投票时间:" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="activity.votestart" style="width: 100%;" :picker-options="pickerOptions4" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="activity.voteend" style="width: 100%;" :picker-options="pickerOptions3" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="限制每天投票数:" prop="confineVoteNum" :rules="[
              { required: true, message: '限制每天投票数不能为空'},
              { type: 'number', message: '限制每天投票数必须为数字值'}
            ]">
          <el-input type="text" v-model.number="activity.confineVoteNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="协办方单位名称:" prop="partner">
          <el-input v-model="activity.rule"></el-input>
        </el-form-item>-->
        <el-form-item label="客服微信号:" prop="contact">
          <el-input v-model="activity.contact"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否可以给自己投票:">
          <el-radio-group v-model="activity.resource">
            <el-radio label="可以"></el-radio>
            <el-radio label="不可以"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存,下一步</el-button>
          <el-button @click="resetForm('activityForm')">重置</el-button>
        </el-form-item>
      </el-form>
        </el-tab-pane>
        <el-tab-pane label="奖品设置" name="second">
          <el-table :data="awards" class="tb-edit" style="width: 100%" highlight-current-row @row-click="getPrizeInfos">
            <el-table-column label="奖品等级名称" width="300">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="奖品名称" width="300">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.prizeinfo" placeholder="请输入奖品名称" @change="handleEdit(scope.$index, scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="奖品图片" width="220">
                <template scope="scope">
                    <el-input size="small" class="input_prizeimg" v-model="scope.row.prizeimg" placeholder="图片"></el-input>
                    <input type="file" placeholder="请选择" name="awardPic" ref="awardPic" class="awardPic" @change="updataAwardPic(scope.$index,scope.row)" />
                    <!-- <el-upload
                      width='100'
                      class="upload-prizeimg"
                      v-model="scope.row.prizeimg"
                      :multiple="noMulti"
                      :show-file-list="nofilelist"
                      :action="uploadURL"
                      name="image"
                      :on-success="uploadPizeImgSuccess"
                      :on-error="handleUploadError"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload> -->
                </template>
            </el-table-column>
            <el-table-column label="奖品数量" width="80">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.num" placeholder="数量" @change="handleEdit(scope.$index, scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
          <!-- <v-table
            is-horizontal-resize
            style="width:100%;font-size:14px;"
            :columns="columns"
            :table-data="awards"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
          ></v-table> -->
          <el-form style="margin-top:20px;">
          <el-form-item>
          <el-button type="primary" @click="onFinishSetting">保存,下一步</el-button>
          <el-button @click="addPrize(activeId)">继续添加奖品</el-button>
        </el-form-item></el-form>
        </el-tab-pane>
      </el-tabs>

	</div>
</template>

<script>
import Vue from 'vue';
//import operateRow from '../components/operateRow';

let vueIns = null;
export default {
  name: 'setting',
  components: {
      //'quill-editor':quillEditor,
      //'table-operation':operateRow
  },
  data () {
    return {
      labelPosition: 'right',
      addImg:'static/img/imgadd.png',
      activeId:this.$route.params.id,
      activeName: 'first',
      awards:[],
      rules:{
        name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        banner:[{required:true,message:'请上传banner图片'}],
        // date: [
        //   { type: 'date', required: true, message: '请选择日期'}
        // ],
        info:[{ required: true, message: '请输入活动介绍'}],
        participation:[{ required: true, message: '请输入如何参与'}],
        process:[{ required: true, message: '请输入奖项介绍'}],
        partner:[{ required: true, message: '请输入协办方单位名称'}],
        contact:[{ required: true, message: '请输入客服微信号'}]
      },
      activity: {
        "name": "第二个活动",
        "aid":"5a36176371940c18d609268c",
        "enrolStart": "2017-12-17T07:06:11.475Z",
        "enrolEnd": "2017-12-17T07:06:11.475Z",
        "voteStart": "2017-12-17T07:06:11.475Z",
        "voteEnd": "2017-12-17T07:06:11.475Z",
        "participation": "第一个活动的参与方式",
        "process": "第一个活动的活动流程",
        "contact": "第一个活动的主办联系方式",
        "info": "第二个活动的详细信息",
        "banner":["第二个活动的图URL0","第一个活动的图URL1","第一个活动的图URL2"],
        "rule": "第二个活动的规则"
      },
      thumbPic: [],
      imgURL: this.ApiSever.imgUrl,
      uploadURL:this.ApiSever.uploadUrl,
      nofilelist:false,
      noMulti:false,
      dialogImageUrl: '',
      dialogVisible: false,
      pickerOptions1: {
        disabledDate(time) {
          return (vueIns.$moment(time).isAfter(vueIns.$moment(vueIns.activity.enrolend)));
        }
      },
      pickerOptions0: {
        disabledDate(time) {
          return (vueIns.$moment(time).isBefore(vueIns.$moment(vueIns.activity.enrolstart)));
       }
    },
    pickerOptions4: {
        disabledDate(time) {
          return (vueIns.$moment(time).isBefore(vueIns.$moment(vueIns.activity.enrolend)));
        }
    },
    pickerOptions3: {
        disabledDate(time) {
          return (vueIns.$moment(time).isBefore(vueIns.$moment(vueIns.activity.votestart)));
       }
    }
  }},
  methods: {

    //重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    handleClick(tab, event) {
        console.log(tab, event);
    },

    successLoadImg() {

    },
    //删除某个banner图片
    deletePhoto(index) {
      let filename = this.activity.banner[index];
      let self = this;
      this.ApiSever.delActivityImg(filename).then(res => {
        if(res)
          self.activity.banner.splice(index,1);
      });
    },
    errorLoadImg() {

    },
    //保存按钮
    onSubmit() {
      let self = this;
      this.$refs["activityForm"].validate((valid) => {
        if(valid) {
          console.log('submit!', self.activity);
          self.activeName='second';
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    onFinishSetting(){
      console.log('finish setting prizes');
      this.$router.push('/index');
    },

    //查看照片
    handlePictureCardPreview(imgUrl) {
      this.dialogImageUrl = this.imgURL + imgUrl;
      this.dialogVisible = true;
    },

    //监听富文本框
    onEditorChange({
      editor,
      html,
      text
    }) {
      this.activity.contentDec = html;
    },

    //如何参与监听富文本框
    onJoinEditorChange({
      joinEditor,
      html,
      text
    }) {
      this.activity.contentJoin = html;
    },

    //流程介绍监听富文本框
    onFlowEditorChange({
      flowEditor,
      html,
      text
    }) {
      this.activity.contentFlow = html;
    },

    delPrize(index,rows) {
      console.log('del row',index);
      rows.splice(index, 1);
    },

    //上传照片
    updataOne() {
      var vm = this;
      if($('.imgOne').get(0).files[0].type.indexOf("image") != -1) {
        var fd = new FileReader();
        fd.readAsDataURL($('.imgOne').get(0).files[0]);
        fd.onload = function() {
          if(fd.result) {
            var formData = new FormData();
            formData.append("image", $('.imgOne').get(0).files[0]);
            $.ajax({
              url: vm.uploadURL,
              type: 'POST',
              data: formData,
              cache : false,
              xhrFields:{'Access-Control-Allow-Origin': '*' },
              processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
              contentType : false, // 不设置Content-type请求头
              success: function(responseStr) {
                var result = responseStr;
                vm.activity.banner.push(result.filename);
              },
              error: function(responseStr) {
                alert('上传失败')
              }
            });
          }
        }
      } else {
        alert('上传图片不符合规则，请重新上传');
      }
    },

    /////////////////////表格方法/////////////////////////
    //奖品信息
    getPrizes(aid) {
        let self = this;
        this.ApiSever.getPrizes(aid).then(res => {
           if(res.data) {
              self.awards = res.data;
           }
        });
    },
    delPrize(row) {
        let self = this;
        this.ApiSever.delPrize(row._id).then(res => {
           if(res.data) {

           }
        });
    },

    //添加奖品
    addPrize(id){
      let newPrize = {
        name:"一等奖",
        num:1,
        prizeinfo:null,
        prizeimg:null,
        info:"得了一等奖才能拿到呦"
      };
      newPrize.aid=id;

      this.ApiSever.addPrize(newPrize).then(res => {
           if(res.data) {
              newPrize._id = res.data;
              vueIns.awards.push(newPrize);
           }
        });
    },
    updataAwardPic(rowindex,row) {
      var vm = this;
      if($('.awardPic').get(rowindex).files[0].type.indexOf("image") != -1) {
        var fd = new FileReader();
        fd.readAsDataURL($('.awardPic').get(rowindex).files[0]);
        fd.onload = function() {
          if(fd.result) {
            var formData = new FormData();
            formData.append("image", $('.awardPic').get(rowindex).files[0]);
            $.ajax({
              url: vm.uploadURL,
              type: 'POST',
              data: formData,
              cache : false,
              xhrFields:{'Access-Control-Allow-Origin': '*' },
              processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
              contentType : false, // 不设置Content-type请求头
              success: function(responseStr) {
                var result = responseStr;
                row.prizeimg = result.filename;
                vm.updatePrize(row);
              },
              error: function(responseStr) {
                alert('上传失败')
              }
            });
          }
        }
      } else {
        alert('上传图片不符合规则，请重新上传');
      }
    },

    //修改奖品信息
    updatePrize(row) {
      this.ApiSever.updatePrize(row).then(res => {
          console.log('update prize',res);
      });
    },    
    getPrizeInfos(row, event, column) {
        console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
        this.updatePrize(row);
    },
    //删除奖品
    handleDelete(index, row) {
      let self = this;
      this.ApiSever.delPrize(row._id).then(res => {
          self.awards.splice(index,1); //把该项从数据中删除
      });
    },    

    //活动设置信息
    getActivityInfo(activityId){
      //Indicator.open('加载中...');
        let self = this;
        this.ApiSever.getActivityInfo(activityId).then(res => {
          if(res.data && res.data.length >0)
            self.activity = res.data[0];
        });
    },

  },
  created() {
    vueIns = this
  },
  mounted(){
    this.$nextTick(function () {
        vueIns.getActivityInfo(vueIns.activeId);
        vueIns.getPrizes(vueIns.activeId); //请求奖品
    });

  }
}
</script>
<style lang="less">
.index_source {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 14px;
    margin-bottom: 24px;
  }

  .input_photo {
    position: relative;
    margin-top: 6px;
    margin-left: 20px;
    width: 80px;
    height: 80px;
    float: left;
  }

  .input_photo .close {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: -8px;
    margin-right: -8px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: #fff;
    border-radius: 50%;
    border: 2px solid red;
    color: #666;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }

  .input_photo img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-height: 100%;
    max-width: 100%;
  }

  .photo_div {
    height: 100px;
  }

  .photo_div .dec {
    color: red;
    line-height: 100px;
    font-size: 14px;
    padding-left: 20px;
  }

  .imgOne {
    position: absolute;
    top: 0;
    opacity: 0;
    width: 80px;
    height: 80px;
    overflow: hidden;
  }

  .bg_cover {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .errorLoadImgbg_cover {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    background: #f4f4f4;
  }

  .errorMinLoadImgbg_cover {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    background: #f4f4f4;
  }
  .cell-edit-color{
    color:#2db7f5;
    font-weight: bold;
  }
  /* .v-table-rightview {
      max-width:1000px;
  }
  .v-table {
    font-size:14px;
    overflow-x:hidden;
  } */

  .input_prizeimg{
    width:120px;
    float: left;
  }

  .upload-prizeimg {
    padding-left: 4px;
    .el-upload--text {
      width:75px;
      display: inline-block;
      height:32px;
    }
  }

</style>