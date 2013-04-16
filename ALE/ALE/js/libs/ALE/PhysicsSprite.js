this.ALE = this.ALE || {};
this.box2d = this.box2d || {};

(function ()
{
    Class.design('ALE.PhysicsSprite',
    {
        // =====================
        // STATIC FIELDS
        // =====================
        STATIC:
        {
            TYPE_UNKNOWN: 0,
            TYPE_HERO: 1,
            TYPE_ENEMY: 2,
            TYPE_GOODIE: 3,
            TYPE_PROJECTILE: 4,
            TYPE_OBSTACLE: 5,
            TYPE_SVG: 6,
            TYPE_DESTINATION: 7,

            BODY_DYNAMIC: "dynamic",
            BODY_STATIC: "static",
            BODY_KINEMATIC: "kinematic"
        },
       
        // =====================
        // CONSTRUCTOR
        // =====================
        initialize: function (px, py, width, height, imgName, type)
        {
            // ===================
            // INSTANCE VARIABLES
            // ===================
            this.sprite = {};
            this.isDrag = false;
            this.userData = {};

            this.myType = ALE.PhysicsSprite.TYPE_UNKNOWN;

            this.isTilt = false;
            this.isRoute = false;
            this.disappearSound = {};
            this.routeVector = {};
            // ====================

            /**
             * This is literally just getting our image prepared. 
             * Physics are handles in the "setBlahBlahPhysics" methods. The bitmap should be
             * ready to go immediately because all the images here are preloaded by Media.
             */

            // Initializae
            this.width = width;
            this.height = height;

            // Texture
            this.sprite = new createjs.Bitmap(ALE.Media.getImage(imgName));
            this.sprite.regX = this.sprite.regY = this.sprite.image.width / 2;
            this.sprite.x = px;
            this.sprite.y = py;

            this.myType = type;

            this.userData = { "type": this.myType, "obj": this };

            // Set our scale so we're the correct size
            this.sprite.scaleX = this.width / this.sprite.image.width;
            this.sprite.scaleY = this.height / this.sprite.image.height;
        },

        // ==================
        // THE REST
        // ==================
        setDisappearSound: function (soundName)
        {
            disappearSound = Media.getSound(soundName);
        },

        setCirclePhysics: function (density, elasticity, friction, bodyType, isBullet, isSensor, canRotate)
        {
            // TODO: Actually use: isBullet, isSensor, canRotate

            // Physics Fixture
            var fixDef = new box2d.b2FixtureDef();
            fixDef.density = density;
            fixDef.friction = friction;
            fixDef.restitution = elasticity;
            fixDef.shape = new box2d.b2CircleShape(this.width/2 / box2d.SCALE);

            // Physics Body
            var bodyDef = new box2d.b2BodyDef();
            bodyDef.position.x = this.sprite.x / box2d.SCALE;
            bodyDef.position.y = this.sprite.y / box2d.SCALE;

            // Get body type
            if (bodyType == ALE.PhysicsSprite.BODY_DYNAMIC)
                bodyDef.type = box2d.b2Body.b2_dynamicBody;
            else if (bodyType == ALE.PhysicsSprite.BODY_STATIC)
                bodyDef.type = box2d.b2Body.b2_staticBody;
            else if (bodyType == ALE.PhysicsSprite.BODY_KINEMATIC)
                bodyDef.type = box2d.b2Body.b2_kinematicBody

            // Create 'em
            this.sprite.body = box2d.world.CreateBody(bodyDef);
            this.sprite.body.CreateFixture(fixDef);

            // Add user data
            this.sprite.body.SetUserData(this.userData);

            // Now that we have a body, we can add the update loop
            this.sprite.onTick = this.tick;
        },

        setBoxPhysics: function (density, elasticity, friction, bodyType, isBullet, isSensor, canRotate)
        {
            // TODO: Actually use: isBullet, isSensor, canRotate

            // Physics Fixture
            var fixDef = new box2d.b2FixtureDef();
            fixDef.density = density;
            fixDef.friction = friction;
            fixDef.restitution = elasticity;
            fixDef.shape = new box2d.b2PolygonShape();
            fixDef.shape.SetAsBox(this.width / box2d.SCALE, this.height / box2d.SCALE);

            // Physics Body
            var bodyDef = new box2d.b2BodyDef();
            bodyDef.position.x = this.sprite.x / box2d.SCALE;
            bodyDef.position.y = this.sprite.y / box2d.SCALE;

            // Get body type
            if (bodyType == ALE.PhysicsSprite.BODY_DYNAMIC)
                bodyDef.type = box2d.b2Body.b2_dynamicBody;
            else if (bodyType == ALE.PhysicsSprite.BODY_STATIC)
                bodyDef.type = box2d.b2Body.b2_staticBody;
            else if (bodyType == ALE.PhysicsSprite.BODY_KINEMATIC)
                bodyDef.type = box2d.b2Body.b2_kinematicBody

            // Create 'em
            this.sprite.body = box2d.world.CreateBody(bodyDef);
            this.sprite.body.CreateFixture(fixDef);

            // Add user data
            this.sprite.body.SetUserData(this.userData);

            // Now that we have a body, we can add the update loop
            this.sprite.onTick = this.tick;
        },

        setMoveByTilting: function ()
        {
            if (!this.isTilt)
            {
                ALE.Level.initAccelerometer();
                ALE.Level.accelEntities.push(this);
                this.isTilt = true;
                this.sprite.body.GetFixtureList().SetSensor(false);
            }
        },

        toggleCollisionEffect: function (state)
        {
            /// <signature>
            /// <summary>Blah blah blah</summary>
            /// <param name="state">paramsdlkd</param>
            /// </signature>


            // If this was a sensor, we need to disable sensor, or else this entity
            // will go right through walls
            this.sprite.body.GetFixtureList().SetSensor(!state);
        },

        vanish: function(quiet)
        {
            /// <signature>
            /// <summary>Makes the sprite disappear</summary>
            /// <param name="quiet">If 'true,' the disappear sound will not be played.</param>
            /// </signature>

            this.sprite.visible = false;
            // Play disappearing animation
            // Play sound if !quiet
        },

        tick: function(e)
        {
            // Note: 'this' refers to 'this.sprite'

            // Set texture position
            this.x = this.body.GetPosition().x * box2d.SCALE;
            this.y = this.body.GetPosition().y * box2d.SCALE;
            this.rotation = this.body.GetAngle() * (180 / Math.PI);
        }
    })

})();
