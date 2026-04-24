import { UserProfileImage } from '../../../../../server/src/database/schemas/index.js';
import { db } from '../../../database/db.js';
import { eq } from 'drizzle-orm';
export const imageHelper = {
    async getUserProfileImage(userId) {
        const [result] = await db
            .select()
            .from(UserProfileImage)
            .where(eq(UserProfileImage.userId, userId))
            .limit(1);
        return result ?? null;
    },
    async saveUserProfileImage(userId, imageUrl, imageKey) {
        const result = await db
            .update(UserProfileImage)
            .set({
            imageUrl,
            imageKey,
        })
            .where(eq(UserProfileImage.userId, userId))
            .returning();
        return result;
    },
    async deleteUserProfileImage(userId) {
        const result = await db
            .update(UserProfileImage)
            .set({
            imageUrl: null,
            imageKey: null,
        })
            .where(eq(UserProfileImage.userId, userId))
            .returning();
        return result;
    },
};
