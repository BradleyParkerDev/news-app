import dotenv from 'dotenv';
import { jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcrypt';
// Load environment variables from .env file
dotenv.config();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 5);
const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const SESSION_MODE = process.env.SESSION_MODE ?? 'long';
const SESSION_SHORT_MINUTES = Number(process.env.SESSION_SHORT_MINUTES ?? 2);
const SESSION_MEDIUM_MINUTES = Number(process.env.SESSION_MEDIUM_MINUTES ?? 30);
const SESSION_LONG_DAYS = Number(process.env.SESSION_LONG_DAYS ?? 7);
const authServerUtil = {
    saltRounds: SALT_ROUNDS,
    jwtSecretKey: JWT_SECRET_KEY,
    getSessionExpirationMs() {
        const now = Date.now();
        switch (SESSION_MODE) {
            case 'short':
                return now + SESSION_SHORT_MINUTES * 60 * 1000;
            case 'medium':
                return now + SESSION_MEDIUM_MINUTES * 60 * 1000;
            case 'long':
            default:
                return now + SESSION_LONG_DAYS * 24 * 60 * 60 * 1000;
        }
    },
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },
    async validatePassword(password, hashedPassword) {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    },
    async generateToken(payload) {
        // Generate Access Token
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(payload.exp)
            .sign(this.jwtSecretKey);
    },
    async verifyToken(accessToken) {
        if (!accessToken) {
            console.error('No token provided');
            return null;
        }
        try {
            const { payload } = await jwtVerify(accessToken, this.jwtSecretKey, {
                algorithms: ['HS256'],
            });
            return payload;
        }
        catch (error) { }
        return null;
    },
    generateTokenExpirationTime(sessionCreatedAt, sessionExpiresAt) {
        //return expiration for all session lengths based on login time
        return {
            tokenExpiration: sessionExpiresAt - sessionCreatedAt,
        };
    },
};
export default authServerUtil;
