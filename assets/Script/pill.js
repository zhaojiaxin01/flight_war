cc.Class({
    extends: cc.Component,

    properties: {
        pill_skin:{
            type:cc.SpriteFrame,
            default:[]
        }  
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pill_speed_x = 0;
        this.pill_speed_y = -300;
        this.node.setLocalZOrder(-1000);
        this.player = cc.find('Canvas/player');
        this.player_com = this.player.getComponent('player');
        this.anim = this.node.getChildByName('anim');
    },

    start () {

    },
    set_pill_skin:function(){
        var pill_type = Math.floor(Math.random()*this.pill_skin.length+1);
        if(pill_type > this.pill_skin.length){
            pill_type = this.pill_skin.length;
        }
        this.anim.getComponent(cc.Sprite).spriteFrame = this.pill_skin[pill_type-1];
    },

    update (dt) {
        var pill_sx = this.pill_speed_x * dt;
        var pill_sy = this.pill_speed_y * dt;
        this.node.x += pill_sx;
        this.node.y += pill_sy;
        // 跑出屏幕
        var pill_pos = this.node.convertToWorldSpaceAR(cc.p(0,0));
        if(pill_pos.x < -100 || pill_pos.x >500 || pill_pos.y < -100){
            this.node.removeFromParent();;
        }
        // 检查药是否被吃到
        this.player_box = this.player.getBoundingBoxToWorld();
        this.pill_box = this.node.getBoundingBoxToWorld();
        if(this.pill_box.intersects(this.player_box)){
            this.player_com.life_add();
            this.node.removeFromParent();
        }
    },
});
