<template>
	<!-- 用户管理 -->
  <div class="stu">
       <div style="width: 100%;height:56px;border-bottom:1px solid #ECECEC;">
       		 <p style="font-size:28px;font-weight:600;float:left;">用户管理</p>
			 <div @click="Visible('添加新用户','')" class="btnsa">+ 添加新用户</div>
			 <el-input clearable @keyup.enter.native="git_act(1,tab_num)" style="width:302px;float:right;margin-right: 14px;" placeholder="用户名称" v-model="recru" class="input-with-select">
			     <el-button @click='git_act(1,tab_num)' slot="append" icon="el-icon-search"></el-button>
			 </el-input>
       </div>
	   <div  v-show="role==0" class="tab_boxs">
		   <div v-for="(i,index) in top_tab" @click="tab_fn(index)" :class="{tab_boxscs:tab_num==index,tab_boxsc:index!=tab_num}">{{i}}</div>
	   </div>
	<!-- 表格 -->
	     <el-table v-loading='logins' :data="tableData" width='100%' height='561' stripe style="width: 100%">
	       <el-table-column header-align='center' align='center' prop="company" label="名称" ></el-table-column>
	       <el-table-column header-align='center' align='center' label="身份" >
			   <template slot-scope="scope">{{scope.row.role==0?'超级管理员':(scope.row.role==1?'管理员':'企业用户')}}</template>
		   </el-table-column>
		   <el-table-column header-align='center' align='center' prop="name" label="账号" ></el-table-column>
		   <!-- <el-table-column header-align='center' align='center' prop="password" show-overflow-tooltip label="密码" ></el-table-column> -->
		   <el-table-column header-align='center' align='center' label="操作" >
			  <template slot-scope="scope">
			    <el-button @click='Visible("修改用户信息",scope.row)' type="text" size="small">修改</el-button>
				<el-button @click='detpass(scope.row)' type="text" size="small">重置密码</el-button>
			    <el-button @click='delect(scope.row)' type="text" style='color:#FF4949;' size="small">删除</el-button>
			  </template>
		   </el-table-column>
	     </el-table>
	<!-- 分页 -->
		 <el-pagination v-show='totals>8' :page-size="9" style='margin-top: 40px;' background layout="prev, pager, next" @current-change="handleCurrentChange" :total="totals"></el-pagination>
        
		 <el-dialog v-loading="loading" :title="art_title" :visible.sync="centerDialogVisible" width="20%" center>
			 
			 <el-form>
			     <el-form-item label="名称" label-width="100">
			       <el-input style="width:80%;" v-model="art_put.names" autocomplete="off"></el-input>
			     </el-form-item>
			     <el-form-item v-show='role_show' label="身份" label-width="100">
			         <el-radio v-model="art_put.radio" label="1">管理员</el-radio>
			         <el-radio v-model="art_put.radio" label="2">企业用户</el-radio>
			     </el-form-item>
				 <el-form-item label="账号" label-width="100">
				   <el-input style="width:80%;" v-model="art_put.card" autocomplete="off"></el-input>
				 </el-form-item>
				 <!-- <el-form-item label="密码" label-width="100">
				   <el-input style="width:80%;" type='password' v-model="art_put.passwords" autocomplete="off"></el-input>
				 </el-form-item> -->
				 <!-- <el-form-item label="确认密码" label-width="100">
				   <el-input style="width:71.5%;" type='password' v-model="art_put.passwords2" autocomplete="off"></el-input>
				 </el-form-item> -->
			 </el-form>
			 
		   <span slot="footer" class="dialog-footer">
		     <el-button @click="centerDialogVisible = false">取 消</el-button>
		     <el-button type="primary" @click="cre_ate">确 定</el-button>
		   </span>
		 </el-dialog>
		 
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery'
export default {
  name: 'stu',
  components: {},//声明子组件
  computed:{
	  role(){return localStorage.role},//1=管理员2=企业
	  indexof(){
		  return function(data,label){
			  for(let h=0;h<data.length;h++){
			  		if(label == data[h].label){
			  			this.$store.state.tab_cox = h;
			  			break
			  		}
			  }
		  }
	  },
  },
  data(){
	  return {
		art_title:'',
		art_put:{
			names:'',//姓名
			radio:'',//用户身份
			card:'',//账号
			passwords:'',//密码
			passwords2:'',//确认密码
			uid:'',
		},//添加编辑容器
		  
		centerDialogVisible:false,//控制添加弹窗
		logins:false,
		tab_num:1,
		top_tab:['全部','管理员','企业用户'],
		tableData:[],
		tableData_s2:[],
		totals:0,//页数
		pages:1,
		role_show:true,
		loading:false,
		recru:'',//企业名字搜索条件
	  }
  },
  methods:{
	  
	detpass(i){
		this.$confirm('确定重置 '+i.company+' 的密码?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
		  }).then(()=>{
			this.loading = true;
		    $.ajax({url:'zp/user/reset_password',type:'post',data:{uid:i.uid},dataType:'json',success:(res)=> {
		    	if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		    	      if(res.code==200){
		    			  this.$message({message: '重置成功',type: 'success'});
		    		  }else{}
		    		  this.loading = false;
		    	}
		    })
		  }).catch(()=>{});
	},
	  
   //添加编辑
    Visible(name,i){
		console.log(i)
		this.art_title = name;
	  if(i){
		this.role_show = false;
		this.art_put.names=i.company;
		this.art_put.card=i.name;
		this.art_put.passwords=i.password;
		this.art_put.radio=i.role;
		this.art_put.uid=i.uid;
	  }else{
		this.role_show = this.role==0?true:false;
		this.act_qin();//清空输入的数据
	  }
	    this.centerDialogVisible = true;
		this.art_put.passwords = '';this.art_put.passwords2 = '';
	},
	
   //删除
	delect(i){
	 if(i.uid==localStorage.uid){
		this.$message.error('不能删除您自己！');return false;
	 }
	  this.$confirm('确定删除 '+i.company+' 吗?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
	    }).then(()=>{
			this.loading = true;
			let a1 = [];a1.push(i.uid);
	        $.ajax({url:this.$store.state.urls+'/zp/user/batch_del_user',type:'post',data:{uid:a1},dataType:'json',success:(res)=> {
	        	if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
	        	      if(res.code==200){
	        			  this.$message({message: '删除成功',type: 'success'});
						  let pagea = this.tableData.length==1?this.pages-1:this.pages;
						  this.git_act(pagea,this.role==0?0:1);
	        		  }else{this.loading = false;}
	        		  console.log(res)
					  this.loading = false;
	        	}
	        })
	    }).catch(()=>{});
	},
	
	act_qin(){//清空输入的数据
		this.art_put.names = '';this.art_put.radio = '';this.art_put.card = '';
		this.art_put.passwords = '';this.art_put.passwords2 = '';
	},
	//添加/修改
		cre_ate(){
			   if(this.art_put.names){}else{this.$message({message:'请输入企业名称或者管理员姓名',type:'warning'});return false;}
			    if(this.role==0){
					if(this.art_put.radio){}else{this.$message({message:'请选择身份',type:'warning'});return false;}
				}
			   if(this.art_put.card){}else{this.$message({message:'请输入账号',type:'warning'});return false;}
			   // if(this.art_put.passwords){}else{this.$message({message:'请输入密码',type:'warning'});return false;}
			   // if(this.art_put.passwords2){}else{this.$message({message:'请输入确认密码',type:'warning'});return false;}
			   // if(this.art_put.passwords==this.art_put.passwords2){}else{this.$message({message:'两次输入的密码不相同',type:'warning'});return false;}
			    var urll = this.art_title=='修改用户信息'?'/zp/user/modify_user':'/zp/user/insert';
				this.art_put.radio = this.role==0?this.art_put.radio:2;
				this.loading = true;
		        $.ajax({url:this.$store.state.urls+urll,type:'post',
				        data:{
							company:this.art_put.names,
							name:this.art_put.card,
							password:this.art_put.passwords,
							// role:this.art_put.radio,
							admin_role:this.role,
							uid:this.art_title=='修改用户信息'?this.art_put.uid:localStorage.uid,
						},dataType:'json',success:(res)=> {
		        	   if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		        	      if(res.code==200){
							  this.git_act(this.pages,this.role==0?0:1);
		        			  this.$message({message: '操作成功',type: 'success'});
							  this.centerDialogVisible = false;
							  this.act_qin();//清空输入的数据
		        		  }else if(res.code==300){
							  this.$message.error(res.data)
						  }else{this.$message.error('操作失败')}
		        		  console.log(res)
						  this.loading = false;
		        	 }
		        })
	},
	 handleCurrentChange(val) {
	    console.log(`当前页: ${val}`);
		this.pages = val;
		if(this.role==0){
			this.git_act(this.pages,this.tab_num);
		}else{
			this.git_act(this.pages,2);
		}
		
	 },
//数据赛选
	tab_fn(index){
		this.tab_num=index;
		this.git_act(1,index);
	},
//获取列表数据
	 git_act(pages,roles){
		 this.logins = true;
		 $.ajax({url:this.$store.state.urls+'/zp/user/query_all',type:'post',
		      data:{
				  company:this.recru,
				  page:pages,
				  size:9,
				  role:roles,
				  uid:localStorage.uid
			  },dataType:'json',success:(res)=> {
		 	      if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		 	      if(res.code==200){
		 			  this.tableData = res.data;
					  this.tableData_s2 = res.data;
					  this.totals = res.count;
					  this.logins = false;
		 		  }else if(res.code==300){
					  this.$message.error('没有搜索到'+this.recru);
				  }
		 		  console.log(res);this.logins = false;
		 	}
		 })
	 },
	 
	 
  },
  mounted(){
	this.git_act(this.pages,this.role==0?0:1);
	
	this.indexof(this.$router.options.routes[1].children,'用户管理');
	
	this.role_show = this.role==0?true:false;
  }
}
</script>
<style scoped="scoped">
	
	
	.tab_boxscs{
			float: left;
			border:1px solid #ECECEC;
			text-align: center;
			height:100%;
			padding: 0 30px;
			color: white;
			background:#0960E6;
	}
	.tab_boxsc{
		float: left;
		border:1px solid #ECECEC;
		text-align: center;
		height:100%;
		padding: 0 30px;
	}
	.tab_boxs{
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin:24px 0;
	}
	
	
	
	.btnsa{
		width: 123px;
		height: 41px;
		line-height: 40px;
		border-radius: 3px;
		background-color: rgba(251, 150, 44, 1);
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0);
		float: right;
		color: white;
		font-size:14px;
	}
		
</style>
