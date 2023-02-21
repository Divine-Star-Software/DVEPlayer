import { RemoteTagManager } from "divine-binary-tags";
export const PlayerPhysicsStatesValues = {
    still: 0,
    secondaryStill: 1,
    walkingForward: 2,
    walkingBackward: 3,
    walkingLeft: 4,
    walkingRight: 5,
};
export const PlayerPhysicsTagIDs = {
    header: "#header",
    position: "#position",
    pickPosition: "#pick-position",
    pickNormals: "#pick-normals",
    direction: "#direction",
    sideDirection: "#side-direction",
    rotation: "#rotation",
    eyeLevel: "#eye-level",
    states: {
        movement: "#movement-state",
        secondaryMovement: "#secondary-movement-state",
        jumping: "#is-jumping",
        running: "#is-running",
        onGround: "#is-on-ground",
        inWater: "#is-in-water",
    },
};
export const PlayerPhysicsTags = new RemoteTagManager("player-physics-tags");
class DBTVec3 {
    tagId;
    parent;
    constructor(tagId, parent) {
        this.tagId = tagId;
        if (parent) {
            this.parent = parent;
        }
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get x() {
        return this.parent.tags.getArrayTagValue(this.tagId, 0);
    }
    set x(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 0, v);
    }
    get y() {
        return this.parent.tags.getArrayTagValue(this.tagId, 1);
    }
    set y(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 1, v);
    }
    get z() {
        return this.parent.tags.getArrayTagValue(this.tagId, 2);
    }
    set z(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 2, v);
    }
    getAsArray() {
        return [this.x, this.y, this.z];
    }
}
export class PlayerPhysicsData {
    tags;
    constructor(buffer, initData) {
        this.tags = new RemoteTagManager("player-physics-tags");
        this.tags.$INIT(initData);
        this.tags.setBuffer(buffer);
        this.pick._s = this;
        this.states._s = this;
        this.is._s = this;
        this.nowIs._s = this;
    }
    position = new DBTVec3(PlayerPhysicsTagIDs.position, this);
    pick = {
        _s: {},
        normal: new DBTVec3(PlayerPhysicsTagIDs.pickNormals, this),
        position: new DBTVec3(PlayerPhysicsTagIDs.pickPosition, this),
        getPlacePosition() {
            return [
                this.position.x + this.normal.x,
                this.position.y + this.normal.y,
                this.position.z + this.normal.z,
            ];
        },
        getPlaceVec3() {
            return {
                x: this.position.x + this.normal.x,
                y: this.position.y + this.normal.y,
                z: this.position.z + this.normal.z,
            };
        },
    };
    direction = new DBTVec3(PlayerPhysicsTagIDs.direction, this);
    sideDirection = new DBTVec3(PlayerPhysicsTagIDs.sideDirection, this);
    rotation = new DBTVec3(PlayerPhysicsTagIDs.rotation, this);
    states = {
        _s: {},
        get movement() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.movement);
        },
        set movement(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.movement, v);
        },
        get secondaryMovement() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.secondaryMovement);
        },
        set secondaryMovement(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.secondaryMovement, v);
        },
        get jumping() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.jumping);
        },
        set jumping(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.jumping, v);
        },
        get running() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.running);
        },
        set running(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.running, v);
        },
        get onGround() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.onGround) == 1;
        },
        set onGround(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.onGround, v ? 1 : 0);
        },
        get inWater() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.inWater) == 1;
        },
        set inWater(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.inWater, v ? 1 : 0);
        },
    };
    get eyeLevel() {
        return this.tags.getTag(PlayerPhysicsTagIDs.eyeLevel) / 10;
    }
    set eyeLevel(v) {
        if (!Number.isInteger(v)) {
            v = (v * 10) >> 0;
        }
        this.tags.setTag(PlayerPhysicsTagIDs.eyeLevel, v);
    }
    nowIs = {
        _s: {},
        still() {
            this._s.states.movement = PlayerPhysicsStatesValues.still;
            this._s.states.secondaryMovement =
                PlayerPhysicsStatesValues.secondaryStill;
        },
        walkingForward(v = true) {
            this._s.states.movement = v
                ? PlayerPhysicsStatesValues.walkingForward
                : PlayerPhysicsStatesValues.still;
        },
        walkingBackward(v = true) {
            this._s.states.movement = v
                ? PlayerPhysicsStatesValues.walkingBackward
                : PlayerPhysicsStatesValues.still;
        },
        walkingLeft(v = true) {
            this._s.states.secondaryMovement = v
                ? PlayerPhysicsStatesValues.walkingLeft
                : PlayerPhysicsStatesValues.secondaryStill;
        },
        walkingRight(v = true) {
            this._s.states.secondaryMovement = v
                ? PlayerPhysicsStatesValues.walkingRight
                : PlayerPhysicsStatesValues.secondaryStill;
        },
        jumping(v = true) {
            this._s.states.jumping = v ? 1 : 0;
        },
        running(v = true) {
            this._s.states.running = v ? 1 : 0;
        },
    };
    is = {
        _s: {},
        get walking() {
            return this._s.states.movement || this._s.states.secondaryMovement > 1;
        },
        get running() {
            return this._s.states.running;
        },
        get onGround() {
            return this._s.states.onGround;
        },
        get inWater() {
            return this._s.states.inWater;
        },
    };
}
