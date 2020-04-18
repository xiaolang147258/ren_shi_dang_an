import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  // urls:'http://2949d3408t.qicp.vip',//全局域名
	  urls:'',//全局域名
	  url_logo:'',
	  zhi_actsa:{},//职位详情
	  left_box_show:true,
	  zhao_num:0,//0=园区招聘管理 1=企业招聘管理 2=招聘信息管理
	  tab_cox:0,//table标识
	 
	 actionse:{//企业、全区信息
		 cid:'',
		 cname:'', //企业名称
		  trade:'',//所属行业
		  scale:'1',//公司规模
		  staffsize:'',// 人员规模
		  photo:[],// 相册
		  introduction:'',// 企业简介
		  welfare:'',// 企业福利
		  characteristics:'',// 企业特色
		  contactname:'',// 联系人
		  contactphone:'',// 联系电话
		  email:'',// 招聘邮箱
		  website:'',// 公司官网
		  longitude:'',// 公司纬度
		  latitude:'',//公司经度
		  address:'',//详细地址
		  logo:'',//企业头像路径
		  file_list:[],
	 },
	 
	  loading:false,
	  options_3: [],
	  num_box:[0],
	  num_s:0,
	  
	 suju_box:[],//数据字典集合
	  
  },
  mutations: {
	 
	  
  },
  actions: {
	  //获取园区信息
	  git_act(){
		      this.state.loading = true;
		  	$.ajax({url:'/zp/company/find_company',type:'post',data:{cid:localStorage.uid},dataType:'json',success:(res)=> {
		  		if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
		  		      if(res.code==200){
		  				 this.state.actionse = res.data;
		  				 this.state.actionse.trade=this.state.actionse.trade==0?'':this.state.actionse.trade;
		  				 this.state.actionse.staffsize=this.state.actionse.staffsize==0?'':this.state.actionse.staffsize;
						 if(this.state.actionse.logo){
							 this.state.actionse.logo = this.state.actionse.logo[0]=='/'?this.state.actionse.logo:'/'+this.state.actionse.logo;
						 }
		  				 if(typeof(this.state.actionse.photo)=='string'){
							 this.state.actionse.file_list = [];
		  					 this.state.actionse.photo = this.state.actionse.photo.split(",");
		  					 for(var i=0;i<this.state.actionse.photo.length;i++){
		  					 	if(this.state.actionse.photo[i]){
									let urla =this.state.actionse.photo[i][0]=='/'?this.state.actionse.photo[i]:'/'+this.state.actionse.photo[i];
		  					 		this.state.actionse.file_list.push({name:i,url:urla});
		  					 	}
		  					 }
		  				 }
		  				 console.log(this.state.actionse,'查询企业信息');
		  			  }
					  this.state.loading = false;
		  		}
		  	})
	  },
	  //获取数据字典 、、EDU_S_T 学历     POLITIC_S_T政治面貌   POOR_S_T 脱贫属性
	  git_suju(){
	  		  	$.ajax({url:'/pm/index/get_dictionary_data',type:'post',data:{},dataType:'json',success:(res)=> {
	  		  		if(Object.prototype.toString.call(res) != '[object Object]'){res = JSON.parse(res)}
	  		  		      if(res.code==200){
							  this.state.suju_box = res.data;
							  console.log(this.state.suju_box,'数据字典');
						  }
	  		  		}
	  		  	})
	  },
	  
	  
  },
  modules: {
	  
	  
  }
})
