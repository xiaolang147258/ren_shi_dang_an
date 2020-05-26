<template>
  
  <div class="stu" style="position: relative;">
	  <topBox></topBox>
	 <div class="stus">
       <div style="width: 100%;height:56px;line-height:56px;margin-bottom:28px;margin-top:36px;">
		     <img v-if="$route.query.id.logo!=''" :src="$route.query.id.logo" style="width:56px;height:56px;float:left;margin-right:17px;border-radius:50%;" alt="">
			 <img v-else src="../../assets/img/ICON/PC/_20200217151132.png" style="width:56px;height:56px;float:left;margin-right:17px;border-radius:50%;" alt="">
       		 <p style="font-size:28px;font-weight:600;float:left;margin-right:30px;">{{$route.query.id.company_name}}</p>
			 
			 <el-input clearable @keyup.enter.native="git_active" style="width:302px;float:left;margin-top:10px;" placeholder="用户名称" v-model="keyword" class="input-with-select">
			     <el-button @click='git_active' slot="append" icon="el-icon-search"></el-button>
			 </el-input>
			 <!-- <el-input class='lef' placeholder="姓名查询" v-model="keyword" clearable style='width:140px;'></el-input> -->
			 <!-- <el-button @click='git_active' class="lef" style="margin-top:7px;" type="success">查询</el-button> -->
			  <el-button @click='fan' style="float:right;margin-top:14px;" type="primary">返回</el-button>
       </div>
	   <el-table v-loading='loading' :data="tableData" width='100%' height='561' stripe style="width: 100%" :height='670'>
	     <el-table-column header-align='center' align='center' prop="name" label="姓名" ></el-table-column>
	     <el-table-column header-align='center' align='center' prop="name" label="性别" >
			 <template slot-scope="scope">{{scope.row.sex==1?'男':'女'}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="birth_day" label="出生年月" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="age" label="年龄" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="phone" label="联系电话" width='120'></el-table-column>
		 <el-table-column header-align='center' align='center' prop="home_address" label="家庭地址" show-overflow-tooltip></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="学历" >
			 <template slot-scope="scope">{{docsa(scope.row.school[0].edu_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="政治面貌" >
			 <template slot-scope="scope">{{docsa(scope.row.politic_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="work_type" label="工种" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="是否贫困人口" >
			 <template slot-scope="scope">{{scope.row.is_poor==1?'是':'否'}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="脱贫属性" >
			 <template slot-scope="scope">{{docsa(scope.row.poor_id)}}</template>
		 </el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="是否服过兵役" >
			 <template slot-scope="scope">{{scope.row.is_military==1?'是':'否'}}</template>
		 </el-table-column>
	     <el-table-column header-align='center' align='center' label="操作" >
	   			  <template slot-scope="scope">
	   				<el-button @click='xiang(scope.row)' type="text" size="small">详情</el-button>
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
	<div class="boxbom">园区人事档案信息平台</div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import topBox from '@/components/top_box.vue' 
import jianact from '@/components/jian_act.vue' 
import $ from 'jquery'
export default {
  name: 'stu',
  components: {topBox,jianact},//声明子组件
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
		recru:'',//搜索条件
		totals:0,
		tab_num:0,
		loading:false,
		active:[],
		pages:1,
		size:10,
		ye_s:[15,20],
		tableData:[],
		keyword:'',
	  }
  },
  methods:{
	  xiang(i){
		this.$refs.child.git_act(i);  
	  },
	  fan(){
		this.$router.go(-1);//返回上一层
	  },
	  
	 git_active(){//获取数据列表
	    this.loading = true;
		$.ajax({url:'/pm/staff_info/get_statff_list',type:'post',
		     data:{
				company_id:this.$route.query.id.company_id,
				page:this.pages,
				size:this.size,
				keyword:this.keyword
			 },
			 dataType:'json',success:(res)=> {
			if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
			      if(res.code==200){
					 this.tableData = res.data;
					 this.totals = res.count;
				  }else{}
				  console.log(res,'列表数据');
				  this.loading = false;
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
  },
  mounted(){
	  //this.$route.query.id
	  console.log(this.$route.query.id,'顶部数据');
	  this.git_active();
	  
  }
}
</script>
<style scoped="scoped">
	.stus{
		width: 1402px;
		height: 789px;
		margin:0 auto;
	}
	.boxbom{
		width: 100%;
		height:50px;
		line-height: 50px;
		text-align: center;
		font-size:12px;
		color: #999999;
		float:left;
		background-color: #E0E0E0;
		margin-top:100px;
	}
	.lef{
		float:left;
		margin-left:10px;
	}
</style>
