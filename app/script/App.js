var AcsApp = (function () {
    function AcsApp() {
        var _this = this;
        this.selectedFiles = new Array();
        this.markerEnabled = false;
        $('#inpFile').change(function (e) {
            return _this.onFileSelected(e);
        });
        $('#inpTitle, #inpSubtitle').keyup(function (e) {
            return _this.onTitleChanged(e);
        });
        $('#inpXmin, #inpXmax').keyup(function () {
            return _this.onXMinOrMaxChanged();
        });
        $('#inpYmin, #inpYmax').keyup(function () {
            return _this.onYMinOrMaxChanged();
        });
        $('#inpXTitle, #inpYTitle').keyup(function () {
            return _this.onLabelChanged();
        });
        $('#btnClearChart').click(function () {
            return _this.onClearChartBtnClicked();
        });
        $('#btnToggleMarkers').click(function () {
            return _this.onToggleMarkersBtnClicked();
        });
        this.initChart();
        this.onTitleChanged(null);
        this.onXMinOrMaxChanged();
        this.onYMinOrMaxChanged();
        this.onLabelChanged();
    }
    AcsApp.prototype.onFileSelected = function (e) {
        var self = this;
        for(var i = 0, f; f = e.target.files[i]; i++) {
            var scaFile = new ScaFile(f);
            this.selectedFiles.push(scaFile);
            scaFile.load(function () {
                self.addSeries();
            });
        }
        this.renderFiles();
    };
    AcsApp.prototype.renderFiles = function () {
        var _this = this;
        var listElem = $('#divFileNames');
        listElem.empty();
        for(var i = 0, f; f = this.selectedFiles[i]; i++) {
            var elem = $('<div></div>');
            var input = $('<input type="text" />').val(f.name);
            elem.append(input);
            listElem.append(elem);
            input.keyup(function (event) {
                return _this.onSeriesNameChange(event);
            }).data('index', i);
        }
    };
    AcsApp.prototype.initChart = function () {
        this.chart = new Highcharts.Chart(themeOptions);
    };
    AcsApp.prototype.addSeries = function () {
        var seriesArr = [];
        this.selectedFiles.forEach(function (scaFile) {
            if(scaFile.addedToChart) {
                return;
            }
            scaFile.addedToChart = true;
            var series = {
                data: [],
                name: scaFile.name,
                marker: {
                    enabled: this.markerEnabled
                }
            };
            for(var i = 0, p; p = scaFile.points[i]; i++) {
                series.data.push({
                    x: p.xval,
                    y: p.yval
                });
            }
            seriesArr.push(series);
            this.chart.addSeries(series);
        }, this);
    };
    AcsApp.prototype.onTitleChanged = function (e) {
        var title = $('#inpTitle').val();
        var subtitle = $('#inpSubtitle').val();
        this.chart.setTitle({
            text: title
        }, {
            text: subtitle
        });
    };
    AcsApp.prototype.onXMinOrMaxChanged = function () {
        var xmin = $('#inpXmin').val();
        var xmax = $('#inpXmax').val();
        if(!xmin) {
            xmin = null;
        }
        if(!xmax) {
            xmax = null;
        }
        if(xmax < xmin) {
            xmax = xmin;
        }
        this.chart.xAxis[0].setExtremes(xmin, xmax);
    };
    AcsApp.prototype.onYMinOrMaxChanged = function () {
        var ymin = $('#inpYmin').val();
        var ymax = $('#inpYmax').val();
        if(!ymin) {
            ymin = null;
        }
        if(!ymax) {
            ymax = null;
        }
        if(ymax < ymin) {
            ymax = ymin;
        }
        this.chart.yAxis[0].setExtremes(ymin, ymax);
    };
    AcsApp.prototype.onLabelChanged = function () {
        var xAxisLabel = $('#inpXTitle').val();
        var yAxisLabel = $('#inpYTitle').val();
        this.chart.xAxis[0].setTitle({
            text: xAxisLabel
        });
        this.chart.yAxis[0].setTitle({
            text: yAxisLabel
        });
    };
    AcsApp.prototype.onClearChartBtnClicked = function () {
        if(confirm('This will clear all data on the page. Are you sure you want to continue?')) {
            window.location.reload(true);
        }
    };
    AcsApp.prototype.onToggleMarkersBtnClicked = function () {
        this.markerEnabled = !this.markerEnabled;
        this.chart.series.forEach(function (serie) {
            serie.update({
                marker: {
                    enabled: this.markerEnabled
                }
            });
        }, this);
    };
    AcsApp.prototype.onSeriesNameChange = function (e) {
        var input = $(e.target), seriesName = input.val(), index = input.data('index');
        this.chart.series[index].update({
            name: seriesName
        });
        this.selectedFiles[index].name = seriesName;
    };
    return AcsApp;
})();
$(function () {
    var app = new AcsApp();
});
//@ sourceMappingURL=App.js.map
