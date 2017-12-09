<template>
	<div>
		<el-button type="primary" icon="el-icon-plus" @click="handleShow">添加图文投票</el-button>
	</div>
</template>

<script>
import Vue from 'vue'


export default {
  name: 'index',
  data () {
    return {

    }
  },
  components: {
  },
  methods:{
  	handleShow() {
      this.$router.push('/setting');
    }
  },
  mounted() {
	}
}
</script>

<style lang="less">
</style>