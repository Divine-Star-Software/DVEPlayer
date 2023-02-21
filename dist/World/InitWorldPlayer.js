import { PlayerManager, PlayerPhysicsData } from "../Data/index.js";
import { WorldPlayer } from "./WorldPlayer.js";
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
export const INIT_WORLD_PLAYER = async (DVEW) => {
    await SetUpPlayerData(DVEW);
    return new WorldPlayer(DVEW, PlayerManager);
};
