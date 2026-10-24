let sequence = 0;
// Local preview identifiers only, never trusted by a production backend.
export function nextPreviewOrderId(): string { sequence += 1; return `preview-${Date.now()}-${sequence}`; }
