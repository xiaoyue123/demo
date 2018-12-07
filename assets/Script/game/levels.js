

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab:cc.Prefab,
        content:cc.Node,
        scroll:cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onShow:function(chapter){
        this.node.active = true;
        this.init(chapter);
    },
    start () {
        this.registerEvent();
    },
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.HIDE_LEVELS,this,this.hideLevels);
    },
    hideLevels:function(target){
        target.node.active = false;
    },
    back:function(){
        cc.tools.dispatchEvent(cc.tools.GameConfig.Event.GUO_DU_ANI,function(){
            cc.tools.dispatchEvent(cc.tools.Event.HIDE_LEVELS);
            cc.tools.getBattleComp().onShowChapter();
        });
    },
    init:function(chapter){
        this.content.removeAllChildren();
        let data =cc.tools.DataManager.getDataByChapter(parseInt(chapter));
        console.log("levels == ",data.levelList);
        let curLevelData = cc.tools.gameManager.getcurLevelDatas();
        console.log("当前最高通关关卡 == ",curLevelData.Level,curLevelData.isSpecialLevel);
        // for (let index = 0; index < data.levelList.length; index++) {
        //     const element = array[index];
        // }
        let y = 0;
        let interval = 50;
        this.instan =  cc.instantiate(this.itemPrefab);
        this.itemHeight = this.instan.height+interval;
        for (let index = data.levelList.length-1; index >= 0; index--) {
            let item = cc.instantiate(this.instan);
            item.position = cc.v2(30,y);
            item.parent = this.content;
            let level = index+1;
            let isUnlock = level<=curLevelData.Level;
            if(chapter<curLevelData.Chapter){
                isUnlock = true;
            }
            item.getComponent('levelsitem').init(chapter,level,false,isUnlock);
            y=y+this.itemHeight;
            // height+=item.height;
            
        }
        if(cc.tools.DataManager.getDataByChapter(chapter).IsHaveSpecial){
            let item = cc.instantiate(this.instan);
            item.position = cc.v2(30,y);
            item.parent = this.content;
            let max = cc.tools.DataManager.getChapterMaxLevelNum(chapter);
            let level = max; // 最大的数量
            let isUnlock = curLevelData.isSpecialLevel;
            if(chapter<curLevelData.Chapter){
                isUnlock = true;
            }
            item.getComponent('levelsitem').init(chapter,level,true,isUnlock);
            y=y+this.itemHeight;
        }
        this.content.height = this.itemHeight* (this.content.getChildrenCount());
        this.scroll.scrollToTop(0);
    }
    // update (dt) {},
});
