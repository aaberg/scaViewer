///<reference path='../js/highcharts/highcharts.d.ts' />

interface String {
    startsWith(str:string) : boolean;
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(str : string) {
        return this.indexOf(str) == 0;
    }
}


//interface jQuery{
//    highcharts(options : Object) : HighchartsChart;
//}