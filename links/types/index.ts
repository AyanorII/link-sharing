import { Database } from "@/lib/database.types";
import { Platform } from "@/platforms/types";

export type Link = Database["public"]["Tables"]["links"]["Row"];
export type InsertLink = Database["public"]["Tables"]["links"]["Insert"];
export type UpdateLink = Database["public"]["Tables"]["links"]["Update"];
export type UpsertLink = InsertLink | UpdateLink;

export interface LinkWithPlatform extends Link {
	platform: Platform;
}
export type UpsertLinkWithPlatform = UpsertLink & {
	platform: Platform;
};

export type ArrayField<T> = T & {
	fieldId: string;
};
