cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.sky1 = this.node.getChildByName("sky1");
        this.sky2 = this.node.getChildByName("sky2");
        this.speed = -100;
        this.node.setLocalZOrder(-2000);
    },

    update (dt) {
        var s = dt*this.speed;
        this.sky1.y += s;
        this.sky2.y += s;

        if(this.sky1.y <= -1669){
            this.sky1.y = 1069
            this.sky1.y += s; 
        }
        if(this.sky2.y <= -1669){
            this.sky2.y = 1069
            this.sky2.y += s; 
        }
    },
});
