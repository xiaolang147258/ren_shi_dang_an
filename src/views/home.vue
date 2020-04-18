<template>
  <div class="stu" v-loading.fullscreen.lock="$store.state.loading" >
	 <topBox></topBox>
	 <div class="val_box">
		 <div class="box_left">
			 <div style="width:100%;min-height:139px;margin:10px auto;margin-bottom:41px;text-align: center;padding:0 10px;">
				 <img v-if="$store.state.actionse.logo" style="width:98px;height:99px;border-radius:50%;" :src="$store.state.actionse.logo" alt="">
				 <img v-else style="width:98px;height:99px;border-radius:50%;" src="../assets/img/ICON/PC/_20200217151132.png" alt="">
				 <p class="pee" style="">{{$store.state.actionse.cname}}</p>
			   <div class="btn_type">{{roles==1?'管理员':'企业'}}</div>
			</div>
			<div v-for='(i,index) in tabbox' @click="handleNodeClick(i,index)" :class="{tab_boxs:$store.state.tab_cox==index,tab_box:$store.state.tab_cox!=index}">{{i.label}}
			</div>
		 </div>
		 <div class="box_right"><router-view></router-view></div>
	 </div>
	 
	 <div class="boxbom">园区人事档案信息平台</div>
  </div>
</template>

<script>
import topBox from '@/components/top_box.vue' 

export default {
  name: 'stu',
  components: {topBox},//声明子组件
  computed:{
	 roles(){return localStorage.role},
	 company(){return localStorage.company},//名称
	 urlogo(){return localStorage.urlss},
	 tabbox(){return this.$router.options.routes[1].children},
	 indef(){
		 return function(j){
			 let box = this.$router.options.routes[1].children;
			 let a = false
			 for(var i=0;i<box.length;i++){
				 if(box[i].label == j){
					 a = i
					 break
				 }
			 }
			 return a
		 }
	 },
	 
  },
  data(){
	  return {
		
	  }
  },
  methods:{
	  // handleNodeClick(data,node,item){
	  // 		this.$router.push({path:data.path,query:{num:data.num}});
	  // 		if(data.children){this.$store.state.num_box[0] = data.num}else{this.$store.state.num_s = data.num;}
	  // },
	  handleNodeClick(data,index){
		 this.$router.push({path:data.name});
	  },
	 
  },
  mounted(){
	this.$store.dispatch("git_act");//调用全局方法--获取企业数据 
	this.$store.dispatch("git_suju");//调用全局方法--获取数据字典
	if(this.roles==1||this.roles==0){//管理员权限
	   if(this.indef('企业员工管理')){
		   this.tabbox.splice(this.indef('企业员工管理'),1);
	   }
	}else{//企业权限
	   console.log(1)
	  
		this.tabbox.splice(this.indef('用户管理'),1);
	    this.tabbox.splice(this.indef('园区员工管理'),1); 
		this.tabbox.splice(this.indef('园区企业人事列表'),1); 
		this.tabbox.splice(this.indef('园区企业人事概况'),1); 
	  
	}
	 if(localStorage.ad ==1){
		 window.location.reload();
		 localStorage.ad =2
	 }
  }
}
</script>
<style scoped="scoped">
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
	.pee{
		font-size:16px;
		font-weight:600;width:100%;text-align:center;
		margin: 10px 0;
		  /* overflow: hidden; */
		  /* text-overflow:ellipsis; */
		  /* white-space: nowrap; */
	}
	.box_right{
		width: 1130px;
		height: 789px;
		/* background:#3A8EE6; */
		float: right;
		/* padding-bottom: 94px; */
		
	}
	.btn_type{
		width:45px;
		height: 18px;
		line-height: 17px;
		border-radius: 3px;
		background-color: rgba(9, 96, 230, 1);
		color: rgba(255, 255, 255, 1);
		font-size: 12px;
		text-align: center;
		font-family: Roboto;
		border: 1px solid rgba(255, 255, 255, 0);
		margin: 0 auto;
		/* margin-top: 5px; */
	}
	.tab_box{
		width: 100%;
		height: 43px;
		line-height: 43px;
		text-align: center;
		font-size: 14px;
		margin-bottom:10px;
	}
	.tab_boxs{
		width: 100%;
		height: 43px;
		line-height: 43px;
		text-align: center;
		font-size: 14px;
		margin-bottom:10px;
		background: white;
		border-left:4px solid #0960E6;
	}
	.box_left{
		width: 249px;
		height: 789px;
		background-color: rgba(247, 247, 247, 1);
		text-align: center;
		border: 1px solid rgba(255, 0, 0, 0);
		float:left;
		padding: 30px 0;
	}
	.val_box{
		width: 1401px;
		/* height:789px; */
		margin: 0 auto;
		/* background: #66B1FF; */
		margin-top: 50px;
	}
	
</style>
