import { MatchEvent, EventType, EventCategory } from "../models/MatchEvent"

export interface EventDetails {
    position: "center" | "left" | "right",
    description: string
}

export const processEvent = (event: MatchEvent, allEvents: Array<MatchEvent>): EventDetails => {
    switch (event.category) {
        case EventCategory.AWAY_TEAM:
            return {
                position: "right",
                description: `${calcEventTime(event, allEvents)}' ${event.eventType} ${event.description}`
            };
        case EventCategory.HOME_TEAM:
            return {
                position: "left",
                description: `${calcEventTime(event, allEvents)}' ${event.eventType} ${event.description}`
            };
        default:
            return {
                position: "center",
                description: `${event.eventType} ${event.description}`
            };
    }
}

const calcEventTime = (event: MatchEvent, allEvents: Array<MatchEvent>) => {
    const firstHalfStart = allEvents.find(e => e.eventType === EventType.FIRST_HALF_START);
    const secondHalfStart = allEvents.find(e => e.eventType === EventType.SECOND_HALF_START);

    if (secondHalfStart && event.timestamp > secondHalfStart.timestamp) {
        return Math.ceil((event.timestamp - secondHalfStart.timestamp) / 60) + 45;
    } else if (firstHalfStart) {
        return Math.ceil((event.timestamp - firstHalfStart.timestamp) / 60);
    }
}
