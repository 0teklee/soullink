import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// Trending Get 요청 예시

export async function GET() {
  try {
    // for example to get songs
    const songs = await prisma.song.findMany({
      take: 20,
      orderBy: {
        playedCount: "desc",
      },
      select: {
        id: true,
        title: true,
        artist: true,
        thumbnail: true,
        playedCount: true,
        likedUsers: {
          select: {
            userId: true,
          },
        },
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "success", trendingData: songs }),
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
