import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const User = pgTable("User", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    email: varchar("email", { length: 255 }).unique(),
    role: varchar("role", { length: 50 }).notNull().default("user"),
    password: text("password").notNull(),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
