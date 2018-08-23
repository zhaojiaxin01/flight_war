
cc.Class({
    extends: cc.Component,

    properties: {
        boom_anim:{
           type:cc.SpriteFrame,
           default:[]
        },
        boom_duration:0.1,
        bulletPre:{
            type:cc.Prefab,
            default:[]
        },
        ship:{
            type:cc.SpriteFrame,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.node.getChildByName('anim');
        this.anim_com = this.anim.addComponent('frame_anim');
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            var offset = t.getDelta();
            this.node.x += offset.x;
            this.node.y += offset.y;
        }.bind(this), this.node);

        this.bulletNum = 0; // 子弹数

        g.ship_status = 1; // 活着
        
        this.node.setLocalZOrder(100);
        // 初始化生命为3
        this.life = 3;
        this.count = 0;
        this.biu_bullet();
    },
     // 子弹++
     bulletNum_add: function bulletNum_add() {
        this.bulletNum++;
        if (this.bulletNum > 2) {
            this.bulletNum = 2;
        }
    },
    // 子弹计时器
    biu_bullet: function biu_bullet() {
        this.schedule(function () {
            this.shoot_bullet(this.bulletNum);
            if (this.bulletNum != 0) {
                this.count++;
                if (this.count == 60) {
                    this.bulletNum = 0;
                }
            }
        }.bind(this), 0.2);
    },
    // 子弹类型
    shoot_bullet: function shoot_bullet(bulletNum) {
        this.bulletPrefab = this.bulletPre[bulletNum];
        if (g.ship_status === 1) {
            var bullet = cc.instantiate(this.bulletPrefab);
            this.node.parent.addChild(bullet);
            bullet.x = this.node.x;
            bullet.y = this.node.y + 40;
            bullet.setLocalZOrder(-1000);
        } else {
            return;
        }
    },
    // 生命减少
    life_reduce:function(){
        this.life -= 1;
        this.lifeNum = cc.find('Canvas/lifeBox').getChildByName('lifeNum');
        
        this.lifeNum.getComponent(cc.Label).string =  this.life;
        console.log(this.lifeNum.getComponent(cc.Label).string)
        
        
    },
    // 生命增加
    life_add:function(){
        this.life += 1;
        this.lifeNum = cc.find('Canvas/lifeBox').getChildByName('lifeNum');
        this.lifeNum.getComponent(cc.Label).string =  this.life;
        console.log(this.lifeNum.getComponent(cc.Label).string)
    },
    // 结束游戏
    gameOver:function(){

        cc.director.loadScene('gameOver');
    },
    // 新生命
    new_life:function(){
        if(this.life > 0){
            this.anim.scale = 0;
            this.scheduleOnce(function(){
                this.anim.scale = 1;
                g.ship_status = 2; // 无敌状态 不可被攻击
                this.anim.getComponent(cc.Sprite).spriteFrame = this.ship;
                var seq = cc.sequence([cc.fadeTo(0.1,128),cc.fadeTo(0.1,255)]);
                var seqForever = cc.repeatForever(seq);
                this.anim.runAction(seqForever);
                
            },1);
            this.scheduleOnce(function(){
                g.ship_status = 1; 
                this.anim.opacity = 255;
                this.anim.stopAllActions(); // 停止动作
            },3);
        }
        else{
            this.gameOver(); // 跳转结束界面
        }

    },
    // 爆炸
    _play_boom_anim:function(){
        this.anim_com.sprite_frames = this.boom_anim;
        this.anim_com.duration = this.boom_duration;
        this.life_reduce(); // 生命--
        this.anim_com.play_once(this.new_life.bind(this));
    },
    // 被敌人攻击
    on_hit_enemy:function(){
        if(g.ship_status !== 0){ // 不是死忙状态
            this._play_boom_anim();
            g.ship_status = 0;
        }
        else{
            return;
        }
    },
    start () {

    },

    // update (dt) {},
});
