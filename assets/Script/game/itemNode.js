

cc.Class({
    extends: cc.Component,

    properties: {
        showPos1:cc.Node,
        showPos2:cc.Node,
        showPos3:cc.Node,
        showPos4:cc.Node,
        showPos5:cc.Node,
        showPos6:cc.Node,
        showPos7:cc.Node,
        showPos8:cc.Node,

        showbg:cc.Node,
        ItemPre:cc.Prefab,
        SprLine:cc.Prefab,
        control:cc.Node,
        _selectArray:[],
        _isBackRemoveState:false,
        _selectObjList:[],
        _TouchId: 0,
        _isOpenSpecialLevel:false,
        _isStartGame:false,
        _data:null,
        _isTouchState:false,
        _isMoveState:false,
        _curWorks:'',
        _MainObj:null,
        _isRunActionState:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.registerEvent();
    },
    init:function(obj){
        this._MainObj = obj;
        this.inintAllFinishItems();
        let self = this; 
        
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            self.controlStartCallBack(event);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.controlEndCallBack, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.controlLeaveCallBack, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.controlMoveCallBack, this);
    },
    registerEvent:function(){
        cc.tools.registerEventListener(cc.tools.Event.COLLIS,this,this.getcollisDis);
        cc.tools.registerEventListener(cc.tools.Event.CLEAR_WORD_DATA,this,this.clear);
    },
    inintAllFinishItems:function(){
        let data = null;
        this._isOpenSpecialLevel = cc.tools.gameManager.isOpenSpecial();
        if(this._isOpenSpecialLevel){
            data = cc.tools.gameManager.getSpecialLevelData();
        }else{
            data = cc.tools.gameManager.getCurLevelData();
        }
       
        this._data = data;
        this._end = cc.v2();
        this.dataArray = [];
        this.initCurWorks();
        this.initAllItems();
        this.runMoveItemAction();

        let finCom = this._MainObj.finishView.getComponent(cc.Component);
        finCom.initViewBywork(data,this._MainObj,this._isOpenSpecialLevel);

    },
    initAllItems:function(){
        this.showPosList =[];
        this.Lines =[];
        this.items =[];
        this.rectNodes =[];
        this.showPosList.push(this.showPos1);
        this.showPosList.push(this.showPos2);
        this.showPosList.push(this.showPos3);
        this.showPosList.push(this.showPos4);
        this.showPosList.push(this.showPos5);
        this.showPosList.push(this.showPos6);
        this.showPosList.push(this.showPos7);
        this.showPosList.push(this.showPos8);
        this.CurItem = null;
        this.MovePos = cc.v2();
        this.startPos = cc.v2();
        this.items = cc.tools.gameManager.getWordListPos(this.dataArray.length);
        for (let index = 0; index < this.dataArray.length; index++) {
            let item =this.createItem();
            this.rectNodes.push(item);
            item.width = this.items[index].width;
            item.height = this.items[index].height;
            item.getComponent('item').setWord(this.dataArray[index]);
            item.getComponent('item').setTexture(this._MainObj.Atlas.getSpriteFrame(this.dataArray[index]));
        }
    },
    initCurWorks:function(){
        // let data = ["abc","niuo","poiu","qwer","mnbv"];
        // let min=0,max =5;
        // let random =Math.floor(Math.random() * (max - min) + min);
        this._curWorks = this._data.title;
        this.dataArray=[];
        for (let index = 0; index < this._curWorks.length; index++) {
            const element = this._curWorks[index];
            this.dataArray.push(element);
        }
    },
    runMoveItemAction:function(){
        this._isStartGame = false;
        let self = this;
        for (let index = 0; index < this.rectNodes.length; index++) {
            const element = this.rectNodes[index];
            const node = this.items[index];
            let moveTo = cc.moveTo(0.5, node.pos);
            let action2 = cc.callFunc(() => {
                if(index==this.rectNodes.length-1){
                    self._isStartGame = true;
                }
            }, this);
            element.runAction(cc.sequence(moveTo, action2));
        }
    },
    createNewLine:function(obj){
        let pos =obj.node.position;
        let dt = this.CurItem.position.subSelf(pos);
        let radian = Math.atan2(dt.x, dt.y); 
        let rotation = (180 * radian / Math.PI + 90) % 360;
        this.Lines[this.Lines.length-1].rotation = rotation;
        // this.Lines[this.Lines.length-1].width =  pos.mag(this.CurItem.position);
        this.Lines[this.Lines.length-1].width =dt.mag()+5;
        let pre = cc.instantiate(this.SprLine);
        pre.parent = this.node;
        pre.position = pos;
        pre.zIndex = 10;
        this.CurItem = obj.node;
        this.Lines.push(pre);
        this._selectArray.push(obj.getWord());
        this._selectObjList.push(obj);
        this.createLine();
    },
    findRectItem:function(touchPos){
        let item = null;
        let Startpos =this.rectNodes[this.rectNodes.length-1].parent.convertToNodeSpaceAR(touchPos);
        for (let index = 0; index < this.rectNodes.length; index++) {
            const element = this.rectNodes[index];
            let rect = element.getComponent('item').getRect();
            if(rect.contains(Startpos)){
                // console.log("选中",element.getComponent('item').getWork() );
                item = element;
                break;
            }
        }
        return item;
    },
    isControlRect:function(touchPos){
        let Startpos =this.control.parent.convertToNodeSpaceAR(touchPos);
        let rect =  new cc.Rect(this.control.x-this.control.width*0.5, this.control.y-this.control.height*0.5, this.control.width, this.control.height);
        return rect.contains(Startpos);
    },
    setOpenCollider:function(isOpen){
        for (let index = 0; index < this.rectNodes.length; index++) {
            const element = this.rectNodes[index];
            element.getComponent('item').setCollisionEnable(isOpen);
        }
    },
    updateshowTopItemBgSize:function(){
        this.showbg.active = true;
        this.showbg.color = cc.Color.WHITE;
        this.showbg.width = this._selectArray.length*80;
    },
    showTopBgIsRightColor:function(obj){
        console.log('obj.isHideTask',obj.isHideHave);
        if(obj.isHideTask){
            if(obj.isHideHave){
                this.showbg.color = cc.Color.BLUE;
                this.setAllLineColor(cc.Color.BLUE);
                cc.tools.dispatchEvent(cc.tools.GameConfig.Event.SHOW_TIPS_TEXT,cc.gameConfig.TipsType.TIPS_HIDE_TASK);
            }else{
                this.showbg.color = cc.Color.YELLOW;
                this.setAllLineColor(cc.Color.YELLOW);
            }
            return; 
        }
        if(obj.isfinish){
            this.showbg.color = cc.Color.BLUE;
            this.setAllLineColor(cc.Color.BLUE);
            return;
        }
        if(obj.isRight){
            this.showbg.color = cc.Color.GREEN;
            this.setAllLineColor(cc.Color.GREEN);
            this.ShakeRight();
            cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.ConnectFinishAudio);
        }else{
            this.setAllLineColor(cc.Color.RED); 
            this.showbg.color = cc.Color.RED;
            this.ShakeError();
            cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.ConnectloseAudio);
        }
    },
    showTopItem:function(){
        console.log('this.selectArray==',this.getCurConnectWork());
        // console.log('this.selectArray==', this.selectArray);
        this.updateshowTopItemBgSize();
        for (let index = 0; index < this._selectArray.length; index++) {
            const element = this._selectArray[index];
            let node = this.showPosList[index];
            node.removeAllChildren();
            let tempNode = new cc.Node();
            // tempNode.anchorX = 0;
            // tempNode.anchorY = 0;
            let sprite = tempNode.addComponent(cc.Sprite);
            sprite.spriteFrame =this._MainObj.Atlas.getSpriteFrame(element);
            tempNode.width =50;
            tempNode.height = 50;
            tempNode.parent = node;
        }
    },
    clear:function(target){
        target._isStartGame = false;
        target.clearItems(false);
        cc.tools.gameManager.clearCurBufData();
        for (let index = 0; index <  target.rectNodes.length; index++) {
            const element =  target.rectNodes[index];
            element.removeFromParent();
        }
    },
    clearItems:function(isRunAction){
        // this.CurItem = null;
        this._selectObjList=[];
        for (let index = 0; index < this.rectNodes.length; index++) {
            const element = this.rectNodes[index];
            element.getComponent('item').unSelectAction();
            element.getComponent('item').setConnectWork(false);
        }
        this.setOpenCollider(false);
        // this.showbg.active = false;
        this.removeTopItemAction(isRunAction);
    },
    getCurConnectWork:function(){
        let str ='';
        for (let index = 0; index < this._selectArray.length; index++) {
            const element = this._selectArray[index];
            str+=element;
        }
        return str;
    },
    removeTopItemAction:function(isRunAction){
        if(isRunAction){
            let action1 = cc.delayTime(0.4);
            let self = this;
            let action2 = cc.callFunc(() => {
                self.removeTopItemAction(false);
                self.showbg.active = false;
            }, this);
            this.node.runAction((cc.sequence(action1, action2)));
        }else{
            
            this.node.stopAllActions();
            for (let index = 0; index < this._selectArray.length; index++) {
                let node = this.showPosList[index];
                node.removeAllChildren();
                this.Lines[index].removeFromParent();
            }
            this._selectArray=[];
            this.showbg.active = false;
            this.Lines =[];
        }
    },
    controlStartCallBack:function(touch, event){
        if(this._isMoveState||!this._isStartGame) return;
        this._TouchId = touch.touch.getID();
        var touchLoc = touch.getLocation();
        this.CurItem = this.findRectItem(touchLoc);
        if(this.CurItem){
            cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.ConnectAudio);
            this._isMoveState = true;
            this.setOpenCollider(true);
            // this.ItemNode.off(cc.Node.EventType.TOUCH_START);
            this.removeTopItemAction(false);
            this.CurItem.getComponent('item').onSelectAction();
            this.creatOneLine();
            // this.setOpenCollider();
            this._selectArray.push(this.CurItem.getComponent('item').getWord());
            this._selectObjList.push(this.CurItem.getComponent('item'));
            this.CurItem.getComponent('item').setConnectWork(true);
            this.createLine();
            var Startpos = this.Lines[this.Lines.length-1].parent.convertToNodeSpaceAR(touchLoc);
            this.control.active = true;
            this.control.position = Startpos;
            this._isTouchState = true;
            let pos = this.CurItem.position;
            let dt = pos.subSelf(Startpos);
            let radian = Math.atan2(dt.x, dt.y);
            let rotation = (180 * radian / Math.PI + 90) % 360;
            this.Lines[this.Lines.length-1].rotation = rotation;
            this.Lines[this.Lines.length-1].width =  pos.mag(Startpos)+15;
        }
    },
    controlMoveCallBack:function(touch, event){
        let isC = this.isControlRect(touch.getLocation());
        if(!this._isTouchState||!isC||this._isBackRemoveState) return;
        this._isMoveState = true;
        let pos = this.Lines[this.Lines.length-1].position;
        let endP= this.control.parent.convertToNodeSpaceAR(touch.getLocation());
        this.control.position = endP;
        this._end = endP;
        let dt = pos.subSelf(this._end);
        let radian = Math.atan2(dt.x, dt.y); 
        let rotation = (180 * radian / Math.PI + 90) % 360;
        this.Lines[this.Lines.length-1].rotation = rotation;
        this.Lines[this.Lines.length-1].width =  pos.mag(this._end);
        this.Lines[this.Lines.length-1].getComponent(cc.BoxCollider)._size.width = this.Lines[this.Lines.length-1].width;
        this.Lines[this.Lines.length-1].getComponent(cc.BoxCollider)._offset.x = this.Lines[this.Lines.length-1].width*0.5;
    },
    controlEndCallBack:function(touch, event){
        if(touch.touch.getID() == this._TouchId){
            if(this.CurItem){
                let obj =this._MainObj.finishView.getComponent(cc.Component).isFinishWork(this.getCurConnectWork());
                this._isTouchState = false;
                this._isMoveState=false;
                this.control.active = false;
                this.showTopBgIsRightColor(obj);
                this.clearItems(true);
            }
        }
    },
    controlLeaveCallBack:function(touch, event){
        if(this.CurItem){
            let obj =this._MainObj.finishView.getComponent(cc.Component).isFinishWork(this.getCurConnectWork());
            this._isTouchState = false;
            this._isMoveState=false;
            this.showTopBgIsRightColor(obj);
            this.clearItems(false);
            this.control.active = false;
        }
    },
    creatOneLine:function(){
        if(this.Lines.length<=0){
            let pre = cc.instantiate(this.SprLine);
            pre.parent = this.node;
            pre.zIndex = 3;
            this.Lines.push(pre);
        }
    },
    createItem:function(){
        let pre = cc.instantiate(this.ItemPre);
        pre.parent = this.node;
        pre.zIndex = 0;
        return pre;
    },
    createLine:function(){
        this.Lines[this.Lines.length-1].position =this.CurItem.position;
        this.showTopItem();
    },
    getcollisDis:function(target,evt,event){
        if(!target._isStartGame) return;
        let item = event.obj;
        // this.node.off(cc.Node.EventType.TOUCH_MOVE, this.controlMoveCallBack, this);
        // console.log('collisWork == ',item.getWork());
        // item.setCollisionEnable(false);
        if(!item.getIsConnectWork()){
            target.createNewLine(item);
            // this.setOpenCollider();
            item.setConnectWork(true);
            item.onSelectAction();
            cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.ConnectAudio);
        }else{
            if(target._selectArray.length>1){
                let obj =target._selectObjList[target._selectObjList.length-2];
                // let work = this.selectArray[this.selectArray.length-2]; //只能回退上一次的选择
                if(item==obj){
                    console.log('想回退到上一次的选择 == ',item.getWord());
                    target._isBackRemoveState = true;
                    target.unSelectAction();
                    target.backPreviousSelect();
                    cc.tools.AudioManager.playIndex(cc.gameConfig.Audio.ConnectAudio);
                }
            }
        }
    },
    unSelectAction:function(){
        let obj1 =this._selectObjList[this._selectArray.length-1];
        obj1.unSelectAction();
    },
    backPreviousSelect:function(){
        this.removeWork();
        this.CurItem.getComponent('item').setConnectWork(false);
        this.CurItem = this.getItemByWork(this._selectObjList[this._selectArray.length-1]);  
        this._isBackRemoveState = false;
    },
    removeWork:function(){
        let node = this.showPosList[this._selectArray.length-1];
        node.removeAllChildren();
        this._selectArray.splice(this._selectArray.length-1,1);
        this._selectObjList.splice(this._selectObjList.length-1,1);
        this.Lines[this.Lines.length-1].removeFromParent();
        this.Lines.splice(this.Lines.length-1);
        this.updateshowTopItemBgSize();
    },
    getItemByWork:function(obj){
        for (let index = 0; index < this.rectNodes.length; index++) {
            const element = this.rectNodes[index];
            if(obj==element.getComponent('item')){
                return element;
            }
        }
    },
    setAllLineColor:function(color){
        for (let index = 0; index < this._selectArray.length; index++) {
            this.Lines[index].color = color;
            this.Lines[index].stopAllActions();
            this.Lines[index].runAction(cc.fadeTo(1,0));
        }
    },
    openNewLevel:function(){
        this._isStartGame = false;
        this.clearItems(false);
        for (let index = 0; index <  this.rectNodes.length; index++) {
            const element =  this.rectNodes[index];
            element.removeFromParent();
        }
        this.inintAllFinishItems();
    },
    changePos:function(){
        if(this._isRunActionState){
            return;
        }
        this._isRunActionState= true;
        this._isStartGame = false;
        let self = this;
        let posArray =[];
        let newPosArray =[];
        for (let index = 0; index < this.items.length; index++) {
            const pos = this.items[index].pos;
            posArray.push(pos);
        }
        for (let index = 0; index < this.items.length; index++) {
            let random = cc.tools.getIntervaRandom(0,posArray.length-1);
            const element = posArray[random];
            newPosArray.push(element);
            posArray.splice(random,1);
            this.rectNodes[index].zIndex = random;
        }
        // console.log("newPosArray == ",newPosArray);
        for (let index = 0; index < this.rectNodes.length; index++) {
            const element = this.rectNodes[index];
            element.stopAllActions();
            const pos = newPosArray[index];
            let moveTo = cc.moveTo(0.1, pos);
            // element.position = cc.v2(0,-300);
            let action2 = cc.callFunc(() => {
                if(index==this.rectNodes.length-1){
                    self._isStartGame = true;
                    self._isRunActionState = false;
                }
            }, this);
            element.runAction(cc.sequence(cc.moveTo(0.2,  cc.v2(0,-300)), cc.delayTime(0.2),moveTo, action2));
        }
    },
    ShakeError:function(){
        for (let index = 0; index < this._selectObjList.length; index++) {
            const element = this._selectObjList[index];
            element.actionShake();
        }
    },
    ShakeRight:function(){
        for (let index = 0; index < this._selectObjList.length; index++) {
            const element = this._selectObjList[index];
            element.actionGlisten();
        }
    }
    // update (dt) {},
});
