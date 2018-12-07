var tools = cc.tools;
var dataManager =  cc.tools.DataManager;
var AudioManager =cc.tools.AudioManager;
cc.Class({
    extends: cc.Component,

    properties: {
        loadingBar: cc.ProgressBar,
        curLoadingCount: 0,
        posList:cc.Prefab,
        finishPosList:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    initPosList:function(){
        let item =cc.instantiate(this.posList);
        item.parent = this.node;

        let item1 =cc.instantiate(this.finishPosList);
        item1.parent = this.node;
    },
    clearData: function () {
        if (!this.IsLoading) {
            return;
        }
        // this.lab_state.string = "已清空玩家数据";
        tools.UserData.clearUserData();
        tools.UserData.clearRewardData();
        tools.UserData.clearOnLineRewardData();
    },
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.FINISH_INIT_USER_DATA,this,this.MessageUserInfo);
        cc.tools.registerEventListener(cc.tools.Event.LOAD_RES_PRO,this,this.loadResProgress);
    },
    MessageUserInfo:function(target){
        target.initData();
    },
    loadResProgress:function(target,event,pro){
        target.loadResBar.progress = pro;
        target.loadpet.x = target.loadResBar.node.width*pro;
        target.loadTextLab.string = '资源加载中，请稍后('+Math.floor(target.loadResBar.progress*100)+')%...';
    },
    initData:function(){

    },
    onLoad() {
        this.registerEvent();
        this.initPosList();
        window.tools = tools;
        this.curLoadingCount = 0;
        this.loadingBar.progress = this.curLoadingCount;
        // this.lab_state.node.active = false;
        // AudioManager.playBgAudio();
        this.schedule(function () {
            // 这里的 this 指向 component
            this.tick(0.01);
        }, 0.01);
    },
    tick(dt) {
        switch (this.curLoadingCount) {
            case 1:
                // tools.loadHeroRes("tujian");
                break;
            case 2:
                // if (!window.LoadUserData) {
                //     window.LoadUserData= false;
                //     this.Login();
                // }
                break;
            case 3:
                // if (false == window.LoadUserData) {
                //     if(this.timeCount>cc.tools.GameConfig.RECONNET_TIME){
                //         this.showNotice();
                //     }
                //     return;
                // }
                break;
            case 20://加载数据
                if (!window.DataLoadOver) {
                    window.DataLoadOver = false;
                    dataManager.init();
                }
                break;
            case 21:
                if (false == window.DataLoadOver) {
                    return;
                }
                break;
            case 90:
                if (!window.loadSene) {
                    window.loadSene= false;
                    // cc.director.preloadScene(cc.tools.GameConfig.BATTLE_SCENE, (error, asset) => {
                        window.loadSene = true;
                    // });
                }
                break;
            case 95:
            if (false == window.loadSene) {
                return;
            }
                break;
            case 100:
                cc.director.getScheduler().unscheduleAllForTarget(this);
                if (CC_WECHATGAME) {
                } else {
                    // this.btn_Start.active = false;
                    // this.loadShow.active = true;
                    // this.loadResBar.node.active=true;
                    // this.node.runAction( cc.sequence( cc.delayTime(3),cc.callFunc(() => {
                    this.onLoadBattleScene();
                    // }, this)));
                }
                break;
        }
        this.curLoadingCount += 1;

        if (window.DataLoadOver && window.DataLoadOver) {

        }
        this.loadingBar.progress = this.curLoadingCount / 100;
    },
    onLoadBattleScene: function () {
        // tools.DataManager = dataManager;
        // tools.UserData.initUserData();
        console.log('onLoadBattleScene');
        cc.tools.dispatchEvent(cc.tools.Event.LOADING_OVER_EVENT);
    },
    // update (dt) {
    // },
});
