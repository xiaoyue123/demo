
cc.Class({
    extends: cc.Component,

    properties: {
        actionNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onShare:function(){

    },
    onClose:function(){
        // this.node.active = false;
        this.MoveActionHide();
    },
    onQuit:function(){
        this.onClose();
        cc.tools.dispatchEvent(cc.tools.GameConfig.Event.GUO_DU_ANI,function(){
            // cc.tools.getBattleComp().onShowChapter();
            cc.tools.dispatchEvent(cc.tools.Event.CLEAR_WORD_DATA);
            cc.tools.dispatchEvent(cc.tools.Event.SHOW_LEVELS,cc.tools.gameManager.getUserChapter());
        });
    },
    onThemes:function(){

    },
    onHelp:function(){

    },
    onBgm:function(){

    },
    onSound:function(){

    },
    show:function(){
        this.node.active = true;
        this.MoveActionShow();
    },
    MoveActionShow:function(){
        let action = cc.moveBy(0.1, 0, -100);
        let action3 = cc.moveBy(0.1, 0, 100);
        this.actionNode.y= 1000;
        let action2 = cc.moveBy(0.3, 0, -1000);
        let self = this;
        let call = cc.callFunc(() => {
            self.actionNode.y=0;
        });
        this.actionNode.runAction(cc.sequence(action2,action,action3,call));
    },
    MoveActionHide:function(){
        let action2 = cc.moveBy(0.2, 0, 1000);
        let self = this;
        let call = cc.callFunc(() => {
            self.node.active=false;
        });
        this.actionNode.runAction(cc.sequence(action2,call));    
    }

    // update (dt) {},
});
