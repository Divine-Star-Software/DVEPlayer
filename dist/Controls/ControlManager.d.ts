declare class ContronEvent {
    funcs: Function[];
    add(func: Function): void;
    run(): void;
}
export declare class ControlManager {
    mouse: {
        left: {
            down: ContronEvent;
            up: ContronEvent;
        };
        right: {
            down: ContronEvent;
            up: ContronEvent;
        };
    };
}
export {};
