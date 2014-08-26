///<reference path='Point.ts' />
///<reference path='Common.ts' />
///<reference path='../js/jquery/jquery.d.ts' />
class ScaFile{

    public file: File;
    public name : string;

    public time: string;
    public lamp: number;
    public slit: number;
    public xmax: number;
    public xmin: number;
    public step: number;
    public filter: number;
    public totalTime: number;
    public maxNumberOfPoints: number;

    public addedToChart: boolean = false;

    public points: Point[] = new Array<Point>();

    constructor(file : File) {
        this.file = file;
        this.name = file.name.substring(0, file.name.lastIndexOf('.'));
    }

    public load(callback : () => void){
        var reader = new FileReader();
        var self = this;

        reader.onload = (e) => function(fileReaderEvent) {
            var content = (<any>fileReaderEvent.target).result;

            self.readContent(content);
            callback();
        }(e);
        reader.readAsText(this.file, "UTF-8");
    }


    readContent(content) {
        var parts : string[] = content.split('\n');

        parts.some(function(part: string) {
            if (part.startsWith('Time')){
                this.time = this.readProperty(part);
            }

            if (part.startsWith('Lamp')){
                this.lamp = this.readProperty(part);
            }

            if (part.startsWith('SLIT')){
                this.slit = this.readProperty(part);
            }

            if (part.startsWith('Xmax')){
                this.xmax = this.readXmaxXmin(part, 0);
                this.xmin = this.readXmaxXmin(part, 1);
            }

            if (part.startsWith('Step')) {
                this.step = this.readProperty(part);
            }

            if (part.startsWith('Filter')) {
                this.filter = this.readProperty(part);
            }

            if (part.startsWith('[')){
                var debug = 0;
            }

            if (part.startsWith('Total Time')) {
                this.totalTime = this.readProperty(part);
            }

            if (!isNaN(<any>part.substring(0,1) ) && part != '') {
                return true;

            }
            return false;

        }, this);

        var pointCnt:number;
        if (this.totalTime != null){
            pointCnt = this.totalTime / this.step;
        } else if (this.xmax != null && this.xmin != null) {
            pointCnt = (this.xmax - this.xmin) / this.step;
        }


        var mod:number = 1;

        if (this.totalTime > this.maxNumberOfPoints) {
            mod = Math.ceil(pointCnt / this.maxNumberOfPoints);
        }

        var idx:number = 0;
        parts.forEach(function(part:string) {

            if (!isNaN(<any>part.substring(0,1) ) && part != '') {
                if ((idx++ % mod) != 0) return;
                this.points.push(this.readPoint(part));
            }


        }, this)

        console.log("number of points: " + this.points.length);

    }

    readProperty(content: string) {
        var parts = content.split(':');
        return parts[1];
    }

    readXmaxXmin(content:string, idx: number) : number {
        var part = this.readProperty(content);
        var minMaxParts = part.split('->');
        return +minMaxParts[idx];
    }

    readPoint(content:string) : Point {
        var parts = content.split(' ');

        var x :number = +parts[0];
        if (this.totalTime != null) {
            x = x / 60;
        }

        var point = new Point(x, +parts[1]);

        return point;
    }
}
