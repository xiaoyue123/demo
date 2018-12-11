require('tools');
cc.Class({
    extends: cc.Component,

    properties: {
        Atlas:cc.SpriteAtlas,
        loadingView:cc.Node,
        _data:null,
        finishView:cc.Node,
        hideTask:cc.Node,
        ItemNode:cc.Node,
        hideTaskBtn:cc.Button,
        tipsNode:cc.Node,
        settlement:cc.Node,
        coinActionNode:cc.Node,
        settingNode:cc.Node,
        loginNode:cc.Node,
        guoduAni:cc.Node,
        chapterView:cc.Node,
        LevelsView:cc.Node,
        shopView:cc.Node,
    },
    // use this for initialization
    onLoad: function () {
        let self = this;
        cc.tools.setBattleComp(self);
        this.loadingView.active = true;
        this.registerEvent();
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    },
    registerEvent:function(){
        // cc.tools.registerEventListener(cc.tools.Event.LOADING_OVER_EVENT,this,this.loadCallEvent);
        cc.tools.registerEventListener(cc.tools.Event.OPEN_NEXT_LEVEL,this,this.updateLevel);
        cc.tools.registerEventListener(cc.tools.Event.OPEN_SPECIAl_LEVEL,this,this.messageOpenSpecialLevel);
        // cc.tools.registerEventListener(cc.tools.Event.COLLIS,this,this.getcollisDis);
        cc.tools.registerEventListener(cc.tools.Event.SHAKE_FINISH_HIDETAS,this,this.shakeHideTask); 
        cc.tools.registerEventListener(cc.tools.Event.SHOW_TIPS_TEXT,this,this.onShowTips); 
        cc.tools.registerEventListener(cc.tools.Event.SHOW_SETTLEMENT,this,this.onShowSettlement); 
        cc.tools.registerEventListener(cc.tools.Event.START_REWARD,this,this.starReward); 
        cc.tools.registerEventListener(cc.tools.Event.SHOW_COIN_ANI,this,this.showCoinAction); 
        cc.tools.registerEventListener(cc.tools.Event.GUO_DU_ANI,this,this.onShowGuoduAnimation); 
        cc.tools.registerEventListener(cc.tools.Event.SHOW_CHAPTER,this,this.onShowChapter); 
        cc.tools.registerEventListener(cc.tools.Event.SHOW_LEVELS,this,this.onShowLevels); 
        cc.tools.registerEventListener(cc.tools.Event.SHOW_SHOP,this,this.onShopMessage); 
    },
    init:function(){
        // cc.tools.UserData.chapter = 
        cc.director.getCollisionManager().enabled = true;
        let curLevelData = cc.tools.gameManager.getcurLevelDatas();
        cc.tools.UserData.level = curLevelData.Level;
        cc.tools.UserData.chapter = curLevelData.Chapter;
        let self = this;
        this.loginNode.active = false;
        this.ItemNode.getComponent(cc.Component).init(self);

    },
    loadCallEvent:function(target){
        target.init();
    },
    updateLevel:function(target){
        target.openNewLevel();
    },
    messageOpenSpecialLevel:function(target){
        target.OpenSpecialLevel();
    },
    OpenSpecialLevel:function(){
        console.log('getTipsLevel == ',cc.tools.gameManager.getTipsLevel());
        console.log('OPEN_SPECIAl_LEVEL 开启特殊关卡@!');
        this.openNewLevel();
    },
    openNewLevel:function(){
        this.ItemNode.getComponent(cc.Component).openNewLevel();
    },
    onChangeBtnEvent:function(){
        if(this.ItemNode.getComponent(cc.Component)._isMoveState) return;
        if(cc.tools.gameManager.IsConsumeCoin(this.ItemNode.getComponent(cc.Component)._data.consume)){
            if(cc.tools.gameManager.isMaxTishi()||this.finishView.getComponent(cc.Component).isHaveTips()){
                cc.tools.gameManager.TipsUser();
                cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.tipsAudio);
            }else{
                cc.tools.dispatchEvent(cc.tools.GameConfig.Event.SHOW_TIPS_TEXT,cc.gameConfig.TipsType.All_PROMPTS_COMPLETED);
            }
        }else{
            cc.tools.dispatchEvent(cc.tools.GameConfig.Event.SHOW_TIPS_TEXT,cc.gameConfig.TipsType.SHORTAGE_OF_COIN);
        }
    },
    onChangePos:function(){
        if(this.ItemNode.getComponent(cc.Component)._isMoveState) return;
        this.ItemNode.getComponent(cc.Component).changePos();
    },
    onShowTips:function(traget,event,data){
        traget.tipsNode.active = true;
        traget.tipsNode.getComponent(cc.Component).onShowText(data);
    },
    onShowHideTask:function(){
        if(this.ItemNode.getComponent(cc.Component)._isMoveState) return;
        this.hideTask.active = true;
        this.hideTask.getComponent(cc.Component).updateHideTaskNumber();
    },
    shakeHideTask:function(traget){
        let action = cc.spawn(cc.scaleTo(0.3, 1, 1),cc.moveBy(0.3, 0, -50));
        let action1 = cc.spawn(cc.scaleTo(0.3, 1.2, 1.2),cc.moveBy(0.3, 0, 50));
        traget.hideTaskBtn.node.runAction(cc.sequence(action1,action));
        cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.hideWordAudio);
    },
    showTipsText:function(){
        // this.tipsNode
    },
    onShowSettlement:function(traget){
        if(traget.ItemNode.getComponent(cc.Component)._isOpenSpecialLevel){
            if(!cc.tools.gameManager.isFinishLevel()){  //如果是已經完成的關卡不再給
                cc.tools.gameManager.addCoin(cc.tools.gameManager.getSpecialLevelData().consume);
            }
        }
        traget.settlement.active = true;
        cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.winAudio);
        traget.settlement.getComponent(cc.Component).init();
    },
    starReward:function(traget,event,data){
        cc.tools.gameManager.addCoin(data);
    },
    showCoinAction:function(traget){
        traget.coinActionNode.active = true;
        traget.coinActionNode.getComponent(cc.Component).showCoinAction();
    },
    onShowSetting:function(){
        this.settingNode.getComponent(cc.Component).show(); 
    },
    onShowGuoduAnimation:function(traget,event,func){
        traget.guoduAni.active = true;
        traget.guoduAni.getComponent(cc.Component).showAnimation(func);
    },
    onShowLogin:function(){
        this.loginNode.active = true;
    },
    onShowChapter:function(traget){
        this.chapterView.getComponent(cc.Component).onShow();
        // cc.tools.dispatchEvent(cc.tools.GameConfig.Event.GUO_DU_ANI,function(){
        //     traget.chapterView.getComponent(cc.Component).onShow();
        // });
        
    },
    onShowLevels:function(traget,event,chapter){
        traget.LevelsView.getComponent('levels').onShow(chapter);
    },
    onShopMessage:function(target){
        target.onShowShop();
    },
    onShowShop:function(){
        this.shopView.getComponent(cc.Component).show();
    },
    
});

