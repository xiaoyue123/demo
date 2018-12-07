
cc.Class({
    extends: cc.Component,

    properties: {
        img:cc.Sprite,
        _word:'', // 每个工作的数据
        _rect:null,
        isConnectWork:false,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function () {
    },
    // start () {

    // },
    setRect:function(rect){
        this._rect = rect;
    },
    getRect:function(){
        this._rect = new cc.Rect(this.node.x-this.node.width*0.5, this.node.y-this.node.height*0.5, this.node.width, this.node.height)
        return this._rect;
    },
    setTexture:function(frame){
        this.img.spriteFrame = frame;
    },
    setWord:function(word){
        this._word = word;
    },
    getWord:function(){
        return this._word;
    },
    setConnectWork:function(connect){
        this.isConnectWork = connect;
    },
    getIsConnectWork:function(){
        return this.isConnectWork;
    },
    onCollisionEnter: function (other) {
        // this.node.color = cc.Color.RED;
        // console.log('onCollisionEnter',this.getWork());
        let event = {};
        event.type  = 'getcollisDis';
        event.obj = this;
        // this.node.parent.dispatchEvent(event);
        cc.tools.dispatchEvent(cc.tools.Event.COLLIS,event);
    },
    
    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },
    
    onSelectAction:function(){
        this.img.node.scale = 1.3;
    },
    unSelectAction:function(){
        this.img.node.scale = 1;
    },
    onCollisionExit: function () {

    },
    setCollisionEnable:function(enable){
        this.getComponent(cc.BoxCollider).enabled = enable;
    },
    actionShake:function(){
        this.node.stopAllActions();
        let pos = this.node.position;
        this.node.runAction(cc.sequence(cc.moveBy(0.1,  cc.v2(5,0)),cc.moveBy(0.1,  cc.v2(-7,0)),cc.moveTo(0,pos) ));
    },
    actionGlisten:function(){
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2),cc.scaleTo(0.2, 1, 1),cc.scaleTo(0.2, 1.2, 1.2),cc.scaleTo(0.2, 1, 1)));
    }
    // update (dt) {},
});
