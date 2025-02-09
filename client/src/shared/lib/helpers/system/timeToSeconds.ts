export const timeToSeconds = (time: string): number => {
    const units: Record<string, number> = {
        s: 1,
        m: 60,
        h: 60 * 60,
        d: 24 * 60 * 60,
        w: 7 * 24 * 60 * 60
    };

    const match = time.match(/^(\d+)(s|m|h|d|w)$/);
    if (!match) throw new Error("Invalid time format. Use format like '1d', '15m', '30s'.");

    const value = parseInt(match[1], 10);
    const unit = match[2] as keyof typeof units;

    return value * units[unit];
};