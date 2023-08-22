import { Database } from "@/lib/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];
