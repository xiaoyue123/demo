
cc.Class({
    extends: cc.Component,

    properties: {
        pos1:cc.Node,
        pos2:cc.Node,
        pos3:cc.Node,
        pos4:cc.Node,
        pos5:cc.Node,
        pos6:cc.Node,
        pos7:cc.Node,
        pos8:cc.Node,
        pos9:cc.Node,
        pos10:cc.Node,
        pos11:cc.Node,
        pos12:cc.Node,
        pos13:cc.Node,
        pos14:cc.Node,
        pos15:cc.Node,
        pos16:cc.Node,

        _Answer:[],
        _work:'',
        finishItem:cc.Prefab,
        // _finishList:[],
        _hideTask:[],
        _RewardWord:[],
        _isOpenRewardState:false,
        _RewardIndex:0,
        _RewardStarNum:0,
        _RewardCoin:0,
        _finishList:[],
        _isOpenSpecialLevel:false,
        _hideList:[],
    },
    start () {

    },
    onLoad:function(){
        this.registerEvent();
        this.posList = new Array();
        this.posList.push(this.pos1);
        this.posList.push(this.pos2);
        this.posList.push(this.pos3);
        this.posList.push(this.pos4);
        this.posList.push(this.pos5);
        this.posList.push(this.pos6);
        this.posList.push(this.pos7);
        this.posList.push(this.pos8);
        this.posList.push(this.pos9);
        this.posList.push(this.pos10);
        this.posList.push(this.pos11);
        this.posList.push(this.pos12);
        this.posList.push(this.pos13);
        this.posList.push(this.pos14);
        this.posList.push(this.pos15);
        this.posList.push(this.pos16);
    },
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.TI_SHI,this,this.Tips);
    },
    Tips:function(target){
        target.showTishi();  
    },
    isFinishWork:function(work){
        let isRight = false;
        let isFinish = false;
        let item = null;
        let FinishIndex = null;
        for (let index = 0; index < this._itemlist.length; index++) {
            const element = this._itemlist[index];
            if(work==element.getWork()){
                isRight = true;
                FinishIndex = index;
                item = element;
                break;
            }
        }
        if(isRight){
            isFinish = cc.tools.gameManager.addFinishList(work);
            if(cc.tools.gameManager.getCurChapterIndexs().length >=this._Answer.length){
                // cc.tools.gameManager.nextLevel();
                cc.tools.dispatchEvent(cc.tools.GameConfig.Event.SHOW_SETTLEMENT);
            }
        }else{
            //查找是否是隐藏任务
        }
        if(item&&item.IsStarReward()&&!isFinish){
            console.log("IsStarReward == 星星奖励",this._RewardCoin);
            cc.tools.dispatchEvent(cc.tools.Event.START_REWARD,this._RewardCoin);
        }
        if(item&&!isFinish){
            this._finishList[FinishIndex]= true;
            cc.tools.gameManager.UpdateCurLevelData(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel(),this._finishList,this._isOpenSpecialLevel)
            item.FinishWordAction();
            
        }
        let isHideTask = this.isHideTask(work);
        let isHideHave = false;
        if(isHideTask){
             isHideHave = cc.tools.gameManager.addHideTaskList(this._hideList,work);
        }
        let obj ={'isRight':isRight,
        'isfinish':isFinish,
        'isHideTask':isHideTask,
        'isHideHave':isHideHave,
        };
        return obj;
    },
    isHideTask:function(word){
        let isHideTask = false;
        for (let index = 0; index < this._hideTask.length; index++) {
            const element = this._hideTask[index];
            if(word==element){
                isHideTask = true;
                break;
            }
        }
        return isHideTask;
    },
    showTishi:function(){
        let item = null;
        let curIndex = 0;
        for (let index = 0; index < this._itemlist.length; index++) {
            const element = this._itemlist[index];
            if(!element.isFinish()&&element.isCanTihi()){
                item = element;
                curIndex = index;
                break;
            }
        }
        if(item){
            cc.tools.gameManager.updateTips(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel(),curIndex,cc.tools.gameManager.getTipsLevel());
            item.showByIndex(0);
        }else{
            if(cc.tools.gameManager.isMaxTishi()){
                cc.tools.gameManager.updateTipsLevel();
                this.showTishi();
            }else{
                // console.log('可提示的全部提示',cc.tools.gameManager.getCurLMaxchar());
            }
            
        }
    },
    initRewardWord:function(){
        if(this._RewardWord.length>0){
            this._isOpenRewardState = true;
        }
        for (let index = 0; index < this._RewardWord.length; index++) {
            const element = this._RewardWord[index];
            if(0==index){
                this._RewardIndex = parseInt(element)-1;
            }else if(1==index){
                this._RewardStarNum = parseInt(element);
            }else if(2==index){
                this._RewardCoin = parseInt(element);
            }
        }
    },
    initViewBywork:function(workData,obj,isOpenSpecialLevel){
        this._work = workData.title;
        this._isOpenSpecialLevel = isOpenSpecialLevel;
        this._Answer = workData.Answer.split(",");
        this._hideTask = workData.Hidetask.split(",");
        this._RewardWord = workData.RewardWord.split(",");
        this.initRewardWord();
        this._hideList = cc.tools.gameManager.getHideWordByChapterAndlevel(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel());
        this._itemlist =[];
        let posList = cc.tools.gameManager.getFinishWordListPos(this._Answer.length);
        let curLevelData = cc.tools.gameManager.getcurLevelDatas();
        let tipsList =  cc.tools.gameManager.getTipsByChapterAndlevel(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel());
        if(tipsList){
            cc.tools.gameManager.updateTipsLevelNum(tipsList.tipsLevel);
        }
        let list = cc.tools.gameManager.getCurLevelDataFinishList();
        this._finishList =[];
        if(list&&list.length>0){
            this._finishList = list;
        }else{
            for (let index = 0; index < this._Answer.length; index++) {
                this._finishList.push(false);
            }
        }
        cc.tools.gameManager.UpdateCurLevelData(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel(),this._finishList,this._isOpenSpecialLevel)
        for (let index = 0; index < this.posList.length; index++) {
            const element = this.posList[index];
            element.removeAllChildren();
            if(index<this._Answer.length){
                let work = this._Answer[index];
                element.active = true;
                element.position = posList[index].pos;
                let size = cc.size(posList[index].width,posList[index].height);
                let item =cc.instantiate(this.finishItem);
                item.parent = element;
                item.position = cc.v2(0,0);
                if(this._isOpenRewardState&&this._RewardIndex ==index){
                    item.getComponent(cc.Component).initStarReward(this._RewardStarNum);
                }
                item.getComponent(cc.Component).initWork(work,obj,size);
                if(isOpenSpecialLevel){
                    let isFinish = this.isFinish(work);
                    item.getComponent(cc.Component).showFinishItems(isFinish);
                    // if(!isFinish){ 
                        this._itemlist.push(item.getComponent(cc.Component));
                    // }
                }else{
                    if(curLevelData.isSpecialLevel){
                        this._finishList[index] =false;
                    }
                    item.getComponent(cc.Component).showFinishItems(this._finishList[index]);
                    this._itemlist.push(item.getComponent(cc.Component));
                }
                if(this._finishList[index]){
                    cc.tools.gameManager.addFinishList(work);
                }
                if(tipsList&&tipsList.list.length>0){  //如果有提示数据
                    for (let i = 0; i < tipsList.list.length; i++) {
                        let curTipsindex = tipsList.list[i].index;
                        let wordIndex = tipsList.list[i].tipsWord;
                        // console.log(curTipsindex,wordIndex);
                        if(curTipsindex==index ){ // 如果当前的提示数据
                            item.getComponent(cc.Component).showTishiBycount(wordIndex+1);
                            break;
                        }
                        
                    }
                    
                }
            }else{
                element.active = false;
            }
            
        }
    },
    isFinish:function (word) {
            let data = cc.tools.DataManager.getDataByChapterAndLevel(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel());
            var isHave = false;
            let _Answer = data.Answer.split(",");
            for (let index = 0; index < _Answer.length; index++) {
                const element = _Answer[index];
                if (element == word) {
                    isHave = true;
                    break;
                }
            }
            cc.tools.UserData.curFinishLevel  = _Answer;
            // for (var index = 0; index < cc.tools.UserData.curFinishLevel.length; index++) {
            //     var element = cc.tools.UserData.curFinishLevel[index];
            //     if (element == word) {
            //         isHave = true;
            //         break;
            //     }
            // }
            return isHave;
        }
    // update (dt) {},
});
