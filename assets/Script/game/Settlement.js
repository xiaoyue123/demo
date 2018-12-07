
cc.Class({
    extends: cc.Component,

    properties: {
        img_coin:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init:function(){
        // if(cc.tools.gameManager.isOpenSpecial()){
            
        // }
        this.img_coin.active = cc.tools.gameManager.isOpenSpecial();
    },
    onClose:function(){
        this.node.active = false;
        cc.tools.gameManager.nextLevel();
    }
    // update (dt) {},
});
