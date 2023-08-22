import { BiUserCircle } from "react-icons/bi";
import { ImLink } from "react-icons/im";

import { LinksTab } from "@/links/components/LinksTab";
import { ProfileTab } from "@/profiles/components";

import { DashboardTab } from "./types";

export const DASHBOARD_TABS = [
	{
		name: DashboardTab.Links,
		icon: <ImLink size={16} />,
		content: <LinksTab />,
	},
	{
		name: DashboardTab.ProfileDetails,
		icon: <BiUserCircle size={20} />,
		content: <ProfileTab />,
	},
];
