var DropArray = [];
var WeaponAtlas = null;
var tools = {
    requestInterval:0,
    shareBeforeTime:0,
    shareAfterTime:0,
    objManager:null,
    HitNumber: function (node, hit, color, time, dirX, IsCrits) {  //飘字
        cc.loader.loadRes("Perfab/hitNumber", (err, prefab) => {
            let hitNode = cc.instantiate(prefab);
            let item = hitNode.getComponent('hitFont');
            item.setHitNumber(Math.abs(hit), IsCrits);
            hitNode.parent = node;
            hitNode.scale =1;
            var action = cc.sequence(cc.scaleTo(0.5, dirX * 0.8,1), cc.fadeOut(0), cc.callFunc(() => {
                hitNode.removeFromParent();
            }));
            hitNode.y = 100;
            hitNode.x = -20;
            hitNode.runAction(cc.moveBy(0.2, cc.v2(0, 100)));
            hitNode.runAction(action);
        });
    },
    getSpriteFrameByName:function(){

    },
    DBFactory: function () {
        return dragonBones.CCFactory.getInstance();
    },
    setRequestInterval:function(requestInterval){
        this.requestInterval = requestInterval;
    },
    getRequestInterval:function(){
        return this.requestInterval;
    },
    getTextureDisplay: function (textureName) {
        // let textureAtlasName = tools.GameConfig.ROLE_PROJECT_NAME;
        // if(textureName.substring(0,6)==tools.GameConfig.ROLE_ARMS_BONE_NAME){
        // return this.getWeaponSpriteFrameByName(textureName);
        return this.getSpriteFrameT(textureName);
        let atlas = this.DBFactory().getTextureAtlasData(textureAtlasName);
        let textureData = this.DBFactory()._getTextureData(textureAtlasName, textureName);
        let Sf = new cc.SpriteFrame();
        if (textureData) {
            // if (!textureData.texture) {
            var textureAtlasTexture = textureData.parent.texture;
            var rect = cc.rect(textureData.region.x, textureData.region.y, textureData.region.width, textureData.region.height);
            var offset = cc.p(0, 0);
            var originSize = cc.size(textureData.region.width, textureData.region.height);
            Sf.setTexture(textureAtlasTexture, rect, textureData.rotated, offset, originSize);
            // }
            return Sf;
        }
        return null;
    },
    getWeaponSpriteFrameByName: function (textureName) {
        if (WeaponAtlas && textureName) {
            return WeaponAtlas.getSpriteFrame(textureName);
        }
    },
    dropCoin: function (node, Pos, number) {
        let newCoin = number* (1+cc.tools.gameManager.getUserProfit());
        tools.UserData.coin = tools.UserData.coin +newCoin;
        let len = Math.floor(number); 
        if (number > tools.GameConfig.COIN_MAX_NUMBER) {
            len = tools.GameConfig.COIN_MAX_NUMBER;
        }
        this.UpdateCoin();
        for (let index = 0; index < len; index++) {
            this.loadingDrop(node, "Perfab/drop", Pos);
        }

    },
    loadHeroRes: function (res) {
        if (!WeaponAtlas) {
            // cc.loader.loadResDir((res), (err, assets) => {
            //     // console.log(" WeaponAtlas assets",assets);
            //     let assetResLength = assets.length;
            //     for (let i = 0; i < assetResLength; ++i) {
            //         if (assets[i] instanceof cc.SpriteAtlas) {
            //             // let spriteFrames = assetRes[i].getSpriteFrames();
            //             WeaponAtlas = assets[i];
            //         }
            //     }

            // });
            // cc.loader.loadResDir("Perfab/Enemy", (err, assets) => {
            //     // console.log(" enemy assets",assets);
            //     window.ResLoadOver = true;
            // });
            let tujianArray = [];
            for (let index = 1; index <= cc.tools.GameConfig.TUJIAN_SHOW_EQUIP_NUM; index++) {
                let name = index<10?'hat00':'hat0';
                name = 'tujian/'+name+index;
                tujianArray.push(name);
                let name1 = index<10?'weapon00':'weapon0';
                name1 = 'tujian/'+name1+index;
                tujianArray.push(name1);
            }

            cc.loader.loadResArray(tujianArray, cc.SpriteFrame, null,function (err, assets) {
                if (err) {
                    cc.error(err);
                    return;
                }
                WeaponAtlas = assets;
                // console.log("WeaponAtlas",WeaponAtlas);
            });

        }
    },
    getSpriteFrameT:function(name){
        for (let index = 0; index < WeaponAtlas.length; index++) {
            const element = WeaponAtlas[index];
            if(element.name==name){
                return element;
            }     
        }
        return null;
    },
    coinShake:function(){
        cc.tools.dispatchEvent(cc.tools.GameConfig.Event.SHAKE_COIN_EVENT);
    },
    loadingDrop(parentNode, panelName, Pos) {//加载图层
        cc.loader.loadRes(panelName, (err, prefab) => {
            let node = cc.instantiate(prefab);
            let randX = this.getIntervaRandom(-100, 200);
            if (Pos) {
                node.x = Pos.x + randX;
            }
            node.y = 200;
            parentNode.addChild(node);
            let item = node.getComponent('drop');
            this.addDropItem(item);
        });
    },
    addDropItem: function (item) {
        DropArray.push(item);
    },
    removeDropItem: function (item) {
        let index = DropArray.indexOf(item);

        DropArray.splice(index, 1);
    },
    setBattleComp: function (Comp) {
        this.BattleComponent = Comp;
    },
    getBattleComp: function () {
        return this.BattleComponent;
    },
    UpdateCoin: function () {
        this.BattleComponent.updateCoin();
        this.chaneCoinShowAb(tools.UserData.coin);
    },
    getUserData: function () {
        return tools.UserData;
    },
    setDisBird: function (bird) {
        this.birdJs = bird;
    },
    getDisBird: function () {
        return this.birdJs;
    },
    dispatchBird: function () {
        this.getDisBird().dispatch();
    },
    getIntervaRandom: function (begin, end) {

        if (begin >= 0) {
            end = 1 + (end - begin);
        } else {
            end = 1 + (end + Math.abs(begin));
        }
        var random = Math.floor(begin + Math.random() * end);
        return random;
    },
    registerEventListener: function (eventType, target, method) {
        if (!eventType || !target || !method) {
            return;
        }
        let eventsListener = tools.eventsListener;
        let listeners = eventsListener[eventType];
        if (!listeners) {
            listeners = {}
            eventsListener[eventType] = listeners;
        } else {
            for (let index = 0; index < listeners.length; index++) {
                const listener = listeners[index];
                if (listener[0] == target && listener[1] == method) {
                    return;
                }

            }
        }
        let listener = { target, method };
        listeners[0] = (listener);
    },
    dispatchEvent: function (eventType, some) {
        if (!eventType) { return; }
        let listeners = tools.eventsListener[eventType] || {};
        for (const key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                const listener = listeners[key];
                listener.method(listener.target, eventType, some);
            }
        }
    },
    removeTargetEventListenerByType: function (target, eventType) {
        if (!target || !eventType) { return; }
        let listeners = tools.eventsListener[eventType] || {};
        for (const key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                tools.eventsListener[eventType] = null;
                break;
            }
        }
    },
    removeTargetAllEventListener: function (targetObj) {
        if (!targetObj) { return; }
        for (const event_key in tools.eventsListener) {
            let listeners = tools.eventsListener[event_key];
            for (const key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    const listener = listeners[key];
                    if (targetObj.target == listener.target) {
                        tools.eventsListener[event_key] = null;
                    }
                }
            }
        }
    },
    removeAllEventListener: function () {
        tools.eventsListener = {};
    },
    replaceJsonUrl: function (url) {
        if(CC_WECHATGAME){
            return url;
        }
        return url.replace("raw-assets", "import");
    },
    chaneCoinShowAb: function (coin) {
        return this.forEachCoin(parseFloat(coin));
    },
    forEachCoin: function (num) {
        let array = cc.tools.GameConfig.CONI_CONFIG;
        let a = num / 1000;
        if (num < cc.tools.GameConfig.CHANGE_SHOW_COIN_IS_A_B) {
            let str = num+"";
            if(str.length<cc.tools.GameConfig.COIN_SHOW_BIT){
                str= str.slice(0,str.length);
            }else{
                str= str.slice(0,cc.tools.GameConfig.COIN_SHOW_BIT);
            }
            return this.floatTobit2(str);
        }
        let CoinArray = [a, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let AbCoin = CoinArray[0] + array[0];;
        for (let index = 0; index < array.length; index++) {

            let str = CoinArray[index].toString();
            if (str.length < cc.tools.GameConfig.COIN_SHOW_BIT) {
                str = str.slice(0, str.length);
            } else {
                str = str.slice(0, cc.tools.GameConfig.COIN_SHOW_BIT);
            }
            AbCoin = this.floatTobit2(str) + array[index];
            if (CoinArray[index] > 1000) {
                CoinArray[index + 1] = CoinArray[index] / 1000;
            } else {
                break;
            }

        }
        return AbCoin;
    },

    toDate:function(str){  
        var converted = Date.parse(str);  
        var myDate = new Date(converted);  
        if (isNaN(myDate)) {  
            var arys= str.split('-');  
            myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);  
        }  
        return myDate;  
    },
    dateDiff:function (dtStart, dtEnd, strInterval) {
        var tempDate = new Date();
        if (typeof dtStart === 'string') {
            dtStart = this.toDate(dtStart);
        }
        if (typeof dtEnd === 'string') {
            dtEnd = this.toDate(dtEnd);
        }
        switch (strInterval) {
            case 's'://秒
                tempDate = Math.abs(parseInt((dtEnd - dtStart) / 1000));
                break;
            case 'n'://分
                tempDate = Math.abs(parseInt((dtEnd - dtStart) / 60000));
                break;
            case 'h'://时
                tempDate = Math.abs(parseInt((dtEnd - dtStart) / 3600000));
                break;
            case 'd'://天
                tempDate = Math.abs(parseInt((dtEnd - dtStart) / 86400000));
                break;
            case 'w'://周
                tempDate = Math.abs(parseInt((dtEnd - dtStart) / (86400000 * 7)));
                break;
            case 'm'://月
                tempDate = Math.abs((dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1));
                break;
            case 'y'://年
                tempDate = Math.abs(dtEnd.getFullYear() - dtStart.getFullYear());
                break;
        }
        return tempDate;
    },

    getTimeObjByStr: function (timeStr) {
        // timeStr = "2018-12-33 11:22:33";
        let timeArray = timeStr.slice(0, 10).split('-');
        let timeArray1 = timeStr.slice(11, timeStr.length).split(':');
        let timeObj = { FullYear: timeStr, Year: timeArray[0], Month: timeArray[1], Date: timeArray[2], Hours: timeArray1[0], Minutes: timeArray1[1], Seconds: timeArray1[2] };
        return timeObj;
    },
    getOffLineTime:function(){
        let ShouYiTime =parseInt(15*cc.tools.gameManager.getInviteNum());
        let offTime = cc.tools.GameTime.OffLineTime>30?30:cc.tools.GameTime.OffLineTime;
        if(cc.tools.GameTime.OffLineTime<1){
            return 0;
        }else{
            if(offTime+ShouYiTime<cc.tools.GameConfig.Reward.OFF_LINE_TIME){
                if(offTime<30){
                    return offTime;
                }
                return offTime+ShouYiTime;
            }else{
                return cc.tools.GameConfig.OFF_LINE_TIME;
            }
        }
    },
    createImage(avatarUrl, curSprite) {

        if (CC_WECHATGAME) {
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        curSprite.spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        curSprite.node.active = false;
                    }
                };
                image.src = avatarUrl;
            } catch (e) {
                cc.log(e);
                curSprite.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                curSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    },
    onShareMessageFunc: function (title,imageUrl,query,obj) {
        var self = this;
        self.objManager = obj;
        if(cc.tools.GameConfig.IsTiShenMode){
            self.objManager.getGoldCoinFunc();
        }else{
            if (CC_WECHATGAME) {
                var mydate1 = new Date();
                self.shareBeforeTime = Date.parse(mydate1);
                wx.shareAppMessage({
                    title: "原来大家都在玩这个呀!",
                    imageUrl: "http://m.qpic.cn/psb?/V10nkLfQ248ACq/1.CxJ6dNWl2FHaQxLC.DkS9KUvdwy3LXhwZDQdkUVeI!/b/dBMAAAAAAAAA&bo=9AGQAQAAAAARF0Q!&rf=viewer_4",
                    query: "inviteId=" + cc.tools.UserData.getWxUserData().id,
                });
                //  全局的监听 onshow
                wx.onShow(function(res){
                    if (self.shareBeforeTime) {
                        var mydate = new Date();
                        self.shareAfterTime = Date.parse(mydate);
                        console.log("刚点分享==",self.shareAfterTime,typeof(self.shareAfterTime));
                    }
                    console.log("分享到回到游戏时间差====", self.shareAfterTime - self.shareBeforeTime);
                    //当天第一次分享
                    if (cc.sys.localStorage.getItem(cc.tools.GameConfig.Reward.SHARE_TIME) == 0) {
                        cc.sys.localStorage.setItem(cc.tools.GameConfig.Reward.SHARE_TIME, 1);
                        if (self.shareAfterTime - self.shareBeforeTime >= 2500) {
                            if (self.shareBeforeTime>0) {
                                self.objManager.getGoldCoinFunc();
                                console.log("当日第一次分享");
                                self.shareBeforeTime = 0;
                                self.shareAfterTime = 0;
                                self.objManager = null;
                            }
                        }
                        //当天第二次分享
                    } else {
                        if (self.shareAfterTime - self.shareBeforeTime >= 4000) {
                            console.log("diercialdsaljsfdp=",self.shareBeforeTime)
                            if (self.shareBeforeTime>0) {
                                console.log("当日第二次分享");
                                self.objManager.getGoldCoinFunc();
                                self.shareBeforeTime = 0;
                                self.shareAfterTime = 0;
                                self.objManager = null;
                            }
                        } else {
                            if (self.shareBeforeTime>0) {
                                self.objManager.showShareTip();
                                self.shareBeforeTime = 0;
                                self.shareAfterTime = 0;
                                self.objManager = null;

                            }
                        }
                    }
                    
                });
            }
        }
    },
    onShareMessageFuncDoNothing:function(title,imageUrl,query,obj){
        if (CC_WECHATGAME) {
            wx.shareAppMessage({
                title: "原来大家都在玩这个呀!",
                imageUrl: "http://m.qpic.cn/psb?/V10nkLfQ248ACq/17syzhFvdbwb8N2Sk83wCIMrQQ1IiyA8jd4T4nkbB6Q!/b/dEAAAAAAAAAA&bo=9AGQAQAAAAARF0Q!&rf=viewer_4",
                query: "inviteId=" + cc.tools.UserData.getWxUserData().id
            });
        }
    },
    ClearData:function(){
        this.UserData.clearUserData();
        // this.UserData.clearRewardData();
        // this.UserData.clearOnLineRewardData();
        // cc.director.getScheduler().unscheduleAllForTarget(this.getBattleComp());
        // cc.director.loadScene(cc.tools.GameConfig.BATTLE_SCENE);
    },
    floatTobit2:function(FloatStr){
        var a = FloatStr.toString();
        // var len = FloatStr.toString().length;
        var aNew;
        var re = /([0-9]+.[0-9]{2})[0-9]*/;
        aNew = a.replace(re,"$1");
        return aNew;
    },

    // date.getFullYear();  // 获取完整的年份(4位,1970)
    // date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    // date.getDate();  // 获取日(1-31)
    // date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
    // date.getHours();  // 获取小时数(0-23)
    // date.getMinutes();  // 获取分钟数(0-59)
    // date.getSeconds();  // 获取秒数(0-59)
};
tools.IsGuideState = false;
tools.AudioManager = require('AudioManager');
tools.UserData = require('UserData');
tools.GameConfig = require('gameConfig');
require('MessageHttp');
tools.Event = tools.GameConfig.Event;
tools.wxUserData = null;
// tools.GameTime = require('GameTime');
tools.eventsListener = {};
module.exports = cc.tools = tools;