<template>
  <div class="stu">
     <div class="img_top_box" v-loading="loading">
		 <div style="width:580px;height:100%;float:right;margin-right:240px;padding-top:266px;">
			 <p style="font-size:40px;color:#FFFFFF;text-align: center;font-family:MF DianHei;font-weight:normal;">园区人事档案信息平台</p>
			 <div class="inpbox">
				 <div class="inpbox2">
					<img src="../../assets/img/ICON/ren@2x.png" alt="">
					<input @keyup.enter='login_fn' type="text" v-model="dates.name" autocomplete='off' placeholder="请输入您的账号">
				 </div>
				 <div class="inpbox2">
				 	<img src="../../assets/img/ICON/se@2x.png" alt="">
					<input @keyup.enter='login_fn' v-model="dates.password" type="password" autocomplete='new-password' placeholder="请输入密码">
				 </div>
				 <button  @click="login_fn">登录</button>
			 </div>
		 </div>
	 </div>
  </div>
</template>

<script>
	 pushHistory();  
	            var bool=false;  
	            setTimeout(function(){  
	                  bool=true;  
	            },1500);  
	            window.addEventListener("popstate", (e)=> {  
	              if(bool){ 
	                     //做自己想做的事情
						// window.location.href = location.host;
	                }  
	                pushHistory();  
	            }, false);  
	           function pushHistory() {  
	            var state = {  
	                title: "title", 
	                url: "#"  
	            };  
	            window.history.pushState(state, "title", "#");
	        }     
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery'
export default {
  name: 'stu',
  components: {},//声明子组件
  computed:{
	  
  },
  data(){
	  return {
		  dates:{
			name:'',
			password:'',
			
		  },
		 log:true,
		 loading:false,
	  }
  },
  methods:{
	  cao(){
		// window.location.href = this.$store.state.urls+'/help/PC.html';
		window.open(this.$store.state.urls+'/help/PC.html'); 
	  },
	  lefta(){
		  this.log=true;
		  this.dates.role = '';
	  },
	  log_fn(i){//选择入口
		  this.log=false;
		  this.dates.role = i;
	  },
	  login_fn(){//登录功能
	      if(this.dates.name){}else{this.$message({message:'请输入账号',type:'warning'});return false;}
          if(this.dates.password){}else{this.$message({message:'请输入密码',type:'warning'});return false;}
		  this.loading = true;
		  
         $.ajax({
			    url:this.$store.state.urls+'/zp/user/login',
			    type: 'post',
			    // 设置的是请求参数
			    data:this.dates,
			    dataType: 'json',
			    success: (res)=> {
				if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
				  if(res.code==200){
					  localStorage.uid = res.data.uid;
					  localStorage.role = res.data.role;
					  localStorage.company = res.data.company;
					  localStorage.ad =1;
					  if(localStorage.role==2){
						this.$router.push({path:'yq_ql_yg_gl_03'});
					  }else{
						this.$router.push({path:'yqqyrs_gk_01'});
					  }
				  }else if(res.code==300){
					  this.$message.error('用户名或密码错误')
				  }else{this.$message.error('网络错误')}
				   console.log(res)
				   this.loading = false;
			    }
			})
	  },
	  
  },
  mounted(){
	  
	  
  }
}
</script>
<style scoped="scoped">
	*{box-sizing: border-box;font-family: 'SourceHanSansSC-bold';outline:none;}
	
	.inpbox2{
		width:100%;
		height:47px;
		background:rgba(255,255,255,1);
		line-height:47px;
		margin-bottom:33px;
	}
	.inpbox2 img{
		width:28px;
		height:28px;
		float:left;
		margin: 10px 18px 0 20px;
	}
	.inpbox2 input{
		width:360px;
		height:20px;
		float:left;
		margin-top: 14px;
		border: none;
		background: white;
		font-size:16px;
		border-left: 2px solid #B6BABC;
		padding-left:20px;
		
	}
	.inpbox button{
		border: none;
		width: 100%;
		height:47px;
		background:rgba(41,121,255,1);
		font-size:20px;
		color: white;
		margin-top:18px;
	}
	.inpbox{
		width:100%;
		height: 406px;
		padding:124px 73px 0 73px;
		background:url(../../assets/img/ICON/zu13@2x.png);
		background-size:100% 100%;background-repeat:no-repeat;
	}
	.img_top_box{
		width: 100%;
		height:100%;
		position:absolute;
		top: 0;
		left: 0;
		background:url(../../assets/img/ICON/bei6@2x.png);
		background-size:100% 100%;background-repeat:no-repeat;
	}
	
</style>
