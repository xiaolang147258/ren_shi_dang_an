<template>
	<!-- 首页 -->
  <div class="stu" style="position: relative;">
       <div style="width: 100%;height:70px;line-height:70px;" :style="{marginTop:!inpshow?tops:'0px'}">
		   <div :class="{inps:inpshow,inp:!inpshow}">
			   <div :class="{inp_chs:inpshow,inp_ch:!inpshow}">
				   <img src="../../assets/sou.png" alt="">
				   <input v-model="value.keyword" type="text"  @keyup.enter='sous' placeholder="关键字 : 姓名/家庭住址" >
			   </div>
			   <button @click="sous">搜索</button>
		   </div>
       </div>
	<div v-show="inpshow">
	   <el-table v-loading='loading' :data="tableData" width='100%' height='561' stripe style="width: 100%;margin-top:20px;" :height='630'>
	     <el-table-column fixed header-align='center' align='center' prop="name" label="姓名" ></el-table-column>
	     <el-table-column header-align='center' align='center' prop="name" label="性别" >
			 <template slot-scope="scope">{{scope.row.sex==1?'男':'女'}}</template>
		 </el-table-column>
		 <!-- <el-table-column header-align='center' align='center' prop="birth_day" label="出生年月" width='120'></el-table-column> -->
		 <el-table-column header-align='center' align='center' prop="age" label="年龄" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="岗位状态" >
			 <template slot-scope="scope">{{scope.row.position_status==1?'在职':'离职'}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="phone" label="联系电话" width='120'></el-table-column>
		 <!-- <el-table-column header-align='center' align='center' prop="home_address" label="家庭地址" width='150' show-overflow-tooltip ></el-table-column> -->
		 <el-table-column header-align='center' align='center' prop="name" label="学历" >
			 <template slot-scope="scope">{{docsa(scope.row.edu_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="政治面貌" >
			 <template slot-scope="scope">{{docsa(scope.row.politic_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="work_type" label="工种" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="贫困人口" >
			 <template slot-scope="scope">{{scope.row.is_poor==1?'是':'否'}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" width='120' label="脱贫属性" >
			 <template slot-scope="scope">{{docsa(scope.row.poor_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="服过兵役" >
			 <template slot-scope="scope">{{scope.row.is_military==1?'是':'否'}}</template>
		 </el-table-column>
	     <el-table-column fixed='right' header-align='center' align='center' label="操作" >
	   			  <template slot-scope="scope">
	   				<el-button @click='min(scope.row)' type="text" size="small">详情</el-button>
	   			  </template>
	     </el-table-column>
	   </el-table>
	  <!-- 分页 -->
         <el-pagination v-show='totals>10' style='margin-top:25px;' background @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :page-sizes="ye_s"
         :page-size="size"
         layout="total, sizes, prev, pager, next, jumper"
         :total="totals">
         </el-pagination>
	</div> 	 
		 <jianact ref="child"></jianact>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import jianact from '@/components/jian_act.vue' 
import $ from 'jquery'
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
	  docsa(){
	  		return function(i){
	  			for(let j=0;j<this.$store.state.suju_box.length;j++){
	  				if(this.$store.state.suju_box[j].value==i){
	  					return this.$store.state.suju_box[j].label;
	  				}
	  			}
	  		}  
	  },
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
	  }
  },
  data(){
	  return {
	    inpshow:false,
		tops:'300px',
		value:{
			sex:'',//性别
			age_min:'',//性别年龄区间之最小年龄
			age_max:'',//性别年龄区间之最大年龄
			entry_time_start:'',//性别进入企业时间之开始时间
			entry_time_end:'',//性别进入企业时间之结束时间
			edu_id:'',//性别学历ID
			politic_id:'',//性别政治面貌ID (是否党员，党员ID为13，非党员传空)
			is_poor:'',//性别是否贫困户 1是 0否
			keyword:'',//关键字
			position_status:'',//岗位状态 1在职 0离职
			company_id:'',//性别企业ID
			page:1,//性别分页参数
			size:10,//性别分页参数
		},
		recru:'',//搜索条件
		totals:0,
		tab_num:0,
		loading:false,
		active:[],
		pages:1,
		size:10,
		ye_s:[10,15,20],
		tableData:[],
	  }
  },
  methods:{
	  sous(){
		if(this.value.keyword){
			this.pages=1;
		    this.git_active();
			this.inpshow = true;
		}
	  },
	  min(i){//点击详情
		 this.$refs.child.git_act(i);  
	  },
	  
	 git_active(){//获取数据列表
	    this.loading = true;
		if(this.$route.query.id){this.value.company_id = this.$route.query.id.company_id}
		$.ajax({url:'/pm/park_manage/park_company_detail',type:'post',data:this.value,
			 dataType:'json',success:(res)=> {
			if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
			      if(res.code==200){
					 this.tableData = res.data;
					 this.totals = res.count;
				  }else{this.loading = false;}
				  console.log(res,'首页列表')
				  this.loading = false;
			}
		})
	 },
	  
	 handleSizeChange(val) {
	   console.log(`每页 ${val} 条`);
	 	this.value.size = val;//每页条数
	 	this.git_active();//获取数据
	 },
	 handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
			this.value.page = val;
			this.git_active();
	 },
	  
  },
  mounted(){
	  this.indexof(this.$router.options.routes[1].children,'首页');
	  // this.git_active();
  }
}
</script>
<style scoped="scoped">
	*:hover{
		cursor: pointer;
	}
	.inp_ch{
		width:706px;
		height:100%;
		border:2px solid rgba(205,205,205,1);
		border-right:none;
		padding: 16px 27px;
		float:left;
	}
	.inp_ch input{
		width:590px;
		height:100%;
		float:left;
		border: none;
		outline:none;
		font-size:30px;
		
	}
	.inp{
		width:857px;
		height: 100%;
		margin: 0 auto;
	}
	.inp button{
		float:right;
		border: none;
		outline:none;
		width:151px;
		height:70px;
		background:rgba(41,121,255,1);
		border-radius:2px;
		font-size:32px;
		color: #FFFFFF;
	}
	.inp img{
		float:left;
		width: 36px;
		height:36px;
		margin-right:20px;
	}
	
	.inp_chs{
		width:539px;
		height:100%;
		border:2px solid rgba(205,205,205,1);
		border-right:none;
		padding: 7px 15px;
		float:left;
	}
	.inp_chs input{
		width:400px;
		height:100%;
		float:left;
		border: none;
		outline:none;
		font-size:20px;
		::-webkit-input-placeholder { /* WebKit browsers */
			      color:#E6E6E6 }
			  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			      color: #E6E6E6 }
			  ::-moz-placeholder { /* Mozilla Firefox 19+ */
			      color: #E6E6E6 }
			  :-ms-input-placeholder { /* Internet Explorer 10+ */
			      color: #E6E6E6}
			  input:focus::-webkit-input-placeholder{ color:#E6E6E6;}
	}
	.inps{
		width:640px;
		height:40px;
		margin: 0 auto;
		margin-top:20px;
	}
	.inps button{
		float:right;
		border: none;
		outline:none;
		width:100px;
		height:40px;
		background:rgba(41,121,255,1);
		border-radius:2px;
		font-size:20px;
		color: #FFFFFF;
	}
	.inps img{
		float:left;
		width: 24px;
		height:24px;
		margin-right:15px;
	}
	
	
	
	
	.lef{
		margin-right:8px;
		float:left;
	}
</style>
