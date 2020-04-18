<template>
  <div class="stu">
     <div class="top_box"  v-loading.fullscreen.lock="fullscreenLoading">
		 <div style="width:1401px;height:100%;margin: 0 auto;color: white;">
			<p style="font-size:22px;font-weight:600;float:left;height:100%;">园区人事档案信息平台</p>
			<div @click="zuxia" class="zhu" style="background: #246DE7;">注销</div>
			<div @click="dialogFormVisible=true" class="zhu" style="margin-right:10px;">修改密码</div>
			<p style="font-size:14px;float:right;margin:0 20px 0 8px;height:100%;">{{$store.state.actionse.cname}}</p>
			<img class="yong" src="../assets/yong.png" alt="">
		 </div>
	 </div>
	 
	 <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width='25%' center>
	   <el-form>
	     <el-form-item label="原始密码" :label-width="formLabelWidth">
	       <el-input v-model="datas.password_old" type='password' autocomplete="off" clearable></el-input>
	     </el-form-item>
		 <el-form-item label="新密码" :label-width="formLabelWidth">
		   <el-input v-model="datas.password" type='password' autocomplete="off" clearable></el-input>
		 </el-form-item>
		 <el-form-item label="确认密码" :label-width="formLabelWidth">
		   <el-input v-model="datas.passwords" type='password' autocomplete="off" clearable></el-input>
		 </el-form-item>
	   </el-form>
	   <div slot="footer" class="dialog-footer">
	     <el-button @click="dialogFormVisible = false">取 消</el-button>
	     <el-button type="primary" @click="xiu()">确 定</el-button>
	   </div>
	 </el-dialog>
	 
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'stu',
  components: {},//声明子组件
  computed:{
	  company(){return localStorage.company},
	  role(){return localStorage.role}
  },
  data(){
	  return {
		fullscreenLoading:false,
		dialogFormVisible:false,
		formLabelWidth: '100px',
		datas:{
			password_old:'',
			password:'',
			passwords:'',
			uid:''
		}
	  }
  },
  methods:{
	 zuxia(){
		 localStorage.role = 9;//注销状态等于9
		 this.$router.push({path:'/'})
	 },
	 xiu(){
				if(this.datas.password_old){}else{this.$message.error('请输入原始密码');return false;}
				if(this.datas.password){}else{this.$message.error('请输入新密码');return false;}
				if(this.datas.passwords){}else{this.$message.error('请输入确认密码');return false;}
				if(this.datas.passwords==this.datas.password){}else{this.$message.error('两次输入的新密码不相同');return false;}
				
					this.datas.uid = localStorage.uid;
					this.fullscreenLoading = true;
		            $.ajax({url:this.$store.state.urls+'/zp/user/modify_user_company',type:'post',
		                    data:this.datas,dataType:'json',success:(res)=> {
		            	   if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		            	      if(res.code==200){
		            			  this.$message({message: '修改成功,请重新登录',type: 'success'});
		            			  this.$router.push({path:'/'})
		            		  }else{this.$message.error(res.msg)}
							  this.fullscreenLoading = false;
		            	 }
		            })
	 },
  },
  mounted(){
	  
	  
  }
}
</script>
<style scoped="scoped">
	.yong{
		width: 25px;
		height: 25px;
		float: right;
		margin-top:31px;
	}
	.zhu{
		/* width: 67px; */
		padding: 0 15px;
		height: 27px;
		line-height: 25px;
		border-radius:13.5px;
		background-color: rgba(255, 255, 255, 0.1);
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0);
		font-size:14px;
		float: right;
		margin-top: 30px;
	}
	.top_box{
		width: 100%;
		height: 90px;
		line-height:90px;
		background:#333333;
		background-color: #2979FF;
		border: 1px solid rgba(255, 255, 255, 0);
	}
</style>
