export const APP_NAME = "dwijabake";

export type HealthStatus = "ok" | "error";

export interface HealthResponse {
  status: HealthStatus;
}

export interface DbCheckResponse {
  ok: boolean;
  time?: string;
  error?: string;
}
