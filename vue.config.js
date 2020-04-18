module.exports = {
    
	devServer: {
	  port: 8086,
	  proxy: {
	    '/': {
	      target: 'http://192.168.124.9',
		  // target:'http://223.83.172.216'
	      ws: true
	    }
	
	  }
	
	},
	lintOnSave: false,
	
    publicPath:'./',
    outputDir:'dist_pc',
    assetsDir:'static'
}