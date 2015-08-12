/**
 * NTS Scatter Chart
 * Model Class
 * @class
 */
nts.Chart.Scatter.Model = function () {
	this.initialize.apply(this, arguments);
}

nts.Chart.Scatter.Model.prototype = {
	initialize: function (htOption) {
		
	},

	set: function (htOption) {
		$.extend(true, this, htOption);
	},

	get: function (sAttributeName) {

		if (this[sAttributeName] != null) {
			return this[sAttributeName];
		}

		return false;
	}
}