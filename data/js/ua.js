$('#ua').keypress(function(e) {
    if(e.keyCode == 13) {
        self.postMessage(this.value);
    }
});
self.on("message", function onMessage(message) {
	if(message == 'focus'){
		$('#ua').focus().select();				
	}
});