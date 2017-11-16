
require(['config'], function() {
	
	require(['jquery'], function($) {
		//载入底部
		$('#footer').load('./common_footer.html', function() {});
	});
});



