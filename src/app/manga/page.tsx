import { getPopularManga } from "@/action/get-manga";
import HeroSection from "@/components/manga/hero-section";

import React from "react";

async function MangaPage() {
  const manga = await getPopularManga();
  return (
    <div>
      <HeroSection manga={manga?.results} />
    </div>
  );
}

export default MangaPage;
