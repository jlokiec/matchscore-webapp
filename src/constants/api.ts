export const BASE_URL = "http://localhost:8080/api/";
const PUBLIC_PREFIX = "public/";
const SECURE_PREFIX = "secure/";
export const LEAGUE_CATEGORIES = PUBLIC_PREFIX + "categories";
export const LEAGUES = PUBLIC_PREFIX + "leagues";
export const REGISTER = PUBLIC_PREFIX + "register";
export const LOGIN = "auth";
export const MATCHES = PUBLIC_PREFIX + "matches";
export const CONFIRM_EMAIL = REGISTER + "/confirm";
export const REPORTS = SECURE_PREFIX + "reports";
export const UNRATED_REPORTS = REPORTS + "/unrated";
export const MATCH_EVENTS = SECURE_PREFIX + "events";
export const PLAYERS = PUBLIC_PREFIX + "players";
export const RATINGS = SECURE_PREFIX + "ratings";
