
cc.Class({
    extends: cc.Component,

    properties: {
        scroll:cc.ScrollView,
        content:cc.Node,
        itemPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onBack:function(){
        cc.tools.dispatchEvent(cc.tools.GameConfig.Event.GUO_DU_ANI,function(){
            cc.tools.dispatchEvent(cc.tools.Event.HIDE_CHAPTER);
            cc.tools.getBattleComp().onShowLogin();
        });
    },
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.HIDE_CHAPTER,this,this.hideChapter);
    },
    start () {
        this.registerEvent();
    },
    hideChapter:function(target){
        // target.node.active = false;
        target.node.x = -2000;
    },
    initView:function(){
        let list=cc.tools.DataManager.getStageData();
        if(this.content.getChildrenCount()>0){
            for (let index = 0; index < this.content.getChildrenCount(); index++) {
                const item =this.content._children[index];
                let chapter = index+1;
                item.getComponent('chapterItem').init(item.getComponent('chapterItem')._data,chapter);
            }
        }else{
            let y = 0;
            let interval = 15;
            for (let index = list.length-1; index >= 0; index--) {
                let item = cc.instantiate(this.instan);
                item.position = cc.v2(0,y);
                item.parent = this.content;
                let chapter = index+1;
                item.getComponent('chapterItem').init(list[index],chapter);
                y=y+item.height+interval;
                // height+=item.height;
                
            }
            this.content.height = y;
            this.scroll.scrollToTop(0);
        }

    },
    onShow:function(){
        this.instan =  cc.instantiate(this.itemPrefab);
        this.itemHeight = this.instan.height+10;
        this.node.x = 0;
        this.initView();
    },

    // update (dt) {},
});
