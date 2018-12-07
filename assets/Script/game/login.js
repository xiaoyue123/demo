
cc.Class({
    extends: cc.Component,

    properties: {

    },
    start () {
        
    },
    onPlay:function(){
        cc.tools.dispatchEvent(cc.tools.GameConfig.Event.GUO_DU_ANI,function(){
            cc.tools.getBattleComp().init();
        });
        cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.startBtnAudio);
    },
    onLoad: function () {
        this.registerEvent();
    },
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.LOADING_OVER_EVENT,this,this.loadCallEvent);
    },
    loadCallEvent:function(target){
        // target.init();
        cc.tools.getBattleComp().loadingView.active = false;
    },
    onSetting:function(){
        cc.tools.getBattleComp().onShowSetting();
    },
    onShop:function(){
        cc.tools.dispatchEvent(cc.tools.Event.SHOW_SHOP);
    },
    clearData:function(){
        cc.tools.ClearData();
    }
});
