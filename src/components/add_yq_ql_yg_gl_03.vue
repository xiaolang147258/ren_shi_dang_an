<template>
	<!-- 员工详情 -->
  <div class="stu">
     
	 <el-dialog   v-loading="loading" :visible.sync="dialogVisible" width="35%" :close-on-click-modal='false' :before-close="handleClose" top='3vh'>
	     <p class="pbox" style="text-align: center;width:100%;font-size:23px;height:40px;">{{active?'修改员工信息':'新增员工信息'}} </p>
         
		 <div class="tabboxa">
			 <p><a>*</a>姓名</p><el-input v-model="value.name" class='tabboxright' placeholder="请输入" clearable ></el-input>
		 </div>
		 <div class="tabboxa">
		    <p><a>*</a>性别</p>
			<el-select class='tabboxright' filterable v-model="value.sex" clearable placeholder="请选择">
			    <el-option :label="'男'" :value="'1'"></el-option>
				<el-option :label="'女'" :value="'0'"></el-option>
			</el-select>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>身份证号码</p><el-input v-model="value.card" class='tabboxright' placeholder="请输入" clearable></el-input>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>家庭住址</p><el-input v-model="value.home_address" class='tabboxright' placeholder="请输入"></el-input>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>籍贯</p><el-input v-model="value.home_town" class='tabboxright' placeholder="请输入" clearable></el-input>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>手机号码</p><el-input type='number' v-model="value.phone" class='tabboxright' placeholder="请输入"  clearable></el-input>
		 </div>
		 <div class="tabboxa">
		    <p><a>*</a>政治面貌</p>
		 			<el-select class='tabboxright' filterable v-model="value.politic_id" clearable placeholder="请选择">
		 			    <el-option v-for='i in doc("POLITIC_S_T")' :label="i.label" :value="i.value"></el-option>
		 			</el-select>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>入职时间</p><el-date-picker v-model="value.entry_time" placeholder="请选择" class='tabboxright' value-format='yyyy-MM-dd' type="date" clearable></el-date-picker>
		 </div>
		 <div class="tabboxa">
		 	<p>职称</p><el-input v-model="value.job_title" class='tabboxright' placeholder="请输入"  clearable></el-input>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>工种</p><el-input v-model="value.work_type" class='tabboxright' placeholder="请输入"  clearable ></el-input>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>岗位状态</p>
		 			<el-select class='tabboxright' filterable v-model="value.position_status" clearable placeholder="请选择">
		 			    <el-option :label="'在职'" :value="'1'"></el-option>
						<el-option :label="'离职'" :value="'0'"></el-option>
		 			</el-select>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>是否贫困人口</p>
		 			<el-select class='tabboxright' filterable v-model="value.is_poor" clearable placeholder="请选择">
		 			    <el-option :label="'是'" :value="'1'"></el-option>
						<el-option :label="'否'" :value="'0'"></el-option>
		 			</el-select>
		 </div>
		 <div class="tabboxa">
		 	<p>脱贫属性</p>
		 			<el-select class='tabboxright' filterable v-model="value.poor_id" clearable placeholder="请选择">
		 			    <el-option v-for='i in doc("POOR_S_T")' :label="i.label" :value="i.value"></el-option>
		 			</el-select>
		 </div>
		 <div class="tabboxa">
		 	<p><a>*</a>是否服过兵役</p>
		 			<el-select class='tabboxright' filterable v-model="value.is_military" clearable placeholder="请选择">
		 			    <el-option :label="'是'" :value="'1'"></el-option>
		 			    <el-option :label="'否'" :value="'0'"></el-option>
		 			</el-select>
		 </div>
		 <div class="tabboxa">
		 	<p>毕业院校</p><el-input v-model="value.edu_list.graduate_school" class='tabboxright' placeholder="请输入"  clearable></el-input>
		 </div>
		 <div class="tabboxa">
		 	<p>毕业时间</p><el-date-picker v-model="value.edu_list.graduate_time" placeholder="请选择" class='tabboxright' value-format='yyyy-MM-dd' type="date" clearable></el-date-picker>
		 </div>
		 <div class="tabboxa">
		 	<p>专业</p><el-input v-model="value.edu_list.profession" class='tabboxright' placeholder="请输入"  clearable></el-input>
		 </div>
		 <div class="tabboxa" style="margin-bottom:45px;">
		 	<p><a>*</a>学历</p>
		 		<el-select class='tabboxright' filterable v-model="value.edu_list.edu_id" clearable placeholder="请选择">
		 			<el-option v-for='i in doc("EDU_S_T")' :label="i.label" :value="i.value"></el-option>
		 		</el-select>
		 </div>
	     <span style="width:200px;margin: 0 auto;">
	       <el-button @click="handleClose">取 消</el-button>
	       <el-button type="primary" @click="gitdelectact">确 定</el-button>
	     </span>
	 </el-dialog>
	 
<!-- 离职员工处理 -->	 
	 <el-dialog v-loading="loading" :visible.sync="dialogVisible2" width="35%" :close-on-click-modal='false' :before-close="handleClose2">
	     <p class="pbox" style="text-align: center;width:100%;font-size:23px;height:40px;">离职员工处理</p>
	     <div class="tabboxa">
	     	<p><a>*</a>离职时间</p><el-date-picker v-model="value2.turnover_time" placeholder="请选择" class='tabboxright' value-format='yyyy-MM-dd' type="date" clearable></el-date-picker>
	     </div>
	 	 <div class="tabboxa" style="height:120px;margin-bottom:57px;">
	 	 	<p><a>*</a>离职原因</p>
			<el-input v-model="value2.turnover_reason" show-word-limit maxlength="500" type="textarea" :rows="5" placeholder="请输入" class='tabboxright'></el-input>
	 	 </div>
	     <span style="width:200px;margin: 0 auto;">
	       <el-button @click="handleClose2">取 消</el-button>
	       <el-button type="primary" @click="git_lifn">确 定</el-button>
	     </span>
	 </el-dialog>
	 
	 
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'stu',
  components: {},//声明子组件
  computed:{
	  doc(){
	  		  return function(i){
	  			let a = [];
	  			for(let j=0;j<this.$store.state.suju_box.length;j++){
	  				if(this.$store.state.suju_box[j].type==i){
	  					a.push(this.$store.state.suju_box[j])
	  				}
	  			}
	  			return a;
	  		  }
	  },
	  docsa(){//通过id查询当前 名称
	  		return function(i){
	  			for(let j=0;j<this.$store.state.suju_box.length;j++){
	  				if(this.$store.state.suju_box[j].value==i){
	  					return this.$store.state.suju_box[j].label;
	  				}
	  			}
	  		}  
	  },
	  isNull(){//判断文本输入框是否为纯空格或者空
		return function( str ){
	      if ( str == "" ) return true;
	      var regu = "^[ ]+$";
	      var re = new RegExp(regu);//为空或纯空格为 true    有值为false
	      return re.test(str);
	     }
	  },
	  isChn(){//判断是否为纯中文
	    return function (str){
	        var reg=/^[\u4E00-\u9FA5]+$/;return reg.test(str)
	    }
	  },
	  isphone(){//手机号格式
	    return function (str){
	        var reg=/^1[3456789]\d{9}$/;return reg.test(str)
	    }
	  },
	  iscard(){//身份证号格式
	    return function (str){
	        var reg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
			return reg.test(str)
	    }
	  },
  },
  data(){
	  return {
		loading:false,
		btn_shou:false,
		dialogVisible: false,
		dialogVisible2:false,
		active:{},
		value:{
			          name:"",//姓名
					  sex:"",//性别
					  card:"",//身份证号码 (年龄和出生日期自动生成)
					  home_address:"",//家庭地址
					  home_town:"",//籍贯
					  phone:"",//联系电话
					  edu_id:"",//学历ID
					  politic_id:"",//政治面貌ID
					  entry_time:"",//进入企业时间
					  job_title:"",//职称
					  work_type:"",//工种
					  position_status:"",//岗位状态  1在职 0离职(退休也算离职)
					  is_poor:"",//是否贫困户   1是 0 否
					  poor_id:"",//脱贫属性ID
					  is_military:"",//是否服过兵役  1是 0否
					  company_id:"",//企业ID
					  company_name:"",//企业名称
					  edu_list:{//教育经历(多条)
						 graduate_school:"",//毕业院校
					     graduate_time:"",//毕业时间
					     profession:"",//专业
					     edu_id:"",//学历 
					  },
				        
		},
		value2:{
			          staff_id:"",//员工ID
					  company_id:"",//企业ID
					  company_name:"",//企业名称全称
					  turnover_reason:"",//离职原因	
					  turnover_time:"",//离职时间
					  entry_time:"",//进入企业时间
		}
		
	  }
  },
  methods:{
//新增或修改员工
	  git_fuchad(i){//获取父组件数据  打开弹窗
	      console.log(i);//
		  this.active = i;
		  
		  if(i){
			this.value = i;
			if(i.school[0]){
				this.value.edu_list=i.school[0];
				// if(i.school[0].graduate_school){this.value.edu_list.graduate_school=i.school[0].graduate_school;}
			 //    if(i.school[0].graduate_time){this.value.edu_list.graduate_time=i.school[0].graduate_time;}
				// if(i.school[0].profession){this.value.edu_list.profession=i.school[0].profession;}
				// if(i.school[0].edu_id){this.value.edu_list.edu_id=i.school[0].edu_id;}
			}
			
		    this.value.sex = this.value.sex+'';
			this.value.position_status = this.value.position_status+'';
			this.value.is_poor = this.value.is_poor+'';
			this.value.is_military = this.value.is_military+'';
		  }else{this.qin()}
	      this.dialogVisible=true;
	  },
	  gitdelectact(){//新增 修改用户数据
		       if(this.isNull(this.value.name)){this.$message({message:'请填写 姓名',type:'warning'});return false}else{};
			   if(this.isChn(this.value.name)){}else{this.$message({message:'姓名 必须为纯中文格式',type:'warning'});return false};
		       if(this.value.sex){}else{this.$message({message:'请选择 性别',type:'warning'});return false};
			   if(this.isNull(this.value.card)){this.$message({message:'请填写 身份证号',type:'warning'});return false}else{};
			   if(this.iscard(this.value.card)){}else{this.$message({message:'身份证号 格式不正确',type:'warning'});return false};
			   if(this.isNull(this.value.home_address)){this.$message({message:'请填写 家庭地址',type:'warning'});return false}else{};
			   if(this.isChn(this.value.home_address)){}else{this.$message({message:'家庭地址 必须为纯中文格式',type:'warning'});return false};
			   if(this.isNull(this.value.home_town)){this.$message({message:'请填写 籍贯',type:'warning'});return false}else{};
			   if(this.isChn(this.value.home_town)){}else{this.$message({message:'籍贯 必须为纯中文格式',type:'warning'});return false};
			   if(this.isNull(this.value.phone)){this.$message({message:'请填写 手机号码',type:'warning'});return false}else{};
			   if(this.isphone(this.value.phone)){}else{this.$message({message:'手机号 格式不正确',type:'warning'});return false};
			   if(this.value.politic_id){}else{this.$message({message:'请选择 政治面貌',type:'warning'});return false};
			   if(this.value.entry_time){}else{this.$message({message:'请选择 入职时间',type:'warning'});return false};
			   if(this.isNull(this.value.work_type)){this.$message({message:'请填写 工种',type:'warning'});return false}else{};
			   if(this.isChn(this.value.work_type)){}else{this.$message({message:'工种 必须为纯中文格式',type:'warning'});return false};
			   if(this.value.position_status){}else{this.$message({message:'请选择 岗位状态',type:'warning'});return false};
			   if(this.value.is_poor){}else{this.$message({message:'请选择 是否贫人口',type:'warning'});return false};
			   if(this.value.is_military){}else{this.$message({message:'请选择 是否服过兵役',type:'warning'});return false};
			   if(this.value.edu_list.edu_id){}else{this.$message({message:'请选择 学历',type:'warning'});return false};
				this.value.company_id = localStorage.uid;
				this.value.company_name = localStorage.company;
				this.value.edu_id = this.value.edu_list.edu_id;
				let urls = this.active?'/pm/staff_info/modify_staff':'/pm/staff_info/insert_staff';
				$.ajax({url:urls,type:'post',data:this.value,dataType:'json',success:(res)=> {
					if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
					      console.log(res,'新增修改数据');
					      if(res.code==200){
							this.dialogVisible = false;
							this.$parent.git_active();
							this.$message({message:'操作成功',type:'success'})
							this.qin();
						  }else{
							this.$message({message:res.msg,type:'warning'})
						  }
					}
				})
	  },
	  qin(){
		  this.value={
		  		          name:"",//姓名
		  				  sex:"",//性别
		  				  card:"",//身份证号码 (年龄和出生日期自动生成)
		  				  home_address:"",//家庭地址
		  				  home_town:"",//籍贯
		  				  phone:"",//联系电话
		  				  edu_id:"",//学历ID
		  				  politic_id:"",//政治面貌ID
		  				  entry_time:"",//进入企业时间
		  				  job_title:"",//职称
		  				  work_type:"",//工种
		  				  position_status:"",//岗位状态  1在职 0离职(退休也算离职)
		  				  is_poor:"",//是否贫困户   1是 0 否
		  				  poor_id:"",//脱贫属性ID
		  				  is_military:"",//是否服过兵役  1是 0否
		  				  company_id:"",//企业ID
		  				  company_name:"",//企业名称
		  				  edu_list:{//教育经历(多条)
		  					 graduate_school:"",//毕业院校
		  				     graduate_time:"",//毕业时间
		  				     profession:"",//专业
		  				     edu_id:"",//学历 
		  				  },
				    }
	  },
	  
	  handleClose(done){//监测用户点击x
	     this.$confirm('确定取消关闭吗？', '提示', {
	               confirmButtonText:'确定',
	               cancelButtonText:'取消',
	               type: 'warning'
	     }).then(() => {this.$parent.git_active();;this.dialogVisible = false;}).catch(() => {});
	  },


//离职处理
	  git_fuchad2(i){//获取父组件数据  打开弹窗
	      console.log(i);
	      this.dialogVisible2=true;
	  	  this.active = i;
	  },
	  handleClose2(done){//监测用户点击x
	     this.$confirm('确定取消关闭吗？', '提示', {
	               confirmButtonText:'确定',
	               cancelButtonText:'取消',
	               type: 'warning'
	     }).then(() => {this.$parent.git_active();;this.dialogVisible2 = false;}).catch(() => {});
	  },
	  git_lifn(){//离职处理
		       if(this.value2.turnover_time){}else{this.$message({message:'请选择 离职时间',type:'warning'});return false};
		       if(this.value2.turnover_reason){}else{this.$message({message:'请填写 离职原因',type:'warning'});return false};
		       				this.value2.company_id = localStorage.uid;
		       				this.value2.company_name = localStorage.company;
		       				this.value2.staff_id = this.active.id;
		       				this.value2.entry_time = this.active.entry_time;
				let urls = '/pm/retire_staff/insert_retire_staff';
				$.ajax({url:urls,type:'post',data:this.value2,dataType:'json',success:(res)=> {
					if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
					      console.log(res,'离职处理');
					      if(res.code==200){
							this.dialogVisible2 = false;
							this.$parent.git_active();
							this.$message({message:'操作成功',type:'success'});
							this.value2={
									          staff_id:"",//员工ID
											  company_id:"",//企业ID
											  company_name:"",//企业名称全称
											  turnover_reason:"",//离职原因	
											  turnover_time:"",//离职时间
											  entry_time:"",//进入企业时间
							}
						  }else{
							this.$message({message:res.msg,type:'warning'})
						  }
					}
				})
	  },
  },
  mounted(){
	
	  
  }
}
</script>
<style scoped="scoped">
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
</style>
