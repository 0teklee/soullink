import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatDateFilter } from "@/libs/utils/server/formatter";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { recent } = Object.fromEntries(url.searchParams.entries()) as {
      recent: string;
    };

    const recentDate = formatDateFilter(recent);

    const songs = await prisma.songLikedByUsers.findMany({
      take: 20,
      where: {
        createdAt: {
          gte: recentDate,
        },
      },
      orderBy: [
        {
          song: {
            playedCount: "desc",
          },
        },
        {
          song: {
            likedCount: "desc",
          },
        },
      ],
      select: {
        song: {
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
    console.log("main trending playlists get api error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

export const dynamic = "force-dynamic";
