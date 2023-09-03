import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// Get 요청 예시

export async function GET(req: Request) {
  try {
    // for example to get songs
    const songs = await prisma.song.findMany({
      take: 20,
      orderBy: {
        playedCount: "desc",
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
