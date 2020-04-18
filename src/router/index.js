import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
//登录  
  {
    path: '/',
    name: 'login',
    component: () => import('../views/logins/login_stu.vue')
  },

//首页 
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
	children:[
		{
		 label:'用户管理',
		 path: '/User_Management',
		 name: 'User_Management',
		 component: () => import('../views/tab_box/User_Management.vue'),
		},
		
		{
		 label:'园区企业人事概况',
		 path: '/yqqyrs_gk_01',
		 name: 'yqqyrs_gk_01',
		 component: () => import('../views/tab_box/yqqyrs_gk_01.vue'),
		},
		
		{
		 label:'园区企业人事列表',
		 path: '/yqqyrs_lb_02',
		 name: 'yqqyrs_lb_02',
		 component: () => import('../views/tab_box/yqqyrs_lb_02.vue'),
		},

		{
		 label:'园区员工管理',
		 path: '/yq_ql_yg_gl_03',
		 name: 'yq_ql_yg_gl_03',
		 component: () => import('../views/tab_box/yq_ql_yg_gl_03.vue'),
		},
		{
		 label:'企业员工管理',
		 path: '/yq_ql_yg_gl_03',
		 name: 'yq_ql_yg_gl_03',
		 component: () => import('../views/tab_box/yq_ql_yg_gl_03.vue'),
		},
		
		{
		 label:'离职管理',
		 path: '/lz_gl_04',
		 name: 'lz_gl_04',
		 component: () => import('../views/tab_box/lz_gl_04.vue'),
		},
		{
		 label:'奖励管理',
		 path: '/jl_gl_05',
		 name: 'jl_gl_05',
		 component: () => import('../views/tab_box/jl_gl_05.vue'),
		},
		{
		 label:'惩罚管理',
		 path: '/cf_gl_06',
		 name: 'cf_gl_06',
		 component: () => import('../views/tab_box/cf_gl_06.vue'),
		},
		
	]
  },
  
  
  {
	label:'园区企业人事概况明细',
    path: '/yqqyrs_gk_01_xiang',
    name: 'yqqyrs_gk_01_xiang',
    component: () => import('../views/tab_box/yqqyrs_gk_01_xiang')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
