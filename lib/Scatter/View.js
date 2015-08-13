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
		this.tmpValue = 0;
		this.options = htOption;

		this._initCanvas();
		this._attachedEvent();
		this.render();
	},

	_initCanvas: function () {
		if (this.options.el != null) {
			this.canvas = document.querySelector(this.options.el);
		}

		this.w = this.canvas.width;
		this.h = this.canvas.height;
		this.ctx = this.canvas.getContext('2d');
	},

	_attachedEvent: function () {
		this.canvas.addEventListener('mousemove', function (e) {
			this._clearCanvas();
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