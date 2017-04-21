(function() {
	'use strict';

    angular.module('App').factory('ChartService',
			ChartService);

    ChartService.$inject = [ 'numberFilter', 'dateFilter', 'LanguageService'];

	function ChartService(numberFilter, dateFilter, LanguageService) {
		var service = {};

		service.populateDateChart = function(data) {
			var dateChart = new Highcharts.Chart({
				chart : {
					type : 'line',
					renderTo : 'datesChart',
					height : 350,
                    marginTop:30
				},
				exporting:{
		            chartOptions:{
						title : {
							text : 'TOTAL REVENUE count »',
							x : -20
						},
						
		            },
		            fallbackToExportServer: false
		        },
				title : {
					text : ' '
				},
				tooltip : {
					formatter : function() {
						var tooltip = '<br/><span style="color:' + this.color + '">\u25CF</span> '
							+ dateFilter(this.point.tooltip) + ': ' + '<b>' + numberFilter(this.y, 0) + '</b>';

						return tooltip;
					}
				},
				xAxis : {
					categories : data.xAxis,
                    labels : {
                        formatter: function () {
                            var label = dateFilter(this.value);
                            return label;
                        }
                    },
				},
				yAxis : {
					title : {
						enabled : false
					}
				},
				legend : {
					enabled : false
				},
				credits : {
					enabled : false
				},
				series : [ {
					data : data.series[0],
					type : 'spline'
				} ],
                navigation: {
                    buttonOptions: {
                        y:-10,
                        x: 8,
                        verticalAlign: "top"
                    }
                }
			});
            LanguageService.addChartToRedrawList(dateChart);
		}
		return service;
	}
})();