class PopBox {
    constructor(box,{initColors = ["black","white"],popColors = ["white","black"]}={}){
        this.isMobile = this.checkMobile();
        this.initProps(box,initColors,popColors);
        
        this.attachListener(box,"mouseenter",this._ev_enterPop);
        this.attachListener(box,"mouseleave",this._ev_leavePop);
        this.attachListener(box,"click",this._ev_TogglePop);
        
        this._initStyles(box);
    }
    checkMobile(){
        var W = window.innerWidth, H = window.innerHeight;
        if((W/H)>1){return false;}
        else{return true;}
    }
    initProps(box,iCs,pCs){
        box.isClicked = false;
        box.initColors = iCs;
        box.popColors = pCs;
    }
    attachListener(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,false);
    }
    _ev_TogglePop(evt){
        var target = evt.currentTarget, initColors = target.initColors, popColors = target.popColors, isClicked = target.isClicked;
        if(isClicked){
            target.style.color = initColors[0];
            target.style.backgroundColor = initColors[1];
            target.isClicked = false;
        }
        else{
            target.style.color = popColors[0];
            target.style.backgroundColor = popColors[1];
            target.isClicked = true;
        }
    }
    _ev_enterPop(evt){
        var target = evt.currentTarget, initColors = target.initColors, popColors = target.popColors, isClicked = target.isClicked;
        if(!isClicked){
            target.style.color = popColors[0];
            target.style.backgroundColor = popColors[1];
        }
    }
    _ev_leavePop(evt){
        var target = evt.currentTarget, initColors = target.initColors, popColors = target.popColors, isClicked = target.isClicked;
        if(!isClicked){
            target.style.color = initColors[0];
            target.style.backgroundColor = initColors[1];
        }
    }

    _initStyles(element){
        if(window.getComputedStyle(element,null).cursor=="auto"){element.style.cursor="default";} 
    }

    static initPopBoxes(selector,{initColors = ["black","white"],popColors = ["white","black"]}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var popBoxes = new Array(numBoxes);
        for(var i=0;i<numBoxes;i++){
            popBoxes[i] = new PopBox(boxes[i],{initColors:initColors,popColors:popColors});
        }
        return popBoxes;
    }
}