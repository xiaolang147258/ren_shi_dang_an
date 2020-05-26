module.exports = {
    
	devServer: {
	  port: 8086,
	  proxy: {
	    '/': {
	      target: 'http://192.168.124.9',
		  // target:'http://wg.jxyh.gov.cn/pm',
	      ws: true
	    }
	
	  }
	
	},
	lintOnSave: false,
    publicPath:'./',
    outputDir:'dist_pc',
    assetsDir:'static'
}