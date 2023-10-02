import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const trendingPlaylist = await prisma.playlist.findMany({
      take: 20,
      orderBy: {
        likedCount: "desc",
        playCount: "desc",
      },
    });
    return new NextResponse(
      JSON.stringify({
        message: "success",
        mainData: { trendingData: trendingPlaylist },
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("write.ts error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
