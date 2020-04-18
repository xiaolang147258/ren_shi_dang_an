<template>
	<!-- 园区企业人事列表 -->
  <div class="stu" style="position: relative;">
       <div style="width: 100%;height:56px;border-bottom:1px solid #ECECEC;line-height:56px;">
       		<el-select class='lef' filterable v-model="value.sex" clearable placeholder="性别" style='width:80px;'>
       		    <el-option :label="'男'" :value="'1'"></el-option>
       			<el-option :label="'女'" :value="'0'"></el-option>
       		</el-select>
       		<el-input class='lef' type='number' min='0' placeholder="年龄" v-model="value.age_min" clearable style='width:90px;'></el-input>
       		<el-input class='lef' type='number' min='0' placeholder="年龄" v-model="value.age_max" clearable style='width:90px;'></el-input>
       		<el-date-picker v-model="value.entry_time_start" placeholder="入职时间" style='width:140px;' class='lef' value-format='yyyy-MM-dd' type="date" clearable></el-date-picker>
       		
       		<el-select v-model="value.edu_id" class='lef' filterable clearable placeholder="学历" style='width:80px;'>
       		    <el-option v-for='i in doc("EDU_S_T")' :label="i.label" :value="i.value"></el-option>
       		</el-select>
       		<el-select v-model="value.politic_id" class='lef' filterable clearable placeholder="是否党员" style='width:110px;'>
       		    <el-option :label="'是'" :value="'13'"></el-option>
       			<el-option :label="'否'" :value="'0'"></el-option>
       		</el-select>
       		<el-select v-model="value.is_poor" class='lef' filterable clearable placeholder="是否贫困户" style='width:120px;'>
       		    <el-option :label="'是'" :value="'1'"></el-option>
       			<el-option :label="'否'" :value="'0'"></el-option>
       		</el-select>
			<el-select v-model="value.position_status" class='lef' filterable clearable placeholder="岗位状态" style='width:120px;'>
			    <el-option :label="'在职'" :value="'1'"></el-option>
				<el-option :label="'离职'" :value="'0'"></el-option>
			</el-select>
       		<el-input class='lef' placeholder="姓名查询" v-model="value.keyword" clearable style='width:140px;'></el-input>
       		<el-button @click='git_active' class="lef" style="margin-top:7px;" type="success">查询</el-button>
       </div>
	   
	   <el-table v-loading='loading' :data="tableData" width='100%' height='561' stripe style="width: 100%" :height='670'>
	     <el-table-column fixed header-align='center' align='center' prop="name" label="姓名" ></el-table-column>
	     <el-table-column header-align='center' align='center' prop="name" label="性别" >
			 <template slot-scope="scope">{{scope.row.sex==1?'男':'女'}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="birth_day" label="出生年月" width='120'></el-table-column>
		 <el-table-column header-align='center' align='center' prop="age" label="年龄" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="岗位状态" >
			 <template slot-scope="scope">{{scope.row.position_status==1?'在职':'离职'}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="phone" label="联系电话" width='120'></el-table-column>
		 <el-table-column header-align='center' align='center' prop="home_address" label="家庭地址" width='150' show-overflow-tooltip ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="学历" >
			 <template slot-scope="scope">{{docsa(scope.row.edu_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="政治面貌" >
			 <template slot-scope="scope">{{docsa(scope.row.politic_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="work_type" label="工种" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="是否贫困人口" >
			 <template slot-scope="scope">{{scope.row.is_poor==1?'是':'否'}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" width='120' label="脱贫属性" >
			 <template slot-scope="scope">{{docsa(scope.row.poor_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="是否服过兵役" >
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
		value:{
			sex:'',//性别
			age_min:'',//性别年龄区间之最小年龄
			age_max:'',//性别年龄区间之最大年龄
			entry_time_start:'',//性别进入企业时间之开始时间
			entry_time_end:'',//性别进入企业时间之结束时间
			edu_id:'',//性别学历ID
			politic_id:'',//性别政治面貌ID (是否党员，党员ID为13，非党员传空)
			is_poor:'',//性别是否贫困户 1是 0否
			keyword:'',//性别关键字
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
	  
	  min(i){//点击详情
		 this.$refs.child.git_act(i);  
	  },
	  
	 git_active(){//获取数据列表
	    this.loading = true;
		$.ajax({url:'/pm/park_manage/park_company_detail',type:'post',data:this.value,
			 dataType:'json',success:(res)=> {
			if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
			      if(res.code==200){
					 this.tableData = res.data;
					 this.totals = res.count;
				  }else{this.loading = false;}
				  console.log(res,'园区企业人事列表')
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
	  this.indexof(this.$router.options.routes[1].children,'园区企业人事列表');
	  this.git_active();
  }
}
</script>
<style scoped="scoped">
	.lef{
		margin-right:8px;
	}
</style>
