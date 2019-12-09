import { Match } from "./Match";
import { MatchEvent } from "./MatchEvent";
import { ReportRating } from "./ReportRating";

export interface Report {
    id: number,
    username: string,
    startTimestamp: number | null,
    endTimestamp: number | null,
    match: Match,
    events: Array<MatchEvent>,
    rating: ReportRating
}
