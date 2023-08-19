import { Database } from "@/lib/database.types";

export type Link = Database["public"]["Tables"]["links"]["Row"];
export type InsertLink = Database["public"]["Tables"]["links"]["Insert"];
export type UpdateLink = Database["public"]["Tables"]["links"]["Update"];
export type UpsertLink = InsertLink | UpdateLink;
