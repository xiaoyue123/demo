
cc.Class({
    extends: cc.Component,

    properties: {
        _data:null,
        _chapter:0,
        _level:0,
        lab_name:cc.Label,
        btn_play:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },
    init:function(chapter){
        this._chapter = chapter;
        // this._level = level;
        this._data = cc.tools.DataManager.getDataByChapter(this._chapter);
        let curLevelData = cc.tools.gameManager.getcurLevelDatas();
        console.log("max chapter == ",this._chapter);
        let isUnlock = chapter<=curLevelData.Chapter;        
        this.lab_name.string = this._data.name;
        this.btn_play.active = isUnlock;
    },
    //打开每个章节对应的list
    onPlay:function(){
        console.log("打开章节  == ",this._chapter);
        let self = this;
        cc.tools.dispatchEvent(cc.tools.GameConfig.Event.GUO_DU_ANI,function(){
            cc.tools.dispatchEvent(cc.tools.Event.SHOW_LEVELS,self._chapter);
        });
        cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.startBtnAudio);
    }

    // update (dt) {},
});
