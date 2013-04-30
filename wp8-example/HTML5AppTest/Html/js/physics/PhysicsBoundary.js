this.Game = this.Game || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    // ===========
    // CONSTRUCTOR
    // ===========
    namespace.PhysicsBoundary = function (px, py, width, height, properties)
    {
        properties = properties || {};
        this.init(px, py, width, height, properties);
    }
    var p = namespace.PhysicsBoundary.prototype;

    // ========
    // THE REST
    // ========
    p.init = function (px, py, width, height, properties)
    {
        // Physics Fixture
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density = properties.density || 1;
        fixDef.friction = properties.friction || 0.5;
        fixDef.restitution = properties.restitution || 1.0;
        fixDef.shape = new box2d.b2PolygonShape();
        fixDef.shape.SetAsBox(width / box2d.SCALE, height / box2d.SCALE);

        // Physics Body
        var bodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2Body.b2_staticBody;
        bodyDef.position.x = px / box2d.SCALE;
        bodyDef.position.y = py / box2d.SCALE;

        // Create 'em
        this.body = box2d.world.CreateBody(bodyDef);
        this.body.CreateFixture(fixDef);
    }

})(this.Game);
