import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null;
    color = "black";
    width = 1;
    constructor() {
        makeAutoObservable(this);
    }
    setTool(tool) {
        this.tool = tool;
        this.tool.fillColor = this.color;
        this.tool.strokeColor = this.color;
        this.tool.lineWidth = this.width;
    }

    setFillColor(color) {
        this.tool.fillColor = color;
        this.color = color;
    }

    setStrokeColor(color) {
        this.tool.strokeColor = color;
        this.color = color;
    }

    setLineWidth(width) {
        this.tool.lineWidth = width;
        this.width = width;
    }
}

export default new ToolState();