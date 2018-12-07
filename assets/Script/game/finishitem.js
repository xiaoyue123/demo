
cc.Class({
    extends: cc.Component,

    properties: {
        _work:'',
        imgWork1:cc.Node,
        imgWork2:cc.Node,
        imgWork3:cc.Node,
        imgWork4:cc.Node,
        imgWork5:cc.Node,
        imgWork6:cc.Node,
        imgWork7:cc.Node,
        imgWork8:cc.Node,
        starSpr:cc.Sprite,
        _isFinishActive :false,
        _tipsLevel: 0,
        _isFinish:false,
        _isStarReward:false,
        _rewarStarNum:0,
        _rewardList:[],
    },
    start () {

    },
    onLoad: function () {
        this.imgList = new Array();
        this.imgList.push(this.imgWork1);
        this.imgList.push(this.imgWork2);
        this.imgList.push(this.imgWork3);
        this.imgList.push(this.imgWork4);
        this.imgList.push(this.imgWork5);
        this.imgList.push(this.imgWork6);
        this.imgList.push(this.imgWork7);
        this.imgList.push(this.imgWork8);

    },
    IsStarReward:function(){
        return this._isStarReward;
    },
    initStarReward:function(num){
        this._isStarReward = true;
        this._rewarStarNum = num;
    },
    isFinish:function(){
        return this._isFinish;
    },
    getWork:function(){
        return this._work;
    },
    showFinishItems:function(active){
        this._isFinishActive = active;
        // if(!active){
            for (let index = 0; index < this.showItemList.length; index++) {
                let element = this.showItemList[index];
                if(active){
                    element.opacity = 255;
                }
                element.active = active;
            }
        // }

        if(active&&this._isStarReward){
            for (let index = 0; index < this._rewardList.length; index++) {
                this._rewardList[index].removeFromParent();
            }
            this._rewardList=[];
        }
    },
    FinishWork:function(){
        this._isFinish = true;
    },
    isFinish:function(){
        return this._isFinishActive;
    },
    showByIndex:function(){
        let userTipLevel = cc.tools.gameManager.getTipsLevel();
        this._tipsLevel+=1;
        if(userTipLevel<=this.showItemList.length){
            let element = this.showItemList[userTipLevel];
            element.active = true;
            element.opacity = 125;
            if(userTipLevel<this._rewardList.length){
                this._rewardList[userTipLevel].removeFromParent();
                // this._rewardList.splice(userTipLevel,1);
            }
        }
    },
    showTishiBycount:function(count){
        this._tipsLevel=count;
        for (let index = 0; index < count; index++) {
            let element = this.showItemList[index];
            element.active = true;
            if(this._isFinishActive){
                element.opacity = 255;
            }else{
                element.opacity = 125;
            }
            
            if(index<this._rewardList.length){
                this._rewardList[index].removeFromParent();
            }
        }
    },
    isCanTihi:function(){
        let userTipLevel = cc.tools.gameManager.getTipsLevel();
        if(this._tipsLevel==userTipLevel&&this.showItemList.length-1>=userTipLevel){
            return true;
        }
        return false;
    },
    FinishWordAction:function(){
        // cc.log("完成拼接，播放效果");
        this.showFinishItems(true);
        this.FAction();
        this.FinishWork();
    },
    FAction:function(){
        let time = 0.5 / this.showItemList.length;
        let index = 0;
        let scale = cc.scaleTo(time, 1.3,1.3);
        let scaleR = cc.scaleTo(0.1,1,1);
        let self = this;
        let func = cc.callFunc((sender) => {
            sender.stopAllActions();
            if(index<this.showItemList.length-1){
                index+=1;
                self.showItemList[index].active = true;
                self.showItemList[index].opacity = 255;
                self.imgList[index].runAction(seq);
            }
        }, this);
        let seq = cc.sequence(scale,scaleR,func);
        self.showItemList[index].active = true;
        self.showItemList[index].opacity = 255;
        self.imgList[index].runAction(seq);
        

    },
    LAction:function(){

    },
    initWork:function(work,owner,size){
        this._work = work;
        // console.log('this._work ==',this._work);
        this.showItemList =[];
        if(this._work.length>=2){
            for (let index = 0; index < this.imgList.length; index++) {
                let node = this.imgList[index];
                node.removeAllChildren();
                if(index<this._work.length){
                    node.width =size.width;
                    node.height = size.height;
                    node.x = node.width*index+1;
                    const element = this._work[index];
                    let sprframe =owner.Atlas.getSpriteFrame(element);
                    let tempNode = new cc.Node();
                    let sprite = tempNode.addComponent(cc.Sprite);
                    sprite.spriteFrame =sprframe;
                    tempNode.width =size.width;
                    tempNode.height = size.height;
                    tempNode.parent = node;
                    this.showItemList.push(tempNode);
                    if(this._isStarReward&&index<this._rewarStarNum-1){
                        let star = new cc.Node();
                        star.addComponent(cc.Sprite).spriteFrame = this.starSpr.spriteFrame;
                        star.width =size.width;
                        star.height =size.height;
                        star.parent = node;
                        this._rewardList.push(star);
                    }
                }else{
                    node.active = false;
                }

            }
        }
    }
});
