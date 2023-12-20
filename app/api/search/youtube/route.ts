import { NextRequest, NextResponse } from "next/server";
import { YoutubeSearchResponse } from "@/libs/types/youtubeTypes";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const { search, pageToken } = Object.fromEntries(url.searchParams.entries());

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${
        pageToken ? pageToken : ""
      }&q=${search}&key=${process.env.YOUTUBE_API_KEY}`,
    );
    const data: YoutubeSearchResponse | { error: { code: number } } =
      await res.json();

    if ("error" in data) {
      return new NextResponse(
        JSON.stringify({ message: "Youtube API Error" }),
        {
          status: 500,
          statusText: "Youtube API Error",
        },
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "success",
        result: data,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("server error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
