var Page = function(w,h){
	
	this.width = w;
	this.height = h;
	this.background = new Layer(w,h);
	this.layers = [new Layer(w,h)];
	this.foreground = new Layer(w,h);
	this.composite = new Layer(w,h);
	
	this.activeIndex = 0;
	
	this.div = document.getElementById("InkMotion");
	this.div.appendChild(this.background.canvas);
	this.div.appendChild(this.layers[0].canvas);
	this.div.appendChild(this.foreground.canvas);
};

Page.prototype = {
	
	addLayer : function(){
		var layer = new Layer(this.width, this.height);
		this.layers[this.activeIndex-1].canvas.insertAdjacentElement(layer.canvas);
		this.activeIndex = this.layers.length;
		this.layers.push(layer);
		return layer;
	},
	
	flatten : function(){
		var ctx = this.composite.context;
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.drawImage(this.background.canvas, 0, 0);
		for(index in this.layers) ctx.drawImage(this.layers[index].canvas, 0, 0);
		return this.composite;
	},
	
	activeLayer : function(){
		return this.layers[this.activeIndex];
	}
};