import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const consultationLeads = sqliteTable("consultation_leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  travelDate: text("travel_date"),
  guestCount: integer("guest_count"),
  interest: text("interest").notNull(),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("website"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
