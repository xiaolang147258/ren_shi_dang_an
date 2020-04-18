<template>
  <div class="stu" style="position: relative;">
       <div style="width: 100%;height:56px;border-bottom:1px solid #ECECEC;">
       		 <p style="font-size:28px;font-weight:600;float:left;">园区企业人事概况</p>
			 <el-input style="width:302px;float:right;margin-right: 14px;" placeholder="请输入内容" v-model="recru" class="input-with-select">
			     <el-button slot="append" icon="el-icon-search"></el-button>
			 </el-input>
       </div>
	   
	   <el-table v-loading='loading' :data="tableData" width='100%' height='561' stripe style="width: 100%" :height='670'>
	     <el-table-column header-align='center' align='center' prop="name" label="企业名称" ></el-table-column>
	     <el-table-column header-align='center' align='center' prop="name" label="在职人数" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="贫困人数" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="党员人数" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="退役军人数" ></el-table-column>
		 <el-table-column header-align='center' align='center' prop="name" label="更新时间" ></el-table-column>
	     <el-table-column header-align='center' align='center' label="操作" >
	   			  <template slot-scope="scope">
	   				<el-button type="text" size="small">明细</el-button>
	   			  </template>
	     </el-table-column>
	   </el-table>
	  
	  <!-- 分页 -->
         <el-pagination style='margin-top:25px;' background @size-change="handleSizeChange"
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
		ye_s:[15,20],
		tableData:[{name:'名字'},{name:'名字'},{name:'名字'},{name:'名字'},{name:'名字'},{name:'名字'},{name:'名字'},{name:'名字'},{name:'名字'},{name:'名字'}],
	  }
  },
  methods:{
	  go_act(i){//查看详情
		this.$router.push({path:'/re_active2',query:{id:i.jid}});
	  },
	  
	  
	  // to_top(i,num){//置顶
		 //      this.loading = true;
			//   let urla = num==0?'/zp/job/cancel_job':'/zp/job/top_job';
		 //      $.ajax({url:this.$store.state.urls+urla,type:'post',
		 //      data:{jid:i.jid},
		 //      dataType:'json',success:(res)=> {
		 //      	if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		 //      	      if(res.code==200){
		 //      			  this.$message({message: '操作成功',type: 'success'});
		 //      			  this.loading = false;
		 //      			  this.git_active(this.pages,this.tab_num==1?3:2);
		 //      		  }else{this.loading = false;}
		 //      		  console.log(res)
		 //      	}
		 //      })
	  // },
	  
	 //  hui_fn(i){
		// this.$confirm('确定恢复 '+i.station_arr.value+' 吗?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
		//   }).then(()=>{
		// 	  this.revoke_job_fn(i,2);
		//   }).catch(()=>{});  
	 //  },
	 
	 git_active(){//获取数据列表
	    this.loading = true;
		$.ajax({url:this.$store.state.urls+'/zp/job/query_job',type:'post',
		     data:{
				uid:localStorage.uid,
				page:this.pages,
				size:this.size
			 },
			 dataType:'json',success:(res)=> {
			if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
			      if(res.code==200){
					 this.active = res.data;
					 this.totals = res.count;
					this.loading = false;
				  }else{this.loading = false;this.active = []}
				  console.log(res)
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
	  
  }
}
</script>
<style scoped="scoped">
	
</style>
