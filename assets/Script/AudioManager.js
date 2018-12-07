var tools = require('tools');
var AudioClipList = [
    "Connect",
    "Connect",
    "Connectlose",
    "ConnectFinish",
    "tips",
    "win",
    "hideWord",
    "startBtn",
]
var AudioManager ={};
AudioManager.BgAudioID = null;
AudioManager.removeAudio =function(id) {

}
AudioManager.play =function(audio) {
    
    var id = cc.audioEngine.play(audio, false, 1);
    // set finish callback
    // cc.audioEngine.setFinishCallback(id, this.removeAudio.bind(this, id));
}
AudioManager.playIndex = function(index){
    if(cc.audioEngine.getState(AudioManager.BgAudioID)==cc.audioEngine.AudioState.PAUSED){
        return;
    }
    let url = AudioClipList[index];
    url ="mp3/"+url;
    cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
        cc.audioEngine.playMusic(clip, false); 
    });
};
AudioManager.playBgAudio = function(){
    if(cc.audioEngine.getState(AudioManager.BgAudioID ) === cc.audioEngine.AudioState.PLAYING){
        return;
    }
    let url = AudioClipList[tools.GameConfig.Audio.BG_AUDIO];
    url ="mp3/"+url;
    cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
        var audioID = cc.audioEngine.play(clip, false, tools.GameConfig.GameAudio.VOLUME);
        AudioManager.BgAudioID = audioID;
        AudioManager.setVolume(audioID,tools.GameConfig.GameAudio.VOLUME);
        cc.audioEngine.setLoop(audioID, true);
    });
}
//（0.0 ~ 1.0）。
AudioManager.setVolume = function(id,volume){
    cc.audioEngine.setVolume(id,volume);
}
AudioManager.getVolume = function(id){
    var volume = cc.audioEngine.getVolume(id);
    return volume;
}

AudioManager.stopAll =function() {
    cc.audioEngine.stopAll();
}
AudioManager.pauseAllEffects =function() {
    console.log("resumeAll@!");
    cc.audioEngine.pauseAllEffects();
}
AudioManager.resumeAllEffects =function() {
    cc.audioEngine.resumeAllEffects();
}
AudioManager.pauseAll =function() {
    cc.audioEngine.pauseAll();
}

AudioManager.resumeAll =function() {
    cc.audioEngine.resumeAll();
}
module.exports =cc.tools.AudioManager= AudioManager;