// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        enemy_skin:{
            type:cc.SpriteFrame,
            default:[]
        },
        boom_anim:{
            type:cc.SpriteFrame,
            default:[]
        },
        boom_duration:0.1,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = cc.find('Canvas/player')
        this.anim = this.node.getChildByName('anim');
        this.anim_com = this.anim.addComponent('frame_anim');
        this.game = cc.find("Canvas").getComponent("game");
        this.speed_x = 0;
        this.speed_y = -200;
        this.enemy_status = 1;
    },

    start () {
        this._set_enemy_skin();
    },
    remove_enemy:function(){
        this.game.remove_enemy(this.node);
        this.node.removeFromParent();
    },
    _play_enemy_bomm:function(){
        this.anim_com.sprite_frames = this.boom_anim;
        this.anim_com.duration = this.boom_duration;
        this.anim_com.play_once(function(){
            this.remove_enemy();
        }.bind(this));
    },
    // remove_enemy:function(){
        
    // },
    on_bullet_hit:function(){
        if(this.enemy_status !== 1){
            return
        }
        this.game.add_score(); // 分数
        this.enemy_status = 0; // 设为死亡状态
        this._play_enemy_bomm(); // 播放
        
    },
    _set_enemy_skin:function(){
        var skin_type = Math.floor(Math.random()*9+1);
        if(skin_type >= 10){
            skin_type = 9;
        }
        this.anim.getComponent(cc.Sprite).spriteFrame = this.enemy_skin[skin_type-1];
    },

    update (dt) {
        this.enemy_x = this.speed_x * dt;
        this.enemy_y = this.speed_y * dt;
        this.node.x += this.enemy_x;
        this.node.y += this.enemy_y;
        // 检测是否碰撞
        if(this.enemy_status === 0){
            return 
        }
        var player_box = this.player.getBoundingBoxToWorld();
        var enemy_box = this.node.getBoundingBoxToWorld();
        if(enemy_box.intersects(player_box)){
            var player_com = this.player.getComponent('player');
            player_com.on_hit_enemy();
        }
        // 跑出屏幕
        var e_pos = this.node.convertToWorldSpaceAR(cc.p(0,0));
        if(e_pos.x < -100 || e_pos.x >500 || e_pos.y < -100){
            this.remove_enemy();;
        }
    },
});
