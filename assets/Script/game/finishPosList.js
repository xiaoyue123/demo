

cc.Class({
    extends: cc.Component,

    properties: {
        posList1:cc.Node,
        posList2:cc.Node,
        posList3:cc.Node,
        posList4:cc.Node,
        posList5:cc.Node,
        posList6:cc.Node,
        posList7:cc.Node,
        posList8:cc.Node,

        posList9:cc.Node,
        posList10:cc.Node,
        posList11:cc.Node,
        posList12:cc.Node,
        posList13:cc.Node,
        posList14:cc.Node,
        _allPosList:[],
    },
    initPoslist:function(){
        this._allPosList.push(this.getNodeInfo(this.posList1));
        this._allPosList.push(this.getNodeInfo(this.posList2));
        this._allPosList.push(this.getNodeInfo(this.posList3));
        this._allPosList.push(this.getNodeInfo(this.posList4));
        this._allPosList.push(this.getNodeInfo(this.posList5));
        this._allPosList.push(this.getNodeInfo(this.posList6));
        this._allPosList.push(this.getNodeInfo(this.posList7));
        this._allPosList.push(this.getNodeInfo(this.posList8));

        this._allPosList.push(this.getNodeInfo(this.posList9));
        this._allPosList.push(this.getNodeInfo(this.posList10));
        this._allPosList.push(this.getNodeInfo(this.posList11));
        this._allPosList.push(this.getNodeInfo(this.posList12));
        this._allPosList.push(this.getNodeInfo(this.posList13));
        this._allPosList.push(this.getNodeInfo(this.posList14));
        cc.gameConfig.FINISH_POS_LIST =this._allPosList;
        console.log('cc.gameConfig.FINISH_POS_LIST',cc.gameConfig.FINISH_POS_LIST);
    },
    getNodeInfo:function(node){
        let list = new Array();
        for (let index = 0; index < node._children.length; index++) {
            const element = node._children[index];
            let info = {'pos':element.position,'width':element._children[0].width,'height':element._children[0].height};
            list.push(info);
        }
        return list;
    },
    onLoad () {
        this.initPoslist();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
