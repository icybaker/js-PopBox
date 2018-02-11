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
    static _doc(){
        var docstring = `The PopBox object allows the user to easily create elements that
        "Pop" upon given mouse events. The standard PopBox operates slightly
        differently from mobile to desktop.
        For desktop, the PopBox will pop on mouseover and revert on 
        mouseout, unless the PopBox is clicked, which freezes the 
        popped styling until clicked again.
        For mobile, the PopBox will toggle its popped styling simply by
        clicking, since there is no such thing as mouseover.
        The constructor has the following form:
        
        constructor(box,{initColors = ["black","white"],popColors = ["white","black"]}={}){
        
        Where the contents of the curly braces represent optional
        arguments which are set using the following syntax:
        
        {initColors:["color","backgroundColor"],popColors:["color","backgroundColor"]}
        
        These colors default to black and white, where the popped style
        is simply an inversion of the color and backgroundColor.
        
        You can create a PopBox directly by using the 'new' operator
        and providing the necessary arguments, but the recommended
        procedure for initializing 1 or many PopBoxes is to use the 
        PopBox's static method: initPopBoxes as follows:
        
        PopBox.initPopBoxes(selector,{optional args});
        
        Where selector can be any CSS selector string. Calling this 
        method will create PopBoxes out of every element corresponding 
        to the selector string given. Proper use of selector strings
        allows the user to set different rules for different groups
        of PopBoxes very efficiently.
        
        The user may apply any CSS to the PopBox with the obivous 
        exceptions of color and background-color.`;
        console.log(docString);
        return docString;
    }
}