
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
        if(cc.sys.os === cc.sys.OS_ANDROID){
            var agent = anysdk.agentManager;
            var user_plugin = agent.getUserPlugin();
            user_plugin.removeListener();
            user_plugin.setListener(this.onUserResult, this);
            cc.log('user_plugin',user_plugin);
        }
    },
    onUserResult:function(code, msg){
        cc.log("on user result action.");
        cc.log("+msg:"+msg); 
        cc.log("+code:"+code);        //这里可以根据返回的 code 和 msg 做相应的处理
        var agent = anysdk.agentManager;
        var user_plugin = agent.getUserPlugin();
        switch(code)
        {
            case anysdk.UserActionResultCode.kInitSuccess://初始化 SDK 成功回调
                //SDK 初始化成功，login方法需要在初始化成功之后调用
                if(!user_plugin) return;
                user_plugin.login();
                cc.log("SDK 初始化成功，login方法需要在初始化成功之后调用");
                break;
                case anysdk.UserActionResultCode.kLoginNetworkError: //登陆网络出错回调
                cc.log("登陆网络出错回调");
                break;
                case anysdk.UserActionResultCode.kLoginCancel: //登陆取消回调
                cc.log("登陆取消回调");
                break;
                case anysdk.UserActionResultCode.kLoginFail: //登陆失败回调
                cc.log("登陆失败回调");
                break;
        }
        cc.log('+getUserID::'+user_plugin.getUserID())
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
