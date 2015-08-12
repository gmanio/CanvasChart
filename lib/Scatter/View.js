/**
 * NTS Scatter Chart
 * View Class
 * @class
 */
nts.Chart.Scatter.View = function () {
	this.initialize.apply(this, arguments);
}

nts.Chart.Scatter.View.prototype = {
	model: new nts.Chart.Scatter.Model(),
	
	initialize: function (htOption) {
		this.options = htOption;
		
		this._initCanvas();
		this.render();
	},
	
	_initCanvas : function(){
		if(this.options.el != null){
			this.canvas = document.querySelector(this.options.el);
		}
		
		this.ctx = 	this.canvas.getContext('2d');
		this.w = this.canvas.width;
		this.h = this.canvas.height;
	},
	
	render: function(){
		
	}
}