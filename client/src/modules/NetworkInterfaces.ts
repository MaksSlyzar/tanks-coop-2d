export interface CreateGameObjectsData {
    players: Array<{
        id: number;
        username: string;
        tankBody: {
            posX: number;
            posY: number;
            rotation: number;
        };
        gameRole: "heavy" | "engeenier";
    }>;

    gameObjects: {
        enemies: Array<{
            id: number;
            posX: number;
            posY: number;
            rotation: number;
        }>;
        projectiles: Array<{}>;
        tankBodies: Array<{
            id: number;
            position: {
                x: number;
                y: number;
            };
            rotation: number;
            playerId: number;
            _type: "heavy" | "engeenier";
            weapon: {
                rotation: number;
            };
        }>;
        builds: Array<{
            id: number;
            posX: number;
            posY: number;
            hp: number;
            maxHp: number;
            _type: "none" | "base" | "gold";
        }>;
        newGameObjects: Array<{
            id: number;
            position: {
                x: number;
                y: number;
            };
            rotation: number;
        }>;
    };
}
