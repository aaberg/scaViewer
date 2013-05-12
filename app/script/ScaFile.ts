///<reference path='Point.ts' />
///<reference path='Common.ts' />
///<reference path='./jquery.d.ts' />
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

    public addedToChart: bool = false;

    public points: Point[] = new Point[];

    constructor(file : File) {
        this.file = file;
        this.name = file.name;
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

        parts.forEach(function(part: string) {
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

            if (!isNaN(<any>part.substring(0,1) ) && part != '') {
                this.points.push(this.readPoint(part));
            }

        }, this);
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
        var point = new Point(+parts[0], +parts[1]);

        return point;
    }
}
