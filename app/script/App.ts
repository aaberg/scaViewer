///<reference path='Point.ts' />
///<reference path='ScaFile.ts' />
///<reference path='../js/jquery/jquery.d.ts' />
///<reference path='../js/highcharts/highcharts.d.ts' />
///<reference path='Common.ts' />
///<reference path='chart-options.ts' />
class AcsApp{
    constructor() {
        $('#inpFile').change( (e) => this.onFileSelected(e));
        $('#inpTitle, #inpSubtitle').keyup( (e) => this.onTitleChanged(e));
        $('#inpXmin, #inpXmax').keyup( () => this.onXMinOrMaxChanged());
        $('#inpYmin, #inpYmax').keyup( () => this.onYMinOrMaxChanged());
        $('#inpXTitle, #inpYTitle').keyup( () => this.onLabelChanged());
        $('#btnClearChart').click( () => this.onClearChartBtnClicked());
        $('#btnToggleMarkers').click( () => this.onToggleMarkersBtnClicked());

        this.initChart();

        // initial invokes
        this.onTitleChanged(null);
        this.onXMinOrMaxChanged();
        this.onYMinOrMaxChanged();
        this.onLabelChanged();
    }


    public selectedFiles: Array<ScaFile> = [];

    private chart;
    public markerEnabled : boolean = false;

    public onFileSelected(e) {

        var self = this;

        var maxNumberOfPoints:number = $('#inpMaxNumPoints').val();

        for (var i = 0, f; f = <File>e.target.files[i]; i++) {
            var scaFile = new ScaFile(f);
            scaFile.maxNumberOfPoints = maxNumberOfPoints;
            this.selectedFiles.push(scaFile);
            scaFile.load(function(){
                self.addSeries();
            });
        }

        this.renderFiles();
    }

    public renderFiles() {
        var listElem = $('#divFileNames');
        listElem.empty();
        for (var i = 0, f : ScaFile; f = this.selectedFiles[i]; i++) {
//            var elem = $('<div>' + f.name + '</div>');
            var elem = $('<div></div>')
            var input = $('<input type="text" />').val(f.name);
            elem.append(input);
            listElem.append(elem);

            input.keyup( (event) => this.onSeriesNameChange(event)).data('index', i);
        }
    }

    public initChart() {

        this.chart = new Highcharts.Chart(<any>themeOptions);
//        this.chart = new Highcharts.Chart(<any>{
//            title:{
//                text:'bla bla'
//            },
//            subtitle: {
//                style: {
//                    color: '#666666',
//                    font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
//                }
//            },
//            chart: {
//                renderTo: 'chartContainer',
//                type: 'spline'
//            },
//            xAxis: {
//                min:200,
//                max:500,
//                gridLineWidth: 1,
//                lineColor: '#000',
//                tickColor: '#000'
//            },
//            yAxis: {
//                minorTickInterval: 'auto',
//                lineColor: '#000',
//                lineWidth: 1,
//                tickWidth: 1,
//                tickColor: '#000'
//            },
//            plotOptions: {
//                series:{
//                    marker:{
//                        enabled : false
//                    }
//                }
//            }
//        });
//
//        this.chart.setOptions(<any>themeOptions);
    }

    public addSeries() {
        var seriesArr = [];
        this.selectedFiles.forEach(function(scaFile, index){

            if (scaFile.addedToChart) {
                return;
            }
            scaFile.addedToChart = true;

            var series = {
                data:[],
                name: scaFile.name,
                marker: {
                    enabled:this.markerEnabled
                }
            };

            for (var i = 0, p : Point; p = scaFile.points[i]; i++) {
//                if (i > 1000) break;
//                if (p.xval < 200 ) {
//                    var debug = 0;
//                    continue;
//                }
                series.data.push([p.xval, p.yval]);
//                series.data.push(p.yval);
            }

            seriesArr.push(series);

            this.chart.addSeries(series);
        }, this);

//        <any>(this.chart).redraw();
    }

    private onTitleChanged(e) {
        var title = $('#inpTitle').val();
        var subtitle = $('#inpSubtitle').val();
        this.chart.setTitle({text: title}, {text: subtitle});
    }


    private onXMinOrMaxChanged() {
        var xmin : number = $('#inpXmin').val();
        var xmax : number = $('#inpXmax').val();
        if (!xmin) xmin = null;
        if (!xmax) xmax = null;
        if (xmax < xmin) xmax = xmin;
        this.chart.xAxis[0].setExtremes(xmin, xmax);
    }

    private onYMinOrMaxChanged() {
        var ymin : number = $('#inpYmin').val();
        var ymax : number = $('#inpYmax').val();
        if (!ymin) ymin = null;
        if (!ymax) ymax = null;

        if (ymax < ymin) ymax = ymin;

        this.chart.yAxis[0].setExtremes(ymin, ymax);
    }

    private onLabelChanged() {
        var xAxisLabel = $('#inpXTitle').val();
        var yAxisLabel = $('#inpYTitle').val();

        this.chart.xAxis[0].setTitle({text: xAxisLabel});
        this.chart.yAxis[0].setTitle({text: yAxisLabel});
    }

    private onClearChartBtnClicked() {
        if (confirm('This will clear all data on the page. Are you sure you want to continue?')) {
            window.location.reload(true);
        }

    }

    private onToggleMarkersBtnClicked() {
        this.markerEnabled = !this.markerEnabled;
        this.chart.series.forEach(function(serie){
            serie.update({
                marker: {
                    enabled: this.markerEnabled
                }
            })
        }, this);
    }

    private onSeriesNameChange(e) {
        var input = $(e.target),
            seriesName = input.val(),
            index = input.data('index');

        this.chart.series[index].update({
            name: seriesName
        });
        this.selectedFiles[index].name = seriesName;
    }

}


$(function(){
    var app : AcsApp = new AcsApp();
});
