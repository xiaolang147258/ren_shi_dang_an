<template>
	<!-- 离职管理 -->
  <div class="stu" style="position: relative;">
       <div style="width: 100%;height:56px;border-bottom:1px solid #ECECEC;">
       		 <p style="font-size:28px;font-weight:600;float:left;">离职管理</p>
			 <el-button @click='git_fuchad2("",false)' type="primary" style="float:right;">新增离职员工</el-button>
       </div>
	   
	   <el-table v-loading='loading' :data="tableData" width='100%' height='561' stripe style="width: 100%" :height='670'>
	     <el-table-column header-align='center' align='center' prop="name" label="姓名" ></el-table-column>
	     <el-table-column header-align='center' align='center' prop="work_type" label="工种" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="入职时间">
			  <template slot-scope="scope">{{scope.row.entry_time.substr(0,10)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="离职时间">
			  <template slot-scope="scope">{{scope.row.turnover_time.substr(0,10)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="turnover_reason" show-overflow-tooltip label="离职原因"></el-table-column>
	     <el-table-column header-align='center' align='center' label="操作" >
	   			  <template slot-scope="scope">
	   				<el-button @click='min(scope.row)' type="text" size="small">详情</el-button>
					<el-button @click='git_fuchad2(scope.row,true)' type="text" size="small" style="color:#FF4949;">修改</el-button>
	   			  </template>
	     </el-table-column>
	   </el-table>
	   <jianact ref='child'></jianact>
	  <!-- 分页 -->
         <el-pagination v-show='totals>10' style='margin-top:25px;' background @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :page-sizes="ye_s"
         :page-size="size"
         layout="total, sizes, prev, pager, next, jumper"
         :total="totals">
         </el-pagination>
		 
		 <el-dialog v-loading="loading" :visible.sync="dialogVisible2" width="35%" :close-on-click-modal='false' :before-close="handleClose">
		     <p class="pbox" style="text-align: center;width:100%;font-size:23px;height:40px;">{{act_yuan?'修改离职员工信息':'新增离职员工信息'}} </p>
			 <div v-show="!act_yuan" class="tabboxa">
			 	<p><a>*</a>离职员工</p>
			 			<el-select class='tabboxright' filterable v-model="value.staff_id" clearable placeholder="请选择">
			 			    <el-option v-for='(i,index) in tabzaibox' :label="i.name" :value="i.id"></el-option>
			 			</el-select>
			 </div>
		     <div class="tabboxa">
		     	<p><a>*</a>离职时间</p><el-date-picker v-model="value.turnover_time" placeholder="请选择" class='tabboxright' value-format='yyyy-MM-dd' type="date" clearable></el-date-picker>
		     </div>
		 	 <div class="tabboxa" style="height:120px;margin-bottom:57px;">
		 	 	<p><a>*</a>离职原因</p>
		 			<el-input v-model="value.turnover_reason" show-word-limit maxlength="500" type="textarea" :rows="5" placeholder="请输入" class='tabboxright'></el-input>
		 	 </div>
		     <span style="width:200px;margin: 0 auto;">
		       <el-button @click="handleClose">取 消</el-button>
		       <el-button type="primary" @click="git_put">确 定</el-button>
		     </span>
		 </el-dialog>
		 
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery'
import jianact from '@/components/jian_act.vue'
export default {
  name: 'stu',
  components: {jianact},//声明子组件
  computed:{
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
	  isNull(){//判断文本输入框是否为纯空格或者空
	  	return function( str ){if ( str == "" ) return true;
	      var regu = "^[ ]+$";
	      var re = new RegExp(regu);
	      return re.test(str);//为空或纯空格为 true  有值为false
	     }
	  },
  },
  data(){
	  return {
		recru:'',//搜索条件
		totals:0,
		tab_num:0,
		loading:false,
		active:[],
		pages:1,
		size:10,
		ye_s:[10,15,20],
		dialogVisible2:false,
		act_yuan:false,
		value:{
			          staff_id:'',//员工ID
					  company_id:'',//企业ID
					  company_name:'',//企业名称全称
					  turnover_reason:'',//离职原因	
					  turnover_time:'',//离职时间
		},
		tableData:[],
		tabzaibox:[],
		
	  }
  },
  methods:{
	  min(i){
		this.$refs.child.git_act(i);
	  },
	  
	 git_active(){//获取数据列表
	    this.loading = true;
		$.ajax({url:'/pm/retire_staff/retire_staff_list',type:'post',
		     data:{
				company_id:localStorage.uid,
				page:this.pages,
				size:this.size
			 },
			 dataType:'json',success:(res)=> {
			if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
			      if(res.code==200){
					 this.tableData = res.data;
					 this.totals = res.count;
				  }else{this.active = []}
				  console.log(res,'离职列表')
				  this.loading = false;
			}
		})
	 },
	 git_acts(){//获取在职员工列表
	 		$.ajax({url:'/pm/retire_staff/get_all_staff',type:'post',
	 		     data:{
	 				company_id:localStorage.uid
	 			 },
	 			 dataType:'json',success:(res)=> {
	 			if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
	 			      if(res.code==200){
	 					 this.tabzaibox = res.data;
	 				  }else{this.active = []}
	 				  console.log(res,'在职列表')
	 			}
	 		})
	 },
	 qin(){
		this.value={
			          staff_id:'',//员工ID
					  company_id:'',//企业ID
					  company_name:'',//企业名称全称
					  turnover_reason:'',//离职原因	
					  turnover_time:'',//离职时间
		            } 
	 },
	 git_put(){//新增修改离职原因
	       if(this.act_yuan){this.value.staff_id = this.value.id}
	       if(this.value.staff_id){}else{this.$message({message:'请选择 离职员工',type:'warning'});return false};
		   if(this.value.turnover_time){}else{this.$message({message:'请选择 离职时间',type:'warning'});return false};
		   if(this.isNull(this.value.turnover_reason)){this.$message({message:'请填写 离职原因',type:'warning'});return false}else{};
		   this.value.company_id=localStorage.uid;
		   this.value.company_name = localStorage.company;
	       let urls =  this.act_yuan?'/pm/retire_staff/modify_retire_staff':'/pm/retire_staff/insert_retire_staff';
		   $.ajax({url:urls,type:'post',data:this.value,
		   	 dataType:'json',success:(res)=> {
		   	if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		   	      if(res.code==200){
		   			 this.$message({message:'操作成功',type:'success'})
					 this.dialogVisible2 = false;
					 this.git_active();
					 this.qin();
		   		  }else{this.active = []}
		   	}
		   })
	 },
	 
	 handleSizeChange(val) {
	   console.log(`每页 ${val} 条`);
	 	this.size = val;//每页条数
	 	this.git_active();//获取数据
	 },
	 handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
			this.pages = val;
			this.git_active();
	 },
	
//离职处理
		  git_fuchad2(i,num){//
		  	  this.act_yuan = num;
			  if(num){this.value = i;console.log(this.value)}
		      this.dialogVisible2=true;
		  },
		  handleClose(done){//监测用户点击x
		     this.$confirm('确定取消关闭吗？', '提示', {
		               confirmButtonText:'确定',
		               cancelButtonText:'取消',
		               type: 'warning'
		     }).then(() => {this.dialogVisible2 = false;this.qin();this.git_acts()}).catch(() => {});
		  },
  },
  mounted(){
	  this.indexof(this.$router.options.routes[1].children,'离职管理');
	  this.git_active();
	  this.git_acts();
  }
}
</script>
<style scoped="scoped">
	.pbox{
		width:10%;
		text-align:right;
		height:26px;
		margin-bottom:45px;
		font-size:18px;
		color:#000101;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-family:Source Han Sans CN;
		font-weight:600;
	}
	.tabboxa{
		width:457px;
		height:45px;
		line-height:45px;
		margin: 0 auto;
		margin-bottom:13px;
		font-size:14px;
		color:#666666;
	}
	.tabboxa p{
		width:100px;
		float:left;
		text-align: right;
	}
	.tabboxa a{
		color: red;
	}
	.tabboxright{
		float: right;
		width:330px;
	}
</style>
