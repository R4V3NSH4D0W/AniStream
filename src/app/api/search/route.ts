import { NextRequest, NextResponse } from "next/server";
import { ANIME } from "@consumet/extensions";

const zoroAnime = new ANIME.Zoro();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const response = await zoroAnime.search(query);
    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Error searching anime:", error);
    return NextResponse.json({ error: "Failed to fetch anime" }, { status: 500 });
  }
}
