///<reference path='Point.ts' />
///<reference path='ScaFile.ts' />
///<reference path='../js/jquery.d.ts' />
///<reference path='../js/highcharts.d.ts' />
///<reference path='Common.ts' />
class AcsApp{
    constructor() {
        $('#inpFile').change( (e) => this.onFileSelected(e));

        this.initChart();
    }

    public selectedFiles: ScaFile[] = new ScaFile[];

    chart : Highcharts.Chart;

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

        this.chart = new Highcharts.Chart({
            title:{
                text:'bla bla'
            },
            chart: {
                renderTo: 'chartContainer',
                type: 'spline'
            },
            xAxis: {
                min:200,
                max:500
            },
            plotOptions: {
                series:{
                    marker:{
                        enabled : false
                    }
                }
            }
        })
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


}


$(function(){
    var app : AcsApp = new AcsApp();
});
