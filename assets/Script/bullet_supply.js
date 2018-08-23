cc.Class({
    extends: cc.Component,

    properties: {
        bullet_supply_skin:{
            type:cc.SpriteFrame,
            default:[]
        }  
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.b_speed_x = 0;
        this.b_speed_y = -300;
        this.node.setLocalZOrder(-1000);
        this.player = cc.find('Canvas/player');
        this.player_com = this.player.getComponent('player');
        this.anim = this.node.getChildByName('anim');
    },

    start () {

    },
    set_pill_skin:function(){
        var b_type = Math.floor(Math.random()*this.bullet_supply_skin.length+1);
        if(b_type > this.bullet_supply_skin.length){
            b_type = this.bullet_supply_skin.length;
        }
        this.anim.getComponent(cc.Sprite).spriteFrame = this.bullet_supply_skin[b_type-1];
    },

    update (dt) {
        var b_sx = this.b_speed_x * dt;
        var b_sy = this.b_speed_y * dt;
        this.node.x += b_sx;
        this.node.y += b_sy;
        // 跑出屏幕
        var things_pos = this.node.convertToWorldSpaceAR(cc.p(0,0));
        if(things_pos.x < -100 || things_pos.x >500 || things_pos.y < -100){
            this.node.removeFromParent();;
        }
        // 检查药是否被吃到
        this.player_box = this.player.getBoundingBoxToWorld();
        this.things_box = this.node.getBoundingBoxToWorld();
        if(this.things_box.intersects(this.player_box)){
            this.player_com.bulletNum_add();
            this.node.removeFromParent();
        }
    },
});
