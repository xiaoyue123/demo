var _tools =cc.tools||{};
var UserData ={
        chapter:1,//章节
        level:1,//关卡
        curFinishLevel:[],//当前完成关卡的索引
        tipsLevel: 0, //提示等級
        coin: 100000,// 金幣數
        hideTask:[],
        hideTaskCurFinishNumber:0,
        isOpenSpecialLevel:false,
        tipsList:[],
        maxChapter:0,
        maxLevel:0,
        curLevelData:{
            'Chapter':1,
            'Level':1,
            'wordFinish':[],
            'isSpecialLevel':false,
        },
        hideWords:[],
};
UserData.getHideWordByChapterAndlevel = function(chapter,level){
    let itemlist = null;
    for (let index = 0; index < this.hideWords.length; index++) {
        const element = this.hideWords[index];
        if(element.chapter==chapter&&element.level==level){
            itemlist = element;
            break;
        }
    }
    if(!itemlist){
        let list =[];
        itemlist = {'chapter':chapter,'level':level,'list':list};
        this.hideWords.push(itemlist);
    }
    return itemlist;
}
UserData.UpdatehideWords = function(hideList,word){
    let _isHave = false;
    for (let index = 0; index < hideList.list.length; index++) {
        if(hideList.list[index]==word){
            _isHave = true;
            break;
        }
    }
    if(!_isHave){
        hideList.list.push(word);
    }
    this.saveUserData();
    return _isHave;
}
// UserData.UpdatehideWords = function(chapter,level,word){
//     let isHave = false;
//     let itemlist = null;
//     let _isHave = false;
//     for (let index = 0; index < this.hideWords.length; index++) {
//         const element = this.hideWords[index];
//         if(element.chapter==chapter&&element.level==level){
//             isHave = true;
//             itemlist= element;
//             break;
//         }
//     }
//     if(!isHave){
//         let list =[];
//         list.push(word);
//         itemlist = {'chapter':chapter,'level':level,'list':list};
//         this.hideWords.push(itemlist);
//     }else{
//         for (let index = 0; index < itemlist.list.length; index++) {
//             if(itemlist.list[index]==word){
//                 _isHave = true;
//                 break;
//             }
//         }
//         if(!_isHave){
//             itemlist.list.push(word);
//         }
//     }
//     return isHave&&_isHave;
// },

UserData.getTipsByChapterAndlevel = function(chapter,level,isOpenSpecialLevel){
    let itemlist = null;
    // if(isOpenSpecialLevel!=this.curLevelData.isSpecialLevel){
    //     return null;
    // }
    for (let index = 0; index < this.tipsList.length; index++) {
        const element = this.tipsList[index];
        if(element.chapter==chapter&&element.level==level){
            itemlist = element;
            break;
        }
    }
    return itemlist;
}
UserData.UpdateCurLevelData = function(chapter,level,wordFinish,isSpecialLevel){
    this.curLevelData.Chapter = parseInt(chapter);
    this.curLevelData.Level = parseInt(level);
    this.curLevelData.wordFinish = wordFinish;
    this.curLevelData.isSpecialLevel = isSpecialLevel;
    this.saveUserData();
    // console.log("UserDataStringify == ",this.UserDataStringify());
}
UserData.getcurLevelDatas = function(){
    return this.curLevelData;
}
UserData.UpdateTips = function(chapter,level,tipsIndex,tipsWord){
    let isHave = false;
    let itemlist = null;
    for (let index = 0; index < this.tipsList.length; index++) {
        const element = this.tipsList[index];
        if(element.chapter==chapter&&element.level==level){
            isHave = true;
            itemlist = element;
            break;
        }
    }
    if(!isHave){
        let item = {'index':tipsIndex,'tipsWord':tipsWord}; //@index =第几个单词 ，@tipsWord =显示的内容
        let list =[];
        list.push(item);
        let obj = {'chapter':chapter,'level':level,'list':list,'tipsLevel':tipsWord};
        this.tipsList.push(obj);
    }else{
        let _isHave = false;
        for (let index = 0; index < itemlist.list.length; index++) {
            if(itemlist.list[index].index==tipsIndex){
                itemlist.list[index].tipsWord = tipsWord;
                itemlist.tipsLevel = tipsWord;
                _isHave = true;
                break;
            }
        }
        if(!_isHave){
            let item = {'index':tipsIndex,'tipsWord':tipsWord};
            itemlist.list.push(item);
        }
    }
    this.saveUserData();
},
UserData.getTips = function(){
    return this.tipsList;
},
UserData.updateLevel  = function(){
    this.level = parseInt(this.level);
    this.level +=1;
},
UserData.isOpenSpecial_Level = function(isOpen){
    this.isOpenSpecialLevel = isOpen;
},
UserData.isOpenSpecial = function(){
    return this.isOpenSpecialLevel;
},
UserData.updatechapter  = function(){
    this.level = 0;
    this.chapter = parseInt(this.chapter);
    this.chapter +=1;
},
UserData.updateTipsLevel  = function(){
    this.tipsLevel +=1;
},
UserData.updatecurTipsLevel  = function(num){
    this.tipsLevel =num;
},
UserData.UpdateCoin = function(coin){
    this.coin = coin;
    this.saveUserData();
},
UserData.updatecurFinishLevel = function(list){
    this.curFinishLevel = list;
},
UserData.updateHideTaskCurFinishNumber = function(){
    this.hideTaskCurFinishNumber +=1;
    this.saveUserData();
},
UserData.receiveHideTaskCurFinishNumber = function(num){
    this.hideTaskCurFinishNumber =num;
    this.saveUserData();
},
UserData.getHideTaskCurFinishNumber = function(){
    return this.hideTaskCurFinishNumber;
},
UserData.initUserData =function(){
    this.UpdateWeapon(this.weapon);
    this.UpdateHat(this.hat);
    this.UpdatePet(this.pet);
    this.UpdateCrits();
    this.UpdateCritsHit();
    //移除一次自己的武器
    this.removeHat(this.hat);
    this.removePet(this.pet);
    this.removeWeapon(this.weapon);
    this.addHat(this.hat);
    this.addPet(this.pet);
    this.addWeapon(this.weapon);
    function sortNumber(a,b)
    {
       let aLen = a.substr(a.length-3);
       let bLen = b.substr(b.length-3); 
       return bLen-aLen;
    }
    this.bag.weaponArray.sort(sortNumber);
    this.bag.hatArray.sort(sortNumber);
    this.bag.petArray.sort(sortNumber);
};
UserData.MakeData = function(strJson){
    // strJson = strJson.replace(/\ +/g, "");//去掉空格
    // strJson = strJson.replace(/[\r\n]/g, "");//去掉回车换行
    var jsonObj = JSON.parse(strJson);

    if(jsonObj.coin){
        this.coin=jsonObj.coin;
        this.coin=10000;
    }
    if(jsonObj.tipsList){
        this.tipsList = jsonObj.tipsList;
    }
    if(jsonObj.curLevelData){
        this.curLevelData = jsonObj.curLevelData;
        this.isOpenSpecialLevel = jsonObj.curLevelData.isSpecialLevel;
    }
    if(jsonObj.hideWords){
        this.hideWords = jsonObj.hideWords;
    }
    if(jsonObj.hideTaskCurFinishNumber){
        this.hideTaskCurFinishNumber = jsonObj.hideTaskCurFinishNumber;
    }
    // console.log("MakeData == ",jsonObj);
};
UserData.UserDataStringify = function(){
    let str = JSON.stringify(UserData);
    return str;
};
UserData.saveUserData = function(){
    let str = this.UserDataStringify();
    cc.sys.localStorage.setItem( cc.gameConfig.SAVE_DATA_KEY,str);
};
UserData.IsHaveStorageData = function(){
    var user_data = cc.sys.localStorage.getItem( cc.gameConfig.SAVE_DATA_KEY);
    // console.log("user_data",user_data);
    if(user_data==null||user_data=="null"||user_data==""||user_data==0||user_data==NaN){
        // cc.error("user_data",user_data);
        return false;
    }
    return true;
};
UserData.getStorageData = function(){
    var user_data = cc.sys.localStorage.getItem( cc.gameConfig.SAVE_DATA_KEY);
    return user_data;
};
UserData.clearUserData = function(){
    cc.sys.localStorage.setItem( cc.gameConfig.SAVE_DATA_KEY,"");
    this.MakeData(this.GetInItUserData());
};
UserData.GetInItUserData =function(){
    let obj = {"coin":1,"tipsList":[],"curLevelData":{
        'Chapter':1,
        'Level':1,
        'wordFinish':[],
        'isSpecialLevel':false,
    },"hideWords":[],"hideTaskCurFinishNumber":0};
    let str = JSON.stringify(obj);
    return str;
};
module.exports = UserData;