
cc.Class({
    extends: cc.Component,

    properties: {
        lab_hideTaskNumber:cc.Label,
        progressBar:cc.ProgressBar,
        btn_receive:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.UPDATE_FINISH_HIDETASK_NUMBER,this,this.onMessageUpdate); 
    },
    onLoad:function () {
        this.registerEvent();
        this.updateHideTaskNumber();
    },
    onMessageUpdate:function(target){
        target.updateHideTaskNumber();
    },
    updateHideTaskNumber:function(){
        let number = cc.tools.gameManager.getHideTaskCurFinishNumber();
        this.lab_hideTaskNumber.string =  number+'/10';
        this.progressBar.progress = number / 10;
        this.btn_receive.active = number/10>=1;
    },
    start () {
    },
    onReceive:function(){
        if(cc.tools.gameManager.getHideTaskCurFinishNumber()>=10){
            cc.tools.gameManager.receiveHideTaskReward();
        }
    },
    onClose:function(){
        this.node.active = false;
    }

    // update (dt) {},
});
