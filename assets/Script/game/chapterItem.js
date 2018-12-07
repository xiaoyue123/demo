
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab:cc.Prefab,
        lab_name:cc.Label,
        _data:null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },
    init:function(data,stage){
        this._data = data;
        this.instan =  cc.instantiate(this.itemPrefab);
        this.itemHeight = this.instan.height;
        let y = 0;
        this.lab_name.string = data.name+"";
        for (let index = data.chapterList.length-1; index >= 0; index--) {
            // const element = data.levelList[index];
            let item = cc.instantiate(this.instan);
            // let chapter = index+1;
            item.position = cc.v2(50,y);
            item.parent = this.node;
            item.getComponent('chapterLevelItem').init(data.chapterList[index]);
            y=y+this.itemHeight;
        }
        this.node.height = this.itemHeight* (data.chapterList.length)+50;
        this.lab_name.node.y=this.node.height;
        
    }
    // update (dt) {},
});
