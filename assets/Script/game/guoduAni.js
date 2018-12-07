
cc.Class({
    extends: cc.Component,

    properties: {
        maskNode:cc.Node,
        tempNode:cc.Node,
        _MaskHeight:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    showAnimation:function(func){
        this.tempNode.scale = 1;
        this._MaskHeight = 1000;
        let scale = cc.scaleTo(0.5, 2,2);
        let scaleR = cc.scaleTo(0.3,0,0);
        let self = this;
        cc.director.getScheduler().unscheduleAllForTarget(self);
        this.tempNode.stopAllActions();

        let seq = cc.sequence(scaleR,cc.callFunc(function(){
            if(func){
                func();
            }
        }),scale,cc.callFunc(function(){
            self.node.active = false;
            cc.director.getScheduler().unscheduleAllForTarget(self);
        }));
        this.tempNode.runAction(seq);
        this.schedule(function() {
            this.maskNode.width =  this.tempNode.scale*this._MaskHeight;
            this.maskNode.height =  this.tempNode.scale*this._MaskHeight;
        }, 0.01);
    },
    // update (dt) {

    // },
});
