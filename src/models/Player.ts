import { Team } from "./Team";

export interface Player {
    id: number,
    firstName: string,
    lastName: string,
    number: number,
    team: Team
}
