import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { VisitAll } from "divine-voxel-engine/Math";
export const WorldPlayer = {
    manager: PlayerManager,
    playerDataBuffer: new SharedArrayBuffer(1),
    data: new DataView(new ArrayBuffer(1)),
    position: new Float32Array(),
    onAdd: [],
    onRemove: [],
    onExplode: [],
    onUpdate: [],
    dimension: "main",
    getDimension() {
        return this.dimension;
    },
    update() { },
};
async function SetUpPlayerData(DVEW) {
    let playerDataReady = false;
    DVEW.nexusComm.listenForMessage("connect-player-tags", (data) => {
        PlayerManager.physics = new PlayerPhysicsData(data[1], data[2]);
        playerDataReady = true;
    });
    DVEW.nexusComm.sendMessage("request-player-tags", []);
    await DVEW.UTIL.createPromiseCheck({
        check: () => {
            if (!playerDataReady) {
                DVEW.nexusComm.sendMessage("request-player-tags", []);
            }
            return playerDataReady;
        },
        checkInterval: 1,
    });
}
export const GetWorldPlayer = async (DVEW) => {
    await SetUpPlayerData(DVEW);
    const dataTool = DVEW.getDataTool();
    const start = {
        x: 0,
        y: 0,
        z: 0,
    };
    const end = {
        x: 0,
        y: 0,
        z: 0,
    };
    const reachDistance = 10;
    WorldPlayer.update = () => {
        WorldPlayer.onUpdate.forEach((_) => _());
        start.x = PlayerManager.physics.position.x;
        start.y = PlayerManager.physics.position.y + PlayerManager.physics.eyeLevel;
        start.z = PlayerManager.physics.position.z;
        end.x = PlayerManager.physics.direction.x * reachDistance + start.x;
        end.y = PlayerManager.physics.direction.y * reachDistance + start.y;
        end.z = PlayerManager.physics.direction.z * reachDistance + start.z;
        const voxels = VisitAll(start, end);
        let foundVoxel = false;
        for (let i = 0; i < voxels.length; i += 3) {
            const x = voxels[i];
            const y = voxels[i + 1];
            const z = voxels[i + 2];
            if (!dataTool.loadInAt(x, y, z))
                continue;
            const substance = dataTool.getSubstance();
            if (substance == "liquid" || substance == "magma")
                continue;
            if (dataTool.isRenderable()) {
                PlayerManager.physics.pick.position.x = x;
                PlayerManager.physics.pick.position.y = y;
                PlayerManager.physics.pick.position.z = z;
                foundVoxel = true;
                break;
            }
        }
        if (!foundVoxel)
            PlayerManager.physics.pick.position.set(-Infinity, 0, 0);
    };
    return WorldPlayer;
};
