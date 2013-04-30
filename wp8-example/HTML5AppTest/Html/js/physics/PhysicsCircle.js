this.Game = this.Game || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    // ===========
    // CONSTRUCTOR
    // ===========
    namespace.PhysicsCircle = function (px, py, radius, bitmap, properties)
    {
        properties = properties || {};
        if (arguments.length >= 4)
            this.init(px, py, radius, bitmap, properties);
    }
    var p = namespace.PhysicsCircle.prototype;

    // ========
    // THE REST
    // ========
    p.init = function (px, py, preRadius, bitmap, properties)
    {
        var radius = preRadius * bitmap.scaleX;
        console.log("radius: " + radius);
        // Texture
        this.view = bitmap
        this.view.regX = this.view.regY = preRadius;

        // Physics Fixture
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density = properties.density || 1;
        fixDef.friction = properties.friction || 0.5;
        fixDef.restitution = properties.restitution || 1.0;
        fixDef.shape = new box2d.b2CircleShape(radius / box2d.SCALE);

        // Physics Body
        var bodyDef = new box2d.b2BodyDef();
        console.log("body: " + properties.body);
        bodyDef.position.x = px / box2d.SCALE;
        bodyDef.position.y = py / box2d.SCALE;

        // Get body type
        if (!properties.body)
            bodyDef.type = box2d.b2Body.b2_dynamicBody;
        else if (properties.body == "dynamic")
            bodyDef.type = box2d.b2Body.b2_dynamicBody;
        else if (properties.body == "static")
            bodyDef.type = box2d.b2Body.b2_staticBody;
        else if (properties.body == "kinematic")
            bodyDef.type = box2d.b2Body.b2_kinematicBody

        // Create 'em
        this.view.body = box2d.world.CreateBody(bodyDef);
        this.view.body.CreateFixture(fixDef);

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
