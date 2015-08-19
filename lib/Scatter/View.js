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
		var xData = this.sortData(htOption.data, 'x');
		this.xMin = xData[0][0];
		this.xMax = xData[xData.length - 1][0];
		var yData = this.sortData(htOption.data, 'y');
		this.yMin = yData[0][1];
		this.yMax = yData[yData.length - 1][1];

		this._initCanvas();
		this._attachedEvent();
		this.render();
	},

	_dataToAxis: function (currentMin, currentMax, graphMin, graphMax, aDatas) {
		var scale = (graphMax - graphMin) / (currentMax - currentMin);
		return (graphMin + ((aDatas - currentMin) * scale));
	},

	sortData: function (aData, htOption) {
		if (htOption == 'x') {
			return aData.sort(function (a, b) {
				return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
			});
		} else {
			return aData.sort(function (a, b) {
				return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
			});
		}
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
		//drawXTitle
		this.ctx.font = '10pt Helvetica';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.options.xAxis.title.text, this.w / 2, 80);
		//drawYTitle
		this.ctx.save();
		this.ctx.font = '10pt Helvetica';
		this.ctx.rotate(-0.5 * Math.PI);
		this.ctx.translate(-this.h / 2, 50);
		//this.ctx.textAlign = 'left';
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
		var xMin = this.xMin;
		var yMin = this.yMin;
		var xGap = (this.xMax-this.xMin)/13;
		var yGap = (this.yMax-this.yMin)/6;
		
		for (var s = this.h - 100; s >= 100; s -= 50) {
			this._drawGrid(100, s, this.w - 50, s);
			this.ctx.fillText(Math.round(yMin), 80, s+5)
			yMin = yMin + yGap;
		}

		for (var v = 100; v < this.w; v += 50) {
			this._drawGrid(v, this.h - 100, v, this.h - 90);
			this.ctx.fillText(Math.round(xMin), v, this.h - 70)
			xMin = xMin + xGap;
		}
	},

	_updateModelView: function () {
		var modelData = this.options.data;

		for (var i = 0; i < modelData.length; i++) {
			var data = modelData[i];
			var xPos = this._dataToAxis(this.xMin, this.xMax, 100, 750, data[0]);
			var yPos = this._dataToAxis(this.yMin, this.yMax, 100, 400, data[1]);
			// console.log(modelData[i][0] + ' ' + modelData[i][1]);
			this.ctx.beginPath();
			this.ctx.arc(xPos, 500-yPos, 1, 0, Math.PI * 2, true);
			this.ctx.stroke();
			this.ctx.font = '1pt Helvetica';
			this.ctx.fillText(data[0]+" : "+data[1], xPos, 500-yPos);
			this.ctx.save();
			this.ctx.closePath();
		}
	},

	_attachedEvent: function () {
		// this.canvas.addEventListener('mousemove', function (e) {
		// 	//this._clearCanvas();
		// 	this.ctx.beginPath();
		// 	this.ctx.fillStyle = "rgba(255,0,0,0.4)";
		// 	this.ctx.arc(e.offsetX, e.offsetY, 10, 0, 2 * Math.PI, false);
		// 	this.ctx.fill();
		// }.bind(this))
	},

	render: function () {
		window.requestAnimationFrame(this.render.bind(this));
	},

	_clearCanvas: function () {
		this.ctx.clearRect(0, 0, this.w, this.h);
	}
}