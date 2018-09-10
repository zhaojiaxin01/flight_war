
cc.Class({
    extends: cc.Component,

    properties: {
        enemy_group:{
           type:cc.Prefab,
           default:[]
        },
        score:cc.Label,
        pillPre:{
            type:cc.Prefab,
            default:null
        },
        supplyPre:{
            type:cc.Prefab,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.enemy_set = [];
        this._gen_enemy_group();
        
        this.score_value = 0;
        this.score.string =  this.score_value;
        this.scheduleOnce(this._gen_pill.bind(this),60);
        this.scheduleOnce(this._gen_supply.bind(this),50);


    },
    // 分数
    add_score:function(){
        this.score_value++;
        this.score.string =  this.score_value;
        g.score = this.score_value;
    },
    // 移除敌人
    remove_enemy:function(e){
        var index = this.enemy_set.indexOf(e);
        if(index>0){
            this.enemy_set.splice(index,1);
        }
    },
    // 产生敌方单位
    _gen_enemy_group:function(){
        var g_type = Math.floor(Math.random()*this.enemy_group.length+1);
        if(g_type > this.enemy_group.length){
            g_type = this.enemy_group.length;
        }
        var g = cc.instantiate(this.enemy_group[g_type - 1]);
        this.node.addChild(g);
        for(var i = 0; i<g.children.length;i++){
            this.enemy_set.push(g.children[i]); // 敌人集
        }
        g.x = (Math.random() - 0.5)*200; // -200<x<200
        g.y = (Math.random())*100 + 500; // 500<y<600
        this.scheduleOnce(this._gen_enemy_group.bind(this),Math.random() * 3 +2); // 2-5秒产生一次
    },
    // 产生药丸
    _gen_pill:function(){
        var pill = cc.instantiate(this.pillPre);
        this.node.addChild(pill);
        pill.x = (Math.random() - 0.5)*200; // -200<x<200
        pill.y = (Math.random())*100 + 500; // 500<y<600
        this.scheduleOnce(this._gen_pill.bind(this),60);
    },
    // 子弹供给
    _gen_supply:function(){
        var supply = cc.instantiate(this.supplyPre);
        this.node.addChild(supply);
        supply.x = (Math.random() - 0.5)*200; // -200<x<200
        supply.y = (Math.random())*100 + 500; // 500<y<600
        this.scheduleOnce(this._gen_supply.bind(this),50);
    },
    // 返回
    back:function(){
        cc.director.loadScene("welcom")
    },

    start () {
       
    },

    // update (dt) {},
});
