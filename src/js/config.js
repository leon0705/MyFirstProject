/*
	requirejs配置
 */
require.config({
	// baseUrl:'js'
	paths: {
		jquery: './jquery-3.2.1',
		load: './index_header_cart_footer',
		com:'./common',
		CarS:'./Carousel',
		foot:'./foot', 
		cart:'./cart',
		header:'./header', 
		zoom:'../lib/gdsZoom'
	},
	shim: {
		floor:['load','jquery'],
		load: ['jquery'],
		CarS:['com'],
		foot:['jquery']
	}
});