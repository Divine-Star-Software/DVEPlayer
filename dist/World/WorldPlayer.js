import { VisitAll } from "divine-voxel-engine/Math/index.js";
export class WorldPlayer {
    DVEW;
    manager;
    start = {
        x: 0,
        y: 0,
        z: 0,
    };
    end = {
        x: 0,
        y: 0,
        z: 0,
    };
    reachDistance = 10;
    dataTool;
    constructor(DVEW, manager) {
        this.DVEW = DVEW;
        this.manager = manager;
        this.dataTool = DVEW.getDataTool();
    }
    update() {
        this.start.x = this.manager.physics.position.x;
        this.start.y =
            this.manager.physics.position.y + this.manager.physics.eyeLevel;
        this.start.z = this.manager.physics.position.z;
        this.end.x =
            this.manager.physics.direction.x * this.reachDistance + this.start.x;
        this.end.y =
            this.manager.physics.direction.y * this.reachDistance + this.start.y;
        this.end.z =
            this.manager.physics.direction.z * this.reachDistance + this.start.z;
        const voxels = VisitAll(this.start, this.end);
        let foundVoxel = false;
        for (let i = 0; i < voxels.length; i += 3) {
            const x = voxels[i];
            const y = voxels[i + 1];
            const z = voxels[i + 2];
            if (!this.dataTool.loadInAt(x, y, z))
                continue;
            const substance = this.dataTool.getSubstance();
            if (substance == "#dve_liquid")
                continue;
            if (this.dataTool.isRenderable()) {
                this.manager.physics.pick.position.x = x;
                this.manager.physics.pick.position.y = y;
                this.manager.physics.pick.position.z = z;
                foundVoxel = true;
                break;
            }
        }
        if (!foundVoxel)
            this.manager.physics.pick.position.set(-Infinity, 0, 0);
    }
}
