import type { DivineVoxelEngineRender } from "divine-voxel-engine/Render";

import { Scene } from "@babylonjs/core/scene";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { RenderPlayer } from "Render/RenderPlayer";
import { GetPlayerPickCube } from "Render/PlayerPickCube";
//  "./Contexts/DataLoader/dataloader.js",

export function SetUpControls(
  DVER: DivineVoxelEngineRender,
  camera: UniversalCamera,
  scene: Scene
) {
  const { cube, setPickNormals } = GetPlayerPickCube(DVER, camera, scene);
  RenderPlayer.maanger.physics.nowIs.still();

  window.addEventListener("keydown", (event) => {
    if (event.key == "w" || event.key == "W") {
      RenderPlayer.maanger.physics.nowIs.walkingForward();
    }

    if (event.key == "s" || event.key == "S") {
      RenderPlayer.maanger.physics.nowIs.walkingBackward();
    }

    if (event.key == "a" || event.key == "A") {
      RenderPlayer.maanger.physics.nowIs.walkingLeft();
    }
    if (event.key == "d" || event.key == "D") {
      RenderPlayer.maanger.physics.nowIs.walkingRight();
    }

    if (event.key == " ") {
      RenderPlayer.maanger.physics.nowIs.jumping();
    }
    if (event.key == "Control") {
      RenderPlayer.maanger.physics.nowIs.running();
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.key == "w" || event.key == "W") {
      return RenderPlayer.maanger.physics.nowIs.walkingForward(false);
    }
    if (event.key == "s" || event.key == "S") {
      return RenderPlayer.maanger.physics.nowIs.walkingBackward(false);
    }
    if (event.key == "a" || event.key == "A") {
      return RenderPlayer.maanger.physics.nowIs.walkingLeft(false);
    }
    if (event.key == "d" || event.key == "D") {
      return RenderPlayer.maanger.physics.nowIs.walkingRight(false);
    }
    if (event.key == " ") {
      RenderPlayer.maanger.physics.nowIs.jumping(false);
    }
    if (event.key == "Control") {
      RenderPlayer.maanger.physics.nowIs.running(false);
    }
  });

  window.addEventListener("click", (event) => {
    if (event.button == 0) {
      setPickNormals();
    }

    if (event.button == 2) {
      // DVER.worldComm.sendMessage("voxel-remove");
    }
  });
}
