

cc.Class({
    extends: cc.Component,

    properties: {
        _chapter:0,
        _level:0,
        lab_name:cc.Label,
        _isSpecial:false,
        btnPlay:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    play:function(){
        let self = this;
        console.log('this._chapter ==',this._chapter);
        console.log('this._level ==',this._level);
        cc.tools.dispatchEvent(cc.tools.GameConfig.Event.GUO_DU_ANI,function(){
            cc.tools.dispatchEvent(cc.tools.Event.HIDE_CHAPTER);
            cc.tools.dispatchEvent(cc.tools.Event.HIDE_LEVELS);
            cc.tools.gameManager.setCurChapterLevel(self._chapter,self._level);
            cc.tools.gameManager.OpenSpecialLevel(self._isSpecial);
            cc.tools.getBattleComp().openNewLevel();
        });
        cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.startBtnAudio);
    },
    init:function(chapter,level,isSpecial,isUnlock){
        this._chapter = chapter;
        this._level = level;
        this.lab_name.string = "level "+this._level;
        if(isSpecial){
            this._isSpecial = isSpecial;
            this.lab_name.string = "Special";
        }
        this.btnPlay.active = isUnlock;
    }
    // update (dt) {},
});
