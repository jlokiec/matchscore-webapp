export interface MatchEvent {
    id: number;
    timestamp: number;
    eventType: EventType;
    description: string;
    reportId: number;
    category: EventCategory;
}

export enum EventCategory {
    GENERAL = 'GENERAL',
    HOME_TEAM = 'HOME_TEAM',
    AWAY_TEAM = 'AWAY_TEAM'
}

export enum EventType {
    FIRST_HALF_START = 'FIRST_HALF_START',
    FIRST_HALF_END = 'FIRST_HALF_END',
    SECOND_HALF_START = 'SECOND_HALF_START',
    SECOND_HALF_END = 'SECOND_HALF_END',
    GOAL = 'GOAL',
    YELLOW_CARD = 'YELLOW_CARD',
    RED_CARD = 'RED_CARD'
}
