var tools = cc.tools;
// level
var levelData = function (data) {
    this.initData(data);
};
levelData.prototype.initData = function(data){
    this.data = [];
    this.hidelist =[];
    for (var key in data) {
        const element = data[key];  // value
        let maxChar = this.getCurLMaxchar(element.Answer);
        let Hidetask = "";
        if(element.Hidetask != "null"){
            Hidetask = element.Hidetask;
        }
        let RewardWord = "";
        if(element.RewardWord != "null"){
            RewardWord = element.RewardWord;
        }
        let obj={'title':element.title,
         'Answer':element.Answer,
         'MaxCharLength':maxChar,
         'Hidetask':Hidetask,
         'consume':element.consume,
         'key':key,
         'RewardWord':RewardWord,
        }
        this.hidelist.push({'key':key,Hidetask});
        // console.log('element',obj);
        this.data.push(obj);
    }
    console.log("this.hidelist == ",this.hidelist);
};
levelData.prototype.getDataByLevel = function(level){
    let value = null;
    for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        if(parseInt(element.key)== level ){
            value = element;
            break;
        }
    }
    return value;
};
levelData.prototype.getcurlevelMaxChar = function(level){
    return this.getDataByLevel(level).MaxCharLength;
};
levelData.prototype.getCurLMaxchar = function(data){
    let new_array =data.split(",");
    function sortNumber(a,b){
        return a.length - b.length
    }
    new_array.sort(sortNumber);
    return new_array[new_array.length-1].length;
};

var ChapterData = function (data) {
    this._ChapterData = new Array();
    this.initData(data);
    console.log('ChapterData == ',this._ChapterData);
};
ChapterData.prototype.getChapterData = function(){
    return this._ChapterData;
};
ChapterData.prototype.initData = function(data){
    this.data = data;
    for (var key in data) {
        let chapterData = data[key];
        let levelList =chapterData.levels.split("_");
        let isOpen = chapterData.HideLevel!="null";
        let obj={'levelList':levelList,
        'chapterReward':chapterData.chapterReward,
        'HideLevel':chapterData.HideLevel,
        'name':chapterData.name,
        'IsHaveSpecial':isOpen}
        this._ChapterData.push(obj);
    }
    // for (let index = 1; index <= 3; index++) {
    //    let chapterData = data[index];
    //    let levelList =chapterData.levels.split(",");
    //    let obj={'levelList':levelList,
    //    'chapterReward':chapterData.chapterReward,
    //    'HideLevel':chapterData.HideLevel,
    //   }
      
    // }
};
ChapterData.prototype.getDataByChapter = function(chapter){
    return this._ChapterData[chapter-1];
};
ChapterData.prototype.getChapterMaxLevelNum = function(chapter){
    return this._ChapterData[chapter-1].levelList.length;
};
ChapterData.prototype.getDataByChapterAndLevel = function(chapter,level){
    return cc.tools.DataManager.getDataByLevel(parseInt(this._ChapterData[chapter-1].levelList[level-1]));
};
var StageData = function (data) {
    this._StageData = new Array();
    this.initData(data);
    // console.log('_StageData == ',this._StageData);
}
StageData.prototype.initData = function(data){
    for (var key in data) {
        let _StageData = data[key];
        let chapterList =_StageData.chapter.toString().split(",");
        let obj={'chapterList':chapterList,
        'name':_StageData.name}
        this._StageData.push(obj);
    }
};
StageData.prototype.getStageData = function(){
    return this._StageData;
};
var DataManager = {
    init:function(){
        // this.LevelData =null; //关卡表
        DataManager.path ='resources/';
        this.initLevelData();
        this.initChapterData();
        this.initStageData();
    },
    initLevelData:function(){
        var url = cc.url.raw( DataManager.path+'data.json' ),type= cc.RawAsset;
        cc.loader.load(tools.replaceJsonUrl(url), function(err, data) {
            DataManager.LevelData = new levelData(data.json);
        });
    },
    initChapterData:function(){
        var url = cc.url.raw( DataManager.path+'chapter.json' ),type= cc.RawAsset;
        cc.loader.load(tools.replaceJsonUrl(url), function(err, data) {
            DataManager.ChapterData = new ChapterData(data.json);
        });
    },
    initStageData:function(){
        var url = cc.url.raw( DataManager.path+'stage.json' ),type= cc.RawAsset;
        cc.loader.load(tools.replaceJsonUrl(url), function(err, data) {
            DataManager.StageData = new StageData(data.json);
            window.DataLoadOver = true;
        });
    },
    getDataByLevel:function(level){
        return  DataManager.LevelData.getDataByLevel(level);
    },
    getDataByChapterAndLevel:function(chapter,level){
        return  DataManager.ChapterData.getDataByChapterAndLevel(chapter,level);
    },
    getDataByChapter:function(chapter){
        return  DataManager.ChapterData.getDataByChapter(chapter);
    },
    getChapterSpecialLevelData:function(chapter){
        return  DataManager.getDataByLevel(DataManager.ChapterData.getDataByChapter(chapter).HideLevel);
    },
    getChapterMaxLevelNum:function(chapter){
        return  DataManager.ChapterData.getChapterMaxLevelNum(chapter);
    },
    getcurlevelMaxChar:function(chapter,level){
        return DataManager.ChapterData.getDataByChapterAndLevel(chapter,level).MaxCharLength;
    },
    getChapterData:function(){
        return DataManager.ChapterData.getChapterData();
    },
    getStageData:function(){
        return DataManager.StageData.getStageData();
    }

};
module.exports = cc.tools.DataManager= DataManager;