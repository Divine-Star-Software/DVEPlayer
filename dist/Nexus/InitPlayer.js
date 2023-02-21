import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
import { $RegisterPlayerData } from "../Data/RegisterPlayerData.js";
import { NexusPlayer } from "./NexusPlayer.js";
async function SetUpPlayerData(DVEN) {
    const { playerPhysicsTagManager, playerStatesTagManger } = $RegisterPlayerData();
    const physicsRemoteData = playerPhysicsTagManager.initData;
    const playePhysicsrDataSAB = new SharedArrayBuffer(physicsRemoteData.bufferSize);
    playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
    PlayerManager.physics = new PlayerPhysicsData(playePhysicsrDataSAB, physicsRemoteData);
    const statsRemoteData = playerStatesTagManger.initData;
    const playeStatsDataSAB = new SharedArrayBuffer(physicsRemoteData.bufferSize);
    playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
    PlayerManager.stats = new PlayerStatsData(playeStatsDataSAB, statsRemoteData);
    let renderReady = false;
    let worldReady = false;
    DVEN.parentComm.listenForMessage("request-player-tags", (data) => {
        DVEN.parentComm.sendMessage("connect-player-tags", [
            playePhysicsrDataSAB,
            physicsRemoteData,
            playeStatsDataSAB,
            statsRemoteData,
        ]);
        renderReady = true;
    });
    DVEN.worldComm.listenForMessage("request-player-tags", (data) => {
        DVEN.worldComm.sendMessage("connect-player-tags", [
            playePhysicsrDataSAB,
            physicsRemoteData,
            playeStatsDataSAB,
            statsRemoteData,
        ]);
        worldReady = true;
    });
    await DVEN.UTIL.createPromiseCheck({
        checkInterval: 1,
        check: () => {
            return renderReady && worldReady;
        },
    });
}
export const GetNexusPlayer = async (DVEN) => {
    await SetUpPlayerData(DVEN);
    const player = new NexusPlayer(PlayerManager.physics, PlayerManager.stats);
    player.setPosition(0, 200, 0);
    DVEN.parentComm.listenForMessage("set-player-position", (data) => {
        const [m, x, y, z] = data;
        player.setPosition(x, y, z);
    });
    setTimeout(() => {
        setInterval(() => {
            player.update();
        }, 17);
    }, 2000);
    return player;
};
