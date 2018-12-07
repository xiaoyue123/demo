
cc.Class({
    extends: cc.Component,

    properties: {
        lab_coin:cc.Label,
        lab_usd:cc.Label,
        _data:null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init:function(data){
        this._data = data;
        this.lab_coin.string = data.coinNum+"";
        this.lab_usd.string = data.buy+'';
    },
    onBuy:function(){
        console.log('this._data == ',this._data);
    }
    // update (dt) {},
});
