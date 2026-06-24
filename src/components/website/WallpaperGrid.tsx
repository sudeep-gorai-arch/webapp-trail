import WallpaperCard from "./WallpaperCard";

import { Wallpaper } from "@/types/wallpaper";

interface Props {
  wallpapers: Wallpaper[];
}

export default function WallpaperGrid({ wallpapers }: Props) {
  if (!wallpapers.length) {
    return (
      <div
        className="
text-center
text-gray-400
py-20
"
      >
        No wallpapers found
      </div>
    );
  }

  return (
    <div
      className="
grid

grid-cols-2

sm:grid-cols-3

lg:grid-cols-5

gap-8
"
    >
      {wallpapers.map((item) => (
        <WallpaperCard key={item.id} wallpaper={item} />
      ))}
    </div>
  );
}
