import { Team } from "./Team";

export interface Match {
    id: number,
    round: number,
    kickOffTimestamp: number,
    homeGoals: number | null,
    homeTeam: Team,
    awayGoals: number | null,
    awayTeam: Team,
    live: boolean
}
