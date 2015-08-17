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
		this._attachedEvent();
		this.render();
	},

	_initCanvas: function () {
		this.canvas = document.querySelector(this.options.el);

		this.w = this.canvas.width;
		this.h = this.canvas.height;
		this.ctx = this.canvas.getContext('2d');

		this._drawTitle();
	},

	_drawTitle: function () {
		//drawTitle
		this.ctx.font = '15pt Helvetica';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.options.title.text, this.w/2, 50);
		//drawXTitle
		this.ctx.font = '10pt Helvetica';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.options.xAxis.title.text, this.w/2, 80);
		this._drawGrid(0, 100, this.w, 100);
		this._drawGrid(100, 0, 100, this.h);
		this._drawGrid(0, this.h-100, this.w, this.h-100);
		//drawYTitle
		this.ctx.font = '10pt Helvetica';
		this.ctx.rotate(-0.5*Math.PI);
		this.ctx.translate(-this.h/2,70);
		//this.ctx.textAlign = 'left';
		this.ctx.fillText(this.options.yAxis.title.text, 0, 0);
		this.ctx.save();
	},

	_drawGrid: function (x1, y1, x2, y2) {
		this.ctx.beginPath();
		this.ctx.lineWidth = 0.1;
		this.ctx.translate(0.5, 0.5);
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	},

	_attachedEvent: function () {
		this.canvas.addEventListener('mousemove', function (e) {
			//this._clearCanvas();
			this.ctx.beginPath();
			this.ctx.fillStyle = "rgba(255,0,0,0.4)";
			this.ctx.arc(e.offsetX, e.offsetY, 10, 0, 2 * Math.PI, false);
			this.ctx.fill();
		}.bind(this))
	},

	render: function () {
		window.requestAnimationFrame(this.render.bind(this));
	},

	_clearCanvas: function () {
		this.ctx.clearRect(0, 0, this.w, this.h);
	}
}