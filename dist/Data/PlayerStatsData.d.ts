import { RemoteTagManager } from "divine-binary-tags";
import { RemoteTagManagerInitData } from "divine-binary-tags";
export declare const PlayerStatsTags: RemoteTagManager;
export declare const PlayerStatsTagIDs: {
    header: string;
    level: string;
    exp: string;
    maxMana: string;
    currentMana: string;
    maxEnegery: string;
    currentEnergy: string;
    speed: string;
    jumpPower: string;
    intuition: string;
};
export declare class PlayerStatsData {
    tags: RemoteTagManager;
    constructor(sab: SharedArrayBuffer, initData: RemoteTagManagerInitData);
    get level(): number;
    set level(level: number);
    get exp(): number;
    set exp(exp: number);
    get maxMana(): number;
    set maxMana(maxMana: number);
    get currentMana(): number;
    set currentMana(currentMana: number);
    get maxEnegery(): number;
    set maxEnegery(maxEnegery: number);
    get currentEnergy(): number;
    set currentEnergy(currentEnergy: number);
    get speed(): number;
    set speed(speed: number);
    get jumpPower(): number;
    set jumpPower(jumpPower: number);
    get intuition(): number;
    set intuition(intuition: number);
}
