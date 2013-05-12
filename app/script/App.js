var AcsApp = (function () {
    function AcsApp() {
        var _this = this;
        this.selectedFiles = new Array();
        $('#inpFile').change(function (e) {
            return _this.onFileSelected(e);
        });
        $('#inpTitle, #inpSubtitle').keyup(function (e) {
            return _this.onTitleChanged(e);
        });
        $('#inpXmin, #inpXmax').keyup(function () {
            return _this.onXMinOrMaxChanged();
        });
        this.initChart();
        this.onTitleChanged(null);
        this.onXMinOrMaxChanged();
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
        var listElem = $('#divFileNames');
        listElem.empty();
        for(var i = 0, f; f = this.selectedFiles[i]; i++) {
            var elem = $('<li>' + f.name + '</li>');
            listElem.append(elem);
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
                name: scaFile.name
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
        if(xmax < xmin) {
            xmax = xmin;
        }
        this.chart.xAxis[0].setExtremes(xmin, xmax);
    };
    return AcsApp;
})();
$(function () {
    var app = new AcsApp();
});
//@ sourceMappingURL=App.js.map
