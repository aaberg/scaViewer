///<reference path='Point.ts' />
///<reference path='ScaFile.ts' />
///<reference path='./jquery.d.ts' />
///<reference path='./highcharts.d.ts' />
///<reference path='Common.ts' />
///<reference path='chart-options.ts' />
class AcsApp{
    constructor() {
        $('#inpFile').change( (e) => this.onFileSelected(e));
        $('#inpTitle, #inpSubtitle').keyup( (e) => this.onTitleChanged(e));
        $('#inpXmin, #inpXmax').keyup( () => this.onXMinOrMaxChanged());

        this.initChart();

        // initial invokes
        this.onTitleChanged(null);
        this.onXMinOrMaxChanged();
    }

    public selectedFiles: ScaFile[] = new ScaFile[];

    private chart;

    public onFileSelected(e) {

        var self = this;

        for (var i = 0, f; f = <File>e.target.files[i]; i++) {
            var scaFile = new ScaFile(f);
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
            var elem = $('<li>' + f.name + '</li>');
            listElem.append(elem);
        }
    }

    public initChart() {

//        this.chart = new Highcharts.Chart(<any>themeOptions);
        this.chart = new Highcharts.Chart(<any>{
            title:{
                text:'bla bla'
            },
            subtitle: {
                style: {
                    color: '#666666',
                    font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
                }
            },
            chart: {
                renderTo: 'chartContainer',
                type: 'spline'
            },
            xAxis: {
                min:200,
                max:500,
                gridLineWidth: 1,
                lineColor: '#000',
                tickColor: '#000'
            },
            yAxis: {
                minorTickInterval: 'auto',
                lineColor: '#000',
                lineWidth: 1,
                tickWidth: 1,
                tickColor: '#000'
            },
            plotOptions: {
                series:{
                    marker:{
                        enabled : false
                    }
                }
            }
        });
//
//        this.chart.setOptions(<any>themeOptions);
    }

    public addSeries() {
        var seriesArr = [];
        this.selectedFiles.forEach(function(scaFile){

            if (scaFile.addedToChart) {
                return;
            }
            scaFile.addedToChart = true;

            var series = {
                data:[],
                name: scaFile.name
            };

            for (var i = 0, p : Point; p = scaFile.points[i]; i++) {
//                if (p.xval < 200 ) {
//                    var debug = 0;
//                    continue;
//                }
                series.data.push({
                    x: p.xval,
                    y: p.yval
                });
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
        if (xmax < xmin) xmax = xmin;
        this.chart.xAxis[0].setExtremes(xmin, xmax);
    }

}


$(function(){
    var app : AcsApp = new AcsApp();
});
