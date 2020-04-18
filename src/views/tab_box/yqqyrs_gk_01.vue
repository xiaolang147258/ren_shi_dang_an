<template>
  <div class="stu" style="position: relative;">
       <div style="width: 100%;height:56px;border-bottom:1px solid #ECECEC;">
       		 <p style="font-size:28px;font-weight:600;float:left;">园区企业人事概况</p>
			 <el-input style="width:302px;float:right;margin-right: 14px;" placeholder="请输入内容" v-model="recru" class="input-with-select">
			     <el-button @click='git_active' slot="append" icon="el-icon-search"></el-button>
			 </el-input>
       </div>
	   
	   <el-table v-loading='loading' :data="tableData" width='100%' height='561' stripe style="width: 100%" :height='670'>
	     <el-table-column header-align='center' align='center' prop="company_name" label="企业名称" ></el-table-column>
	     <el-table-column header-align='center' align='center' prop="position_num" label="在职人数" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="poor_num" label="贫困人数" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="politic_num" label="党员人数" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="military_num" label="退役军人数" ></el-table-column>
		 <!-- <el-table-column header-align='center' align='center' prop="name" label="更新时间" ></el-table-column> -->
	     <el-table-column header-align='center' align='center' label="操作" >
	   			  <template slot-scope="scope">
	   				<el-button @click='min(scope.row)' type="text" size="small">明细</el-button>
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
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery'
export default {
  name: 'stu',
  components: {},//声明子组件
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
		tableData:[],
	  }
  },
  methods:{
	  
	  min(i){//点击明细
		this.$router.push({path:'/yqqyrs_gk_01_xiang',query:{id:i}});
	  },
	  
	 git_active(){//获取数据列表
	    this.loading = true;
		$.ajax({url:'/pm/park_manage/park_company_list',type:'post',
		     data:{
				keyword:this.recru,
				page:this.pages,
				size:this.size
			 },
			 dataType:'json',success:(res)=> {
			if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
			      if(res.code==200){
					 this.tableData = res.data;
					 this.totals = res.count;
				  }else{}
				  console.log(res,'概况')
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
	  this.indexof(this.$router.options.routes[1].children,'园区企业人事概况');
	  this.git_active();
  }
}
</script>
<style scoped="scoped">
	
</style>
