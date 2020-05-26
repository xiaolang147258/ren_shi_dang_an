<template>
	<!-- 员工详情 -->
  <div class="stu">
	 <el-dialog v-loading="loading" :visible.sync="dialogVisible" width="52%" :before-close="handleClose" top='3vh'>
	   <p class="pbox" style="text-align: center;width:100%;font-size:30px;height:40px;">员工信息详情</p>
<p class="pbox"><a style="color:red;">*</a>基本信息</p>
	    <div style="width:100%;height:255px;margin-bottom:39px;">
		  <div style="width:50%;height:220px;float:left;">
				 <div class="tabbox">
					 <p>姓名</p><div style="width:27.5%;" class="pboxc1">{{active.name}}</div>
					 <p style="width:9%;">性别</p><div style="width:27.5%;" class="pboxc1">{{active.sex==1?'男':'女'}}</div>
				 </div>
				 <div class="tabbox">
				 	<p>出生年月</p><div style="width:27.5%;" class="pboxc1">{{active.birth_day}}</div>
				 	<p style="width:9%;">年龄</p><div style="width:27.5%;" class="pboxc1">{{active.age}}</div>
				 </div>
				 <div class="tabbox"><p>身份证号码</p><div class="pboxc1">{{active.card}}</div></div>
				 <div class="tabbox"><p>是否贫困人口</p><div class="pboxc1">{{active.is_poor==1?'是':'否'}}</div></div>
				 <div class="tabbox"><p>是否服过兵役</p><div class="pboxc1">{{active.is_military==1?'是':'否'}}</div></div>
		  </div>
		  <div style="width:50%;height:220px;float:right;">
			   <div class="tabbox">
				 <p>政治面貌</p><div style="width:27.5%;" class="pboxc1">{{docsa(active.politic_id)}}</div>
				 <p style="width:9%;">籍贯</p><div style="width:27.5%;" class="pboxc1">{{active.home_town}}</div>
			    </div>
				<div class="tabbox">
					<p>入职时间</p><div style="width:27.5%;" class="pboxc1">{{active.entry_time.substr(0,10)}}</div>
					<p style="width:9%;">职称</p><div style="width:27.5%;" class="pboxc1">{{active.job_title}}</div>
				 </div>
				 <div class="tabbox">
				 	<p>岗位状态</p><div style="width:27.5%;" class="pboxc1">{{active.position_status==1?'在职':'离职'}}</div>
				 	<p style="width:9%;">工种</p><div style="width:27.5%;" class="pboxc1">{{active.work_type}}</div>
				  </div>
				<div class="tabbox"><p>联系电话</p><div class="pboxc1">{{active.phone}}</div></div>
				<div class="tabbox"><p>脱贫属性</p><div class="pboxc1">{{docsa(active.poor_id)}}</div></div>
		  </div>
		  <div style="float:left;margin-top:10px;" class="tabbox">
			   <p style="width:9.7%;">家庭住址</p>
		       <div style="width:85.1%;" class="pboxc1">{{active.home_address}}</div>
		  </div>
		</div>
		
		
<p class="pbox"><a style="color:red;">*</a>教育经历</p>		 
		<div v-if="active.edu_list.length!=0" v-for='(i,index) in active.edu_list' style="width:100%;height:93px;margin-bottom:19px;">
		  <div style="width:50%;height:100%;float:left;">
				 <div class="tabbox"><p>毕业院校</p><div class="pboxc1">{{i.graduate_school}}</div></div>
				 <div class="tabbox"><p>毕业时间</p><div class="pboxc1">{{i.graduate_time}}</div></div>
		  </div>
		  <div style="width:50%;height:100%;float:right;">
				<div class="tabbox"><p>专业</p><div class="pboxc1">{{i.profession}}</div></div>
				<div class="tabbox"><p>学历</p><div class="pboxc1">{{docsa(i.edu_id)}}</div></div>
		  </div>
		</div>
	    <div v-show="active.edu_list.length==0" style="width:100%;height:93px;margin-bottom:19px;padding-top:30px;">
			<p style="font-size:14px;color:#666666;text-align:center;">暂时没有数据</p>
		</div>
		
<p class="pbox" style="margin-top:20px;"><a style="color:red;">*</a>工作经历</p>	  
	    <div v-if="active.work_list.length!=0" v-for='(i,index) in active.work_list' style="width:100%;height:133px;margin-bottom:15px;">
	      <div style="width:50%;height:100%;float:left;">
	    		 <div class="tabbox"><p>企业名称</p><div class="pboxc1">{{i.company_name}}</div></div>
	    		 <div class="tabbox"><p>入职时间</p><div class="pboxc1">{{i.entry_time.substr(0,10)}}</div></div>
	      </div>
	      <div style="width:50%;height:100%;float:right;">
	    		<div class="tabbox"><p>离职时间</p><div class="pboxc1">{{i.turnover_time.substr(0,10)}}</div></div>
	    		<div class="tabbox"><p>离职原因</p>
				<div style="height:90px;word-break:break-all;white-space:normal;padding-right:15px;overflow:auto;" class="pboxc1">{{i.turnover_reason}}</div></div>
	      </div>
	    </div>
		<div v-show="active.work_list.length==0" style="width:100%;height:133px;margin-bottom:19px;padding-top:30px;">
			<p style="font-size:14px;color:#666666;text-align:center;">暂时没有数据</p>
		</div>
		
<p class="pbox" style="margin-top:20px;"><a style="color:red;">*</a>奖惩情况</p>	  
	    <div v-if="active.rp_list.length!=0" v-for='(i,index) in active.rp_list' style="width:100%;height:123px;margin-bottom:10px;">
	      <div style="width:50%;height:100%;float:left;">
	    		 <div class="tabbox"><p>时间</p><div class="pboxc1">{{i.rp_time.substr(0,10)}}</div></div>
	    		 <div class="tabbox"><p>奖惩方式</p><div class="pboxc1">{{i.type==1?'奖励':'惩罚'}}</div></div>
	      </div>
	      <div style="width:50%;height:100%;float:right;">
	    		<div class="tabbox"><p>企业名称</p><div class="pboxc1">{{i.company_name}}</div></div>
	    		<div class="tabbox"><p>奖惩说明</p>
				<div style="height:60px;word-break:break-all;white-space:normal;padding-right:15px;overflow:auto;" class="pboxc1">{{i.desc}}</div></div>
	      </div>
	    </div>
		<div v-show="active.rp_list.length==0" style="width:100%;height:133px;padding-top:30px;">
			<p style="font-size:14px;color:#666666;text-align:center;">暂时没有数据</p>
		</div>
		<div style="width:100%;height:50px;margin-top:40px;">
	     <span style="width:200px;margin: 0 auto;">
	       <el-button @click="dialogVisible = false">取 消</el-button>
	       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
	     </span>
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
	  docsa(){
	  		return function(i){
	  			for(let j=0;j<this.$store.state.suju_box.length;j++){
	  				if(this.$store.state.suju_box[j].value==i){
	  					return this.$store.state.suju_box[j].label;
	  				}
	  			}
	  		}  
	  },
  },
  data(){
	  return {
		loading:false,
		btn_shou:false,
		dialogVisible: false,
		active:{
			        id:"",//员工ID
					name:"",//员工姓名
					sex:"",//性别
					card:"",//身份证号码
					birth_day:"",//出生日期
					age:"",//年龄
					phone:"",//联系电话
					home_address:"",//家庭地址
					home_town:"",//籍贯
					edu_id:"",//学历ID
					politic_id:"",//政治面貌ID
					job_title:"",//职称
					work_type:"",//工种
					position_status:"",//岗位状态
					entry_time:"",//进入企业时间
					turnover_time:"",//离职时间
					company_id:"",//企业ID
					company_name:"",//企业名称全称
					is_poor:"",//是否贫困户
					poor_id:"",//脱贫属性ID
					is_military:"",//是否服过兵役
					time:"",//此条记录更新时间
					edu_list:[
						{
							         id:"",//教育经历ID
									 staff_id:"",//员工ID
									 graduate_school:"",//毕业院校
									 graduate_time:"",//毕业时间
									 profession:"",//学历
									 edu_id:"",//学历ID
									 time:"",//此条记录更新时间
						}
					],
					work_list:[
						{
							            id:"",//工作经历ID
										staff_id:"",//员工ID
										entry_time:"",//进入企业时间
										turnover_time:"",//离职时间
										turnover_reason:"",//离职原因
										company_id:"",//企业ID
										company_name:"",//企业名称全称
										time:"",//此条记录更新时间
						}
					],
					rp_list:[
						{
							          id:"",//奖惩ID
									  rp_time:"",//奖惩时间
									  staff_id:"",//奖惩对象
									  company_id:"",//企业ID
									  company_name:"",//企业名称全称
									  type:"",//奖惩方式  1奖励  2惩罚
									  desc:"",//奖惩说明
									  time:"",//此条记录更新时间
						},
					  ],
		            },
	  }
  },
  methods:{
	  git_act(i){//获取数据的同打开狂口
	      console.log(i)
	      this.dialogVisible=true;
		  $.ajax({url:'/pm/staff_info/get_staff_detail',type:'post',data:{id:i.id},
		    dataType:'json',success:(res)=> {
		  	if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		  	  if(res.code==200){
		  		this.active = res.data;
				// if(this.active.edu_list.length!=0){this.edu_list = this.active.edu_list}
				// if(this.active.work_list.length!=0){this.work_list = this.active.work_list}
				// if(this.active.rp_list.length!=0){this.rp_list = this.active.rp_list}
				console.log(this.active,'员工详情')
		  	  }else{this.$message.error(res.msg)}
		  	}
		  })
	  },
	  handleClose(done){//监测用户点击x
	    this.dialogVisible = false;
	  },
  },
  mounted(){
	  
  }
}
</script>
<style scoped="scoped">
	
	.pboxc1{
		float:left;
		width:70%;
		height:30px;
		border:1px solid rgba(242,242,242,1);
		font-size:14px;color:#666666;
		padding-left:18px;
		text-align:left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.tabbox{
		width:100%;
		height:30px;
		line-height: 30px;
		margin-top:13px;
	}
	.tabbox p{
		font-size:14px;
		color:#000000;
		width:19.5%;
		text-align:right;
		margin-right:28px;
		float:left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-family:Source Han Sans CN;
	}
	.pbox{
		width:10%;
		text-align:right;
		height:26px;
		margin-bottom:20px;
		font-size:18px;
		color:#000101;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-family:Source Han Sans CN;
		font-weight:600;
	}
</style>
