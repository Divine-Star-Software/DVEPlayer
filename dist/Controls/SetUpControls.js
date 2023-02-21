import { GetPlayerPickCube } from "../Render/PlayerPickCube.js";
import { PlayerManager } from "../Data/PlayerManager.js";
//  "./Contexts/DataLoader/dataloader.js",
export function SetUpControls(DVER, player) {
    const { cube, setPickNormals } = GetPlayerPickCube(DVER, player);
    PlayerManager.physics.nowIs.still();
    window.addEventListener("keydown", (event) => {
        if (event.key == "w" || event.key == "W") {
            PlayerManager.physics.nowIs.walkingForward();
        }
        if (event.key == "s" || event.key == "S") {
            PlayerManager.physics.nowIs.walkingBackward();
        }
        if (event.key == "a" || event.key == "A") {
            PlayerManager.physics.nowIs.walkingLeft();
        }
        if (event.key == "d" || event.key == "D") {
            PlayerManager.physics.nowIs.walkingRight();
        }
        if (event.key == " ") {
            PlayerManager.physics.nowIs.jumping();
        }
        if (event.key == "Control") {
            PlayerManager.physics.nowIs.running();
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.key == "w" || event.key == "W") {
            return PlayerManager.physics.nowIs.walkingForward(false);
        }
        if (event.key == "s" || event.key == "S") {
            return PlayerManager.physics.nowIs.walkingBackward(false);
        }
        if (event.key == "a" || event.key == "A") {
            return PlayerManager.physics.nowIs.walkingLeft(false);
        }
        if (event.key == "d" || event.key == "D") {
            return PlayerManager.physics.nowIs.walkingRight(false);
        }
        if (event.key == " ") {
            PlayerManager.physics.nowIs.jumping(false);
        }
        if (event.key == "Control") {
            PlayerManager.physics.nowIs.running(false);
        }
    });
    window.addEventListener("mouseup", (event) => {
        if (event.button == 0) {
            setPickNormals();
            player.controls.mouse.left.up.run();
        }
        if (event.button == 2) {
            player.controls.mouse.right.up.run();
        }
    });
    window.addEventListener("mousedown", (event) => {
        if (event.button == 0) {
            setPickNormals();
            player.controls.mouse.left.down.run();
        }
        if (event.button == 2) {
            player.controls.mouse.right.down.run();
        }
    });
}
