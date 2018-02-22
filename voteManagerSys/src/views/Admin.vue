<template>
	<div id="sysSetting">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
		  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
  </el-form-item>
		  <el-form-item>
	    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>   
	  </el-form-item>
	</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

			return {
				ruleForm: {
                    pass: '',
          			checkPass: '',
                },
                rules: {
                    pass: [
			            { validator: validatePass, trigger: 'blur' }
			          ],
			          checkPass: [
			            { validator: validatePass2, trigger: 'blur' }
			          ],
                }
			}
		},
		methods: {
	      submitForm(formName) {
	        const self = this;
	            self.$refs[formName].validate((valid) => {
	                if (valid) {
	                	let pwd = self.ruleForm.pass,username = self.ApiSever.username;
	                	self.ApiSever.updatePwd({username:username,pwd:pwd}).then(res => {
	                		if(res.data && res.data.ok == 1) {
	                			self.$message({
                                    message: '密码修改成功，请重新登录！',
                                    type: 'success',
                                    onClose:function(){
                                    	self.ApiSever.login = false;
                                    	sessionStorage.removeItem("ms_username");
										sessionStorage.removeItem("ms_login");
                                    	self.$router.push('/login');
                                    }
                                });
	                		} else {
	                			self.$message({
                                    message: '修改不成功！',
                                    type: 'error'
                                });
	                		}
	                	})

	                }
	                else {
	                    console.log('error submit!!');
	                    return false;
	                }
	            })
	      	},
	      	resetForm(formName) {
		      this.$refs[formName].resetFields();
		    }
	    }
	}
</script>