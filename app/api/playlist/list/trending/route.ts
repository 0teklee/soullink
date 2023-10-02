import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
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
        playCount: true,
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
        trendingPlayLists: trendingPlaylist,
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
