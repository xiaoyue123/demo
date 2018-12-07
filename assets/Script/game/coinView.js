
cc.Class({
    extends: cc.Component,

    properties: {
        lab_coin:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.registerEvent();
        this.lab_coin.string = cc.tools.gameManager.getUserCoin() +'';
    },
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.UPDATE_COIN,this,this.UpdateCoin);
    },
    UpdateCoin:function(target){
        target.lab_coin.string = cc.tools.gameManager.getUserCoin() +'';
    },
    start () {

    },
    onShowShop:function(){
        cc.tools.dispatchEvent(cc.tools.Event.SHOW_SHOP);
    },
});
