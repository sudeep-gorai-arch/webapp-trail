import { User } from "@/types/user";
import { Wallpaper } from "@/types/wallpaper";

export const canDownloadPremium = (
    user: User | null | undefined,
    wallpaper: Wallpaper | null | undefined
) => {
    if (!wallpaper) return false;

    if (!wallpaper.isPremium) return true;

    return user?.isPremium === true;
};