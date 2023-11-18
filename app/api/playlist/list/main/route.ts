import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    const trendingPlaylist = await prisma.playlist.findMany({
      take: 20,
      orderBy: {
        likedCount: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
        createdAt: true,
        likedCount: true,
        author: {
          select: {
            id: true,
            nickname: true,
          },
        },
        authorId: true,
        playedCount: true,
        songs: true,
        likedBy: {
          select: {
            userId: true,
          },
        },
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
    console.log("server error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
