$('#ua').keypress(function(e) {
    if(e.keyCode == 13) {
		if(this.value){
			self.postMessage(this.value);
		}
    }
});
$('.thumbnail').click(function(){
	if(this.id){
		self.postMessage(this.id);
	}
})
$('.typeahead').typeahead();
self.on("message", function onMessage(message) {
	if(message == 'focus'){
		$('#ua').focus().select();
	}
});