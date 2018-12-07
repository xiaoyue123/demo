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
        }
};
UserData.getTipsByChapterAndlevel = function(chapter,level){
    let itemlist = null;
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
    this.curLevelData.Chapter = chapter;
    this.curLevelData.Level = level;
    this.curLevelData.wordFinish = wordFinish;
    this.curLevelData.isSpecialLevel = isSpecialLevel;
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
                _isHave = true;
                break;
            }
        }
        if(!_isHave){
            let item = {'index':tipsIndex,'tipsWord':tipsWord};
            itemlist.list.push(item);
        }
    }
},
UserData.getTips = function(){
    return this.tipsList;
},
UserData.updateLevel  = function(){
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
},
UserData.updatecurFinishLevel = function(list){
    this.curFinishLevel = list;
},
UserData.updateHideTaskCurFinishNumber = function(){
    this.hideTaskCurFinishNumber +=1;
},
UserData.receiveHideTaskCurFinishNumber = function(num){
    this.hideTaskCurFinishNumber =num;
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
    this.chapter=jsonObj.chapter;
    this.level=jsonObj.level;
    this.hp=jsonObj.hp;
    this.attack=jsonObj.attack;
    this.weapon=jsonObj.weapon;
    this.hat=jsonObj.hat;
    this.pet=jsonObj.pet;
    this.coin=jsonObj.coin;
    this.bag = jsonObj.bag;
    this.guide =jsonObj.guide;
    this.maxLevel = jsonObj.maxLevel;
    this.reward = jsonObj.reward;
    this.timer = jsonObj.timer;
    if(jsonObj.bossCoolTime){
        this.bossCoolTime = jsonObj.bossCoolTime;
    }else{
        this.bossCoolTime =null;
    }
    if(jsonObj.arrLevel){
        this.arrLevel = jsonObj.arrLevel;
    }
    if(jsonObj.inviteNum){
        this.inviteNum = jsonObj.inviteNum;
    }
    if(jsonObj.birdNum){
        this.birdNum = jsonObj.birdNum;
    }
};
UserData.UserDataStringify = function(){
    let str = JSON.stringify(UserData);
    return str;
};
UserData.saveUserData = function(){
    let str = this.UserDataStringify();
    cc.sys.localStorage.setItem(_tools.GameConfig.SAVE_DATA_KEY,str);
};
UserData.IsHaveStorageData = function(){
    var user_data = cc.sys.localStorage.getItem(_tools.GameConfig.SAVE_DATA_KEY);
    // console.log("user_data",user_data);
    if(user_data==null||user_data=="null"||user_data==""||user_data==0||user_data==NaN){
        // cc.error("user_data",user_data);
        return false;
    }
    return true;
};
UserData.getStorageData = function(){
    var user_data = cc.sys.localStorage.getItem(_tools.GameConfig.SAVE_DATA_KEY);
    return user_data;
};
UserData.clearUserData = function(){
    cc.sys.localStorage.setItem(_tools.GameConfig.SAVE_DATA_KEY,"");
};
UserData.GetInItUserData =function(){
    let obj = {"chapter":1,"level":1,"hp":100,"maxLevel":1,"baseHit":0,"attack":1,"attack_delay":1000,"weapon":"weapon001","hat":"hat001","pet":"pet001","coin":1000,"crits":0.1,"critsHit":2,"attack_speed":1,"move_pix":3,"move_speed":1,"bag":{"weaponArray":[],"hatArray":[],"petArray":[]},"guide":[false,false,false,false,false,false],"reward":[0,0,0,0,0,0,0],"timer":"0000-00-00 00:00:00","inviteNum":0,"arrLevel":[0,0,0,0,0,0,0,0,0],"bossCoolTime":null,"birdNum":0};
    let str = JSON.stringify(obj);
    return str;
};
module.exports = UserData;