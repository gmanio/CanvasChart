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
		this.model.set(htOption.data);
		this._initCanvas();
	},

	_initCanvas: function () {
		this.canvas = document.querySelector(this.options.el);

		this.w = this.canvas.width;
		this.h = this.canvas.height;
		this.ctx = this.canvas.getContext('2d');

		this._drawTitle();
		// this._drawGrid(0, 100, this.w, 100);
		// this._drawGrid(100, 0, 100, this.h);
		// this._drawGrid(0, this.h - 100, this.w, this.h - 100);

		this._drawDataAreaGrid();
		this._updateModelView();
	},

	_drawTitle: function () {
		//drawTitle
		this.ctx.font = '15pt Helvetica';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.options.title.text, this.w / 2, 50);
		//draw : xAxis Title
		this.ctx.font = '10pt Helvetica';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.options.xAxis.title.text, this.w / 2, 80);
		//draw : yAxis Title
		this.ctx.save();
		this.ctx.font = '10pt Helvetica';
		this.ctx.rotate(-0.5 * Math.PI);
		this.ctx.translate(-this.h / 2, 50);
		this.ctx.fillText(this.options.yAxis.title.text, 0, 0);
		this.ctx.restore();
	},

	_drawGrid: function (x1, y1, x2, y2) {
		this.ctx.beginPath();
		this.ctx.lineWidth = 0.1;
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	},

	_drawDataAreaGrid: function () {
		var xMin = this.model.get('xMin');
		var yMin = this.model.get('yMin');
		var xMax = this.model.get('xMax');
		var yMax = this.model.get('yMax');
		var xGap = (xMax - xMin) / 13;
		var yGap = (yMax - yMin) / 6;

		for (var s = this.h - 100; s >= 100; s -= 50) {
			this._drawGrid(100, s, this.w - 50, s);
			this.ctx.fillText(Math.round(yMin), 80, s + 5)
			yMin = yMin + yGap;
		}

		for (var v = 100; v < this.w; v += 50) {
			this._drawGrid(v, this.h - 100, v, this.h - 90);
			this.ctx.fillText(Math.round(xMin), v, this.h - 70)
			xMin = xMin + xGap;
		}
	},

	_updateModelView: function () {
		var drawData = this.model.get('dataToaxis');
		var modelDatas = this.model.get('data');
		for (var i = 0; i < drawData.length; i++) {
			var data = drawData[i];
			var modelData = modelDatas[i];
			this.ctx.beginPath();
			this.ctx.arc(data[0], 500 - data[1], 1, 0, Math.PI * 2, true);
			this.ctx.stroke();
			this.ctx.font = '1pt Helvetica';
			this.ctx.fillText(modelData[0] + " : " + modelData[1], data[0], 500 - data[1]);
			this.ctx.save();
			this.ctx.closePath();
		}
	},

	_attachedEvent: function () {

	},

	render: function () {
		window.requestAnimationFrame(this.render.bind(this));
	},

	_clearCanvas: function () {
		this.ctx.clearRect(0, 0, this.w, this.h);
	}
}