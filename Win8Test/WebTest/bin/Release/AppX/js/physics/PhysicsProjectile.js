this.Game = this.Game || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    // ===========
    // CONSTRUCTOR
    // ===========
    namespace.PhysicsProjectile = function (px, py, radius, vx, vy, texture)
    {
        properties = properties || {};

        if (arguments.length >= 6)
            this.init(px, py, radius, vx, vy, texture, properties);
    }
    var p = namespace.PhysicsProjectile.prototype;

    // ========
    // THE REST
    // ========
    p.init = function (px, py, radius, vx, vy, texture, properties)
    {
        // Texture
        this.view = new createjs.Bitmap(texture);
        this.view.regX = this.view.regY = radius;

        // Physics Fixture
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density = properties.density || 1;
        fixDef.friction = properties.friction || 0.5;
        fixDef.restitution = properties.restitution || 1.0;
        fixDef.shape = new box2d.b2CircleShape(radius / box2d.SCALE);

        // Physics Body
        var bodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2Body.b2_kinematicBody;
        bodyDef.position.x = px / box2d.SCALE;
        bodyDef.position.y = py / box2d.SCALE;

        // Create 'em
        this.view.body = box2d.world.CreateBody(bodyDef);
        this.view.body.CreateFixture(fixDef);

        // Add movement
        this.view.body.SetLinearVelocity(new box2d.b2Vec2(vx, vy));

        // Update loop
        this.view.onTick = p.tick;
    }

    p.tick = function (e)
    {
        // ! 'this' refers to 'view' !

        // Set texture position
        this.x = this.body.GetPosition().x * box2d.SCALE;
        this.y = this.body.GetPosition().y * box2d.SCALE;
        this.rotation = this.body.GetAngle() * (180 / Math.PI);
    }

})(this.Game);
