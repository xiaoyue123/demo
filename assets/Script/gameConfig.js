
var gameConfig = {
    SAVE_DATA_KEY:"GAME_LIB_KEY"
};
gameConfig.Event ={
    LOADING_OVER_EVENT:"1001", //加载数据完成
    OPEN_NEXT_CHAPTER:"1002",//开启下个章节
    TI_SHI:"1003",//提示
    UPDATE_COIN:"1004",//更新金币
    COLLIS:"1005",
    UPDATE_FINISH_HIDETASK_NUMBER:"1006",
    SHAKE_FINISH_HIDETAS:"1007", //震动提示完成隐藏任务
    SHOW_TIPS_TEXT:"1008", //顯示提示文本
    OPEN_NEXT_LEVEL:"1009",//开启下个关卡
    OPEN_SPECIAl_LEVEL:"1010",//开启特殊关卡
    SHOW_SETTLEMENT:"1011",//显示结算
    START_REWARD:"1012",//星星奖励
    SHOW_COIN_ANI:"1013",//金币动画
    GUO_DU_ANI:"1014",//过度动画
    SHOW_CHAPTER:"1015",//显示章节列表
    HIDE_CHAPTER:"1016",//隐藏章节列表
    SHOW_LEVELS:"1017",//显示关卡列表
    HIDE_LEVELS:"1018",//隐藏关卡列表
    CLEAR_WORD_DATA:"1019",//清除当前玩的状态
    SHOW_SHOP:"1020",//显示商城
};
gameConfig.TipsText = [
    "The current hidden task has been completed. Please click on the icon in the lower left corner to view it.",
    "All prompts have been completed.",
    "Shortage of gold coins.",
]
gameConfig.TipsType = {
    TIPS_HIDE_TASK:0,
    All_PROMPTS_COMPLETED:1,
    SHORTAGE_OF_COIN:2,
}
gameConfig.Audio = {
    ConnectAudio:1,
    ConnectloseAudio:2,
    ConnectFinishAudio:3,
    tipsAudio:4,
    winAudio:5,
    hideWordAudio:6,
    startBtnAudio:7,
}
gameConfig.ShopList = {
    "1":{
        "buy":0.99,
        "coinNum":240,
        "isScale":false
    },
    "2":{
        "buy":2.99,
        "coinNum":720,
        "isScale":false
    },
    "3":{
        "buy":4.99,
        "coinNum":1340,
        "isScale":false
    },
    "4":{
        "buy":9.99,
        "coinNum":2940,
        "isScale":false
    },
    "5":{
        "buy":19.99,
        "coinNum":6240,
        "isScale":false
    }
}
gameConfig.POS_LIST =[];
gameConfig.FINISH_POS_LIST =[];
module.exports = cc.gameConfig=gameConfig;