
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bspeed_x = 0;
        this.bspeed_y = 200;
        this.enemy_set = cc.find('Canvas').getComponent('game').enemy_set;
    },
    hit_enemy:function(b_box,enemy_com){
        if (enemy_com.enemy_status !== 1) { // 如果敌机不是活的
           return false;
        }
        var enemy_box = enemy_com.node.getBoundingBoxToWorld();
        return b_box.intersects(enemy_box);
    },

    start () {

    },

    update (dt) {
        var bx = this.bspeed_x * dt;
        var by = this.bspeed_y * dt;
        this.node.x += bx;
        this.node.y += by;
        
        if(this.node.y >= 310){
                this.node.removeFromParent();
                return;
        }
        
        
        // 和敌人的碰撞
        var b_box = this.node.getBoundingBoxToWorld();
        for(var i = 0;i<this.enemy_set.length;i++){
            var com = this.enemy_set[i].getComponent('enemy');
                if(this.hit_enemy(b_box,com)){
                   com.on_bullet_hit();
                    this.node.removeFromParent();
                    return;
                }
        }
        
        
    },
});
