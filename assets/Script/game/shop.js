
cc.Class({
    extends: cc.Component,

    properties: {
        scroll:cc.ScrollView,
        content:cc.Node,
        itemPrefab:cc.Prefab,
        actionNode:cc.Node,
    },
    show:function(){
        this.node.active = true;
        this.MoveActionShow();
    },
    hide:function(){
        // this.node.active = false;
        this.MoveActionHide();
    },
    init:function(){
        if(this.content.getChildrenCount()>0){

        }else{
            let y = 0;
            let interval = 15;
            for(let key in cc.gameConfig.ShopList){
                let item = cc.instantiate(this.itemPrefab);
                item.position = cc.v2(0,y);
                item.parent = this.content;
                item.getComponent('shopItem').init(cc.gameConfig.ShopList[key]);
                y=y+item.height+interval;
                // console.log('cc.gameConfig.ShopList[key] ==',cc.gameConfig.ShopList[key]);
            }
            this.content.height = y;
            this.scroll.scrollToTop(0);
        }
  
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.init();
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
