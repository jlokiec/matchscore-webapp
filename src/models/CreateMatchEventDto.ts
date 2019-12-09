import { EventType, EventCategory } from "./MatchEvent";

export interface CreateMatchEventDto {
    timestamp: number;
    eventType: EventType;
    description: string;
    reportId: number;
    category: EventCategory
}
