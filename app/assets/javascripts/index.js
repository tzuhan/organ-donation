$("a").click(function(){
	$(this).addClass('.clicked');
	console.log("add clicked");
});
$("div.clicked").click(function(){
	$(this).removeClass('.clicked');
});
