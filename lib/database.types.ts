export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			links: {
				Row: {
					created_at: string;
					id: string;
					platform_id: string;
					profile_id: string;
					url: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					platform_id: string;
					profile_id: string;
					url: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					platform_id?: string;
					profile_id?: string;
					url?: string;
				};
				Relationships: [
					{
						foreignKeyName: "links_platform_id_fkey";
						columns: ["platform_id"];
						referencedRelation: "platforms";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "links_profile_id_fkey";
						columns: ["profile_id"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
				];
			};
			platforms: {
				Row: {
					color: string;
					created_at: string;
					id: string;
					name: string;
				};
				Insert: {
					color: string;
					created_at?: string;
					id?: string;
					name: string;
				};
				Update: {
					color?: string;
					created_at?: string;
					id?: string;
					name?: string;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					avatar: string | null;
					email: string;
					first_name: string | null;
					id: string;
					last_name: string | null;
				};
				Insert: {
					avatar?: string | null;
					email: string;
					first_name?: string | null;
					id: string;
					last_name?: string | null;
				};
				Update: {
					avatar?: string | null;
					email?: string;
					first_name?: string | null;
					id?: string;
					last_name?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
