var ScaFile = (function () {
    function ScaFile(file) {
        this.addedToChart = false;
        this.points = new Array();
        this.file = file;
        this.name = file.name.substring(0, file.name.lastIndexOf('.'));
    }
    ScaFile.prototype.load = function (callback) {
        var reader = new FileReader();
        var self = this;
        reader.onload = function (e) {
            return (function (fileReaderEvent) {
                var content = (fileReaderEvent.target).result;
                self.readContent(content);
                callback();
            })(e);
        };
        reader.readAsText(this.file, "UTF-8");
    };
    ScaFile.prototype.readContent = function (content) {
        var parts = content.split('\n');
        parts.forEach(function (part) {
            if(part.startsWith('Time')) {
                this.time = this.readProperty(part);
            }
            if(part.startsWith('Lamp')) {
                this.lamp = this.readProperty(part);
            }
            if(part.startsWith('SLIT')) {
                this.slit = this.readProperty(part);
            }
            if(part.startsWith('Xmax')) {
                this.xmax = this.readXmaxXmin(part, 0);
                this.xmin = this.readXmaxXmin(part, 1);
            }
            if(part.startsWith('Step')) {
                this.step = this.readProperty(part);
            }
            if(part.startsWith('Filter')) {
                this.filter = this.readProperty(part);
            }
            if(part.startsWith('[')) {
                var debug = 0;
            }
            if(!isNaN(part.substring(0, 1)) && part != '') {
                this.points.push(this.readPoint(part));
            }
        }, this);
    };
    ScaFile.prototype.readProperty = function (content) {
        var parts = content.split(':');
        return parts[1];
    };
    ScaFile.prototype.readXmaxXmin = function (content, idx) {
        var part = this.readProperty(content);
        var minMaxParts = part.split('->');
        return +minMaxParts[idx];
    };
    ScaFile.prototype.readPoint = function (content) {
        var parts = content.split(' ');
        var point = new Point(+parts[0], +parts[1]);
        return point;
    };
    return ScaFile;
})();
//@ sourceMappingURL=ScaFile.js.map
