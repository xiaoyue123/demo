
cc.Class({
    extends: cc.Component,

    properties: {
        lab_text:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onShowText:function(type){
        this.node.position = cc.v2(0,0);
        this.node.stopAllActions();
        let text =cc.gameConfig.TipsText[type];
        this.lab_text.string = text;
        let action = cc.moveBy(0.3, 0, -200);
        let action2 = cc.moveBy(0.3, 0, 200);
        let self = this;
        let call = cc.callFunc(() => {
            self.node.active = false;
        });
        this.node.runAction(cc.sequence(action,cc.delayTime(1.4),action2,call));
    }
    // update (dt) {},
});
