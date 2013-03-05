this.ALE = this.ALE || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    // ===========
    // CONSTRUCTOR
    // ===========
    namespace.PhysicsSprite = function (px, py, width, height, imgName, type)
    {
        this.init(px, py, width, height, imgName, type);
    }
    var p = namespace.PhysicsSprite.prototype;


    // =========================
    // Fields/Properties
    // =========================

    p.TYPE_UNKNOWN = 0;
    p.TYPE_HERO = 1;
    p.TYPE_ENEMY = 2;
    p.TYPE_GOODIE = 3;
    p.TYPE_PROJECTILE = 4;
    p.TYPE_OBSTACLE = 5;
    p.TYPE_SVG = 6;
    p.TYPE_DESTINATION = 7;

    p.BODY_DYNAMIC = "dynamic";
    p.BODY_STATIC = "static";
    p.BODY_KINEMATIC = "kinematic";

    var sprite = {};
    var isDrag = false;

    var myType = p.TYPE_UNKNOWN;

    var physBody = {};
    var isTile = false;
    var isRoute = false;
    var disappearSound = {};
    var routeVector = {};


    // ========
    // THE REST
    // ========
    p.init = function (px, py, width, height, imgName, type)
    {
        /**
         * This is literally just getting our image prepared. 
         * Physics are handles in the "setBlahBlahPhysics" methods. The bitmap should be
         * ready to go immediately because all the images here are preloaded by Media.
         */

        // Texture
        this.sprite = new createjs.Bitmap(namespace.Media.getImage(imgName));
        this.sprite.regX = this.sprite.regY = this.sprite.image.width / 2;
        this.sprite.x = px;
        this.sprite.y = py;
    }

    p.setDisappearSound = function (soundName)
    {
        disappearSound = Media.getSound(soundName);
    }

    p.setCirclePhysics = function (density, elasticity, friction, bodyType, isBullet, isSensor, canRotate)
    {
        // TODO: Actually use: isBullet, isSensor, canRotate

        // Physics Fixture
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = elasticity;
        fixDef.shape = new box2d.b2CircleShape(this.sprite.image.width/2 / box2d.SCALE);

        // Physics Body
        var bodyDef = new box2d.b2BodyDef();
        bodyDef.position.x = this.sprite.x / box2d.SCALE;
        bodyDef.position.y = this.sprite.y / box2d.SCALE;

        // Get body type
        if (bodyType == namespace.BODY_DYNAMIC)
            bodyDef.type = box2d.b2Body.b2_dynamicBody;
        else if (bodyType == namespace.BODY_STATIC)
            bodyDef.type = box2d.b2Body.b2_staticBody;
        else if (bodyType == namespace.BODY_KINEMATIC)
            bodyDef.type = box2d.b2Body.b2_kinematicBody

        // Create 'em
        this.sprite.body = box2d.world.CreateBody(bodyDef);
        this.sprite.body.CreateFixture(fixDef);

        // Now that we have a body, we can add the update loop
        this.sprite.onTick = p.tick;
    }

    p.setBoxPhysics = function (density, elasticity, friction, bodyType, isBullet, isSensor, canRotate)
    {
        // TODO: Actually use: isBullet, isSensor, canRotate

        // Physics Fixture
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = elasticity;
        fixDef.shape = new box2d.b2PolygonShape();
        fixDef.shape.SetAsBox(this.sprite.image.width / box2d.SCALE, this.sprite.image.height / box2d.SCALE);

        // Physics Body
        var bodyDef = new box2d.b2BodyDef();
        bodyDef.position.x = px / box2d.SCALE;
        bodyDef.position.y = py / box2d.SCALE;

        // Get body type
        if (bodyType == namespace.BODY_DYNAMIC)
            bodyDef.type = box2d.b2Body.b2_dynamicBody;
        else if (bodyType == namespace.BODY_STATIC)
            bodyDef.type = box2d.b2Body.b2_staticBody;
        else if (bodyType == namespace.BODY_KINEMATIC)
            bodyDef.type = box2d.b2Body.b2_kinematicBody

        // Create 'em
        this.sprite.body = box2d.world.CreateBody(bodyDef);
        this.sprite.body.CreateFixture(fixDef);

        // Now that we have a body, we can add the update loop
        this.sprite.onTick = p.tick;
    }

    p.tick = function(e)
    {
        // ! 'this' refers to 'sprite' !
        
        // Set texture position
        this.x = this.body.GetPosition().x * box2d.SCALE;
        this.y = this.body.GetPosition().y * box2d.SCALE;
        this.rotation = this.body.GetAngle() * (180 / Math.PI);
    }

})(this.ALE);
