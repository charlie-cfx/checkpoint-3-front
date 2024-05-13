import { Continent } from "./continent.type";

export type Country = {
    id: number;
    code: string;
    name: string;
    emoji: string;
    continent: Continent;
};
