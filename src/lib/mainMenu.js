import { getMenu, toDots } from "@/lib/menu";

export const getMainMenuDots = (isCn) => toDots(getMenu("mainMenu", isCn));