$('#ua').keypress(function(e) {
    if(e.keyCode == 13) {
		if($('ul.typeahead li.active').data('value')){
			self.postMessage($('ul.typeahead li.active').data('value'));
		}else{
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