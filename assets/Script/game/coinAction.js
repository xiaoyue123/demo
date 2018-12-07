
cc.Class({
    extends: cc.Component,

    properties: {
        ani:cc.Animation,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    showCoinAction:function(){
        let animCtrl = this.ani;
        animCtrl.play();
        let self = this;
        animCtrl.on('finished', function(event){
            self.node.active = false;
            tools.dispatchEvent(tools.Event.UPDATE_COIN);
       }, this);
    }
    // update (dt) {},
});
