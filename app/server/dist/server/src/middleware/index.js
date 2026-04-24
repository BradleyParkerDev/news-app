import { createAuthService } from '../services/index.js';
const middleware = {
    async session(req, res, next) {
        const accessToken = req.cookies['sessionCookie'];
        const auth = createAuthService(req, res);
        await auth.authCheck(accessToken);
        next();
    },
};
export default middleware;
