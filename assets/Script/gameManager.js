
var UserData = cc.tools.getUserData();
var gameManager = {};
//获取用户章节
gameManager.getUserChapter =function(){
    return UserData.chapter;
}
//获取用户关卡
gameManager.getUserLevel =function(){
    return UserData.level;
}
//获取当前关卡完成的单词
gameManager.getCurChapterIndexs = function(){
    return UserData.curFinishLevel;
}
//更新章节
gameManager.updateChapter  =function(){
    UserData.updatechapter();
    cc.tools.gameManager.updateLevel();
}
//更新关卡
gameManager.updateLevel =function(){
    cc.tools.gameManager.clearCurBufData();
    UserData.updateLevel();
}
gameManager.clearCurBufData = function(){
    UserData.curFinishLevel =[];
    UserData.tipsLevel = 0;
},
//设置当前的章节和关卡
gameManager.setCurChapterLevel = function(chapter,level){
    UserData.chapter = chapter;
    UserData.level = level;
}
//当前完成关卡的索引
gameManager.updateCurChapterIndexs = function(indexList){
    UserData.updatecurFinishLevel(indexList);
}
//获取当前提示等级
gameManager.getTipsLevel = function(){
    return UserData.tipsLevel;
}
//更新当前提示等级
gameManager.updateTipsLevel = function(){
    UserData.updateTipsLevel();
}
//更新指定当前提示等级
gameManager.updateTipsLevelNum = function(level){
    UserData.tipsLevel=level;
}
//更新当前提示等级
gameManager.updateCurTipsLevel = function(num){
    UserData.updatecurTipsLevel(num);
}

gameManager.getTipsByChapterAndlevel = function(chapter,level){
    return UserData.getTipsByChapterAndlevel(chapter,level);
}
//提示玩家
gameManager.TipsUser = function(){
    cc.tools.dispatchEvent(cc.tools.GameConfig.Event.TI_SHI);
}
//获取当前关卡的数据
gameManager.getCurLevelData = function(){
    let data = cc.tools.DataManager.getDataByChapterAndLevel(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel());
    return data;
}
//获取当前关卡最大的字符
gameManager.getCurLMaxchar = function(){
    return cc.tools.DataManager.getcurlevelMaxChar(cc.tools.gameManager.getUserChapter(),cc.tools.gameManager.getUserLevel());
}
//是否可以繼續獲取提示
gameManager.isMaxTishi = function(){
    let _isMaxTishi = false;
    if(cc.tools.gameManager.isOpenSpecial()){
        // console.log('MaxCharLength == ',cc.tools.gameManager.getSpecialLevelData().MaxCharLength);
        _isMaxTishi = cc.tools.gameManager.getSpecialLevelData().MaxCharLength>cc.tools.gameManager.getTipsLevel();
    }else{
        _isMaxTishi = cc.tools.gameManager.getCurLMaxchar()>cc.tools.gameManager.getTipsLevel();
    }
    return _isMaxTishi;
}
gameManager.getUserCoin = function(){
    return UserData.coin;
}
//收益金币
gameManager.addCoin=function(coin){
    coin= parseInt(coin);
    UserData.UpdateCoin(UserData.coin + coin);
    cc.tools.dispatchEvent(cc.tools.Event.SHOW_COIN_ANI);
}
//是否足夠消耗人物金幣
gameManager.IsConsumeCoin =function(coin){
    let isConsume = (UserData.coin -coin)>=0;
    return isConsume;
}
//减少人物金幣
gameManager.ConsumeCoin =function(coin){
    UserData.UpdateCoin(UserData.coin -coin);
    // tools.dispatchEvent(tools.Event.UPDATE_UI_ARR_VIEW);
}
gameManager.addFinishList=function(word){
    let isHave = false;
    for (let index = 0; index < UserData.curFinishLevel.length; index++) {
        const element = UserData.curFinishLevel[index];
        if(element==word){
            isHave = true;
            break;
        }
    }
    if(!isHave){
        UserData.curFinishLevel.push(word);
    }
    return isHave;
}
gameManager.addHideTaskList=function(word){
    let isHave = false;
    for (let index = 0; index < UserData.hideTask.length; index++) {
        const element = UserData.hideTask[index];
        if(element==word){
            isHave = true;
            break;
        }
    }
    if(!isHave){
        UserData.hideTask.push(word);
        cc.tools.gameManager.updateHideTaskCurFinishNumber();
    }
    return isHave;
}
//开启下一关卡
gameManager.nextLevel = function(){
    if(cc.tools.gameManager.curChapterIsHaveSpecial()){
        if(cc.tools.gameManager.isOpenSpecialLevel()){
            if(cc.tools.gameManager.isOpenSpecial()){
                cc.tools.gameManager.updateChapter();
                cc.tools.gameManager.OpenSpecialLevel(false);
                cc.tools.dispatchEvent(cc.tools.GameConfig.Event.OPEN_NEXT_LEVEL);
            }else{
                cc.tools.gameManager.OpenSpecialLevel(true);
                UserData.tipsLevel = 0;
                cc.tools.dispatchEvent(cc.tools.GameConfig.Event.OPEN_SPECIAl_LEVEL);
            }
        }else{
            cc.tools.gameManager.updateLevel();
            cc.tools.dispatchEvent(cc.tools.GameConfig.Event.OPEN_NEXT_LEVEL);
        } 
    }else{
        if(cc.tools.gameManager.isOpenSpecialLevel()){
            cc.tools.gameManager.updateChapter();
            cc.tools.gameManager.OpenSpecialLevel(false);
            cc.tools.dispatchEvent(cc.tools.GameConfig.Event.OPEN_NEXT_LEVEL);
        }else{
            cc.tools.gameManager.updateLevel();
            cc.tools.dispatchEvent(cc.tools.GameConfig.Event.OPEN_NEXT_LEVEL);
        }
    }

}
//当前章节是否有隐藏关
gameManager.curChapterIsHaveSpecial= function(){
    let data = cc.tools.DataManager.getDataByChapter(cc.tools.gameManager.getUserChapter());
    return data.IsHaveSpecial;
}
//是否开启隐藏关卡
gameManager.isOpenSpecialLevel = function(){
    let max = cc.tools.DataManager.getChapterMaxLevelNum(cc.tools.gameManager.getUserChapter());
    console.log("getUserLevel",cc.tools.gameManager.getUserLevel(),max);
    return cc.tools.gameManager.getUserLevel()+1>max;
}
//开启隐藏关卡
gameManager.OpenSpecialLevel = function(isopen){
    UserData.isOpenSpecial_Level(isopen)
}
//获取当前章节的隐藏光卡
gameManager.getSpecialLevelData = function(){
    return cc.tools.DataManager.getChapterSpecialLevelData(cc.tools.gameManager.getUserChapter());
}
//是否开启了隐藏关卡
gameManager.isOpenSpecial = function(){
    return UserData.isOpenSpecial();
}

//获取当前字母坐标位置列表
gameManager.getWordListPos = function(num){
    return cc.gameConfig.POS_LIST[num-3];
}
//获取当前完成列表坐标位置列表
gameManager.getFinishWordListPos = function(num){
    return cc.gameConfig.FINISH_POS_LIST[num-3];
}
//更新隐藏任务完成数
gameManager.updateHideTaskCurFinishNumber = function(){
    UserData.updateHideTaskCurFinishNumber();
    cc.tools.dispatchEvent(cc.tools.Event.SHAKE_FINISH_HIDETAS);
}
//获取隐藏任务完成数
gameManager.getHideTaskCurFinishNumber = function(){
    return UserData.getHideTaskCurFinishNumber();
}
// 领取隐藏任务奖励
gameManager.receiveHideTaskReward = function(){
    UserData.receiveHideTaskCurFinishNumber(UserData.getHideTaskCurFinishNumber()-10);
    cc.tools.dispatchEvent(cc.tools.Event.UPDATE_FINISH_HIDETASK_NUMBER);
    cc.tools.gameManager.addCoin(25);
}
//更新提示信息
gameManager.updateTips = function(chapter,level,tipsIndex,tipsWord){
    UserData.UpdateTips(chapter,level,tipsIndex,tipsWord);
}
//获取提示信息
gameManager.getTips = function(){
    return UserData.getTips();
}
//更新当前的章节和关卡
gameManager.UpdateCurLevelData = function(chapter,level,wordFinish,isSpecialLevel){
    let isUpdate = cc.tools.gameManager.isUpdateChapterAndLevel();
    if(isUpdate){
        UserData.UpdateCurLevelData(chapter,level,wordFinish,isSpecialLevel);
    }
    console.log("是否更新数据？",isUpdate);
}
//获取当前的章节和关卡
gameManager.getcurLevelDatas = function(){
    return UserData.getcurLevelDatas();
}
//是否需要更新章节和关卡
gameManager.isUpdateChapterAndLevel = function(){
    let isUpdate = false;
    if(UserData.chapter>UserData.getcurLevelDatas().Chapter){
        return true;
    }else{
        if(UserData.chapter==UserData.getcurLevelDatas().Chapter&&UserData.level>=UserData.getcurLevelDatas().Level&&!UserData.getcurLevelDatas().isSpecialLevel){
            isUpdate = true;
        }
    }
    return isUpdate;
}
//获取当前关卡的完成数组
gameManager.getCurLevelDataFinishList = function(){
    // let isUpdate = cc.tools.gameManager.isUpdateChapterAndLevel();
    let list =null;
    if(UserData.chapter==UserData.getcurLevelDatas().Chapter&&UserData.level==UserData.getcurLevelDatas().Level){
        list= UserData.getcurLevelDatas().wordFinish;
    }
    return list;
}
module.exports =cc.tools.gameManager = gameManager;
