export const timeToMs = (time: string): number => {
    const units: Record<string, number> = {
        ms: 1,
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
        w: 7 * 24 * 60 * 60 * 1000
    };

    const match = time.match(/^(\d+)(ms|s|m|h|d|w)$/);
    if (!match) throw new Error("Invalid time format. Use format like '1d', '15m', '30s'.");

    const value = parseInt(match[1], 10);
    const unit = match[2] as keyof typeof units;

    return value * units[unit];
};