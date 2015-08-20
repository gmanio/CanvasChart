/**
 * NTS Scatter Chart
 * Model Class
 * @class
 */
nts.Chart.Scatter.Model = function () {
	this.initialize.apply(this, arguments);
}

nts.Chart.Scatter.Model.prototype = {
	xMin: 0,
	xMax: 0,
	yMin: 0,
	yMax: 0,
	data: [],
	dataToaxis: [],
	initialize: function (htOption) {
		
	},

	set: function (htOption) {
		$.extend(true, this.data, htOption);
		
		//setting xAxisDatas
		var xSortedDatas = this.sortData(this.data, 'x');
		this.xMin = xSortedDatas[0][0];
		this.xMax = xSortedDatas[xSortedDatas.length - 1][0];
		
		//setting yAxisDatas
		var ySortedDatas = this.sortData(this.data, 'y');
		this.yMin = ySortedDatas[0][1];
		this.yMax = ySortedDatas[ySortedDatas.length - 1][1];
		
		this.data.forEach(function(data, idx){
			var xPos = this._dataToAxis(this.xMin, this.xMax, 100, 750, data[0]);
			var yPos = this._dataToAxis(this.yMin, this.yMax, 100, 400, data[1]);
			
			this.dataToaxis[idx] = [xPos,yPos];
		}.bind(this));
	},

	get: function (sAttributeName) {

		if (this[sAttributeName] != null) {
			return this[sAttributeName];
		}

		return false;
	},

	sortData: function (Datas, sortOption) {

		// x 축 데이터 기준으로 sorting
		if (sortOption == 'x') {
			return Datas.sort(function (a, b) {
				return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
			});
		}

		// y 축 데이터 기준으로 sorting
		if (sortOption == 'y') {
			return Datas.sort(function (a, b) {
				return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
			});
		}
	},
	
	_dataToAxis: function (currentMin, currentMax, graphMin, graphMax, aDatas) {
		var scale = (graphMax - graphMin) / (currentMax - currentMin);
		return (graphMin + ((aDatas - currentMin) * scale));
	}
}