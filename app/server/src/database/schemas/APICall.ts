import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const APICall = pgTable('api_calls', {
	apiCallId: uuid('api_call_id').primaryKey().defaultRandom().unique(),

	apiName: text('api_name').notNull().unique(),

	createdAt: timestamp('created_at').defaultNow().notNull(),

	lastUpdated: timestamp('last_updated')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
