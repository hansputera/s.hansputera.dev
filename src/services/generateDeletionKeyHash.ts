import crypto from 'crypto';

export const generateDeletionKeyHash = (short: string, code: string, timestamp = Date.now()) => {
    const hash = crypto.createHash('sha256');
    const padding = crypto.randomBytes(6);

    return hash.update(
        Buffer.concat([
            Buffer.from(short, 'utf8'),
            Buffer.from(code, 'utf8'),
            Buffer.from(timestamp.toString(), 'utf8'),
            padding,
        ])
    ).digest('hex');
}
