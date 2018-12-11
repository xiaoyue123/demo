
cc.Class({
    extends: cc.Component,

    properties: {
        posList1:cc.Node,
        posList2:cc.Node,
        posList3:cc.Node,
        posList4:cc.Node,
        posList5:cc.Node,
        posList6:cc.Node,
        _allPosList:[],
    },
    initPoslist:function(){
        this._allPosList.push(this.getNodeInfo(this.posList1));
        this._allPosList.push(this.getNodeInfo(this.posList2));
        this._allPosList.push(this.getNodeInfo(this.posList3));
        this._allPosList.push(this.getNodeInfo(this.posList4));
        this._allPosList.push(this.getNodeInfo(this.posList5));
        this._allPosList.push(this.getNodeInfo(this.posList6));
        cc.gameConfig.POS_LIST =this._allPosList;
        // console.log('cc.gameConfig.POS_LIST',cc.gameConfig.POS_LIST);
    },
    // LIFE-CYCLE CALLBACKS:
    getNodeInfo:function(node){
        let list = new Array();
        for (let index = 0; index < node._children.length; index++) {
            const element = node._children[index];
            let info = {'pos':element.position,'width':element.width,'height':element.height};
            list.push(info);
        }
        return list;
    },
    onLoad () {
        this.initPoslist();
    },
    start () {

    },

    // update (dt) {},
});
