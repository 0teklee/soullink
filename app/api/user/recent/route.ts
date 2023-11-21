import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userId = new URL(request.url).searchParams.get("userId");
    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "no userId or playlistId",
          userId,
          recentPlayed: [],
        }),
        { status: 400, statusText: "Internal Server Error" },
      );
    }

    const recentPlayedDB = await prisma.recentPlay.findMany({
      where: {
        user: {
          some: {
            id: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        playlist: {
          select: {
            id: true,
            title: true,
            description: true,
            coverImage: true,
            createdAt: true,
            updatedAt: true,
            playedCount: true,
            likedCount: true,
            author: {
              select: {
                id: true,
                nickname: true,
                profilePic: true,
              },
            },
            songs: {
              select: {
                id: true,
                title: true,
                artist: true,
                url: true,
                playedCount: true,
              },
            },
            likedBy: {
              select: {
                userId: true,
                user: {
                  select: {
                    id: true,
                    nickname: true,
                    profilePic: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const recentPlayed = recentPlayedDB
      .map((item) => item.playlist)
      .flat()
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id),
      );

    return new NextResponse(
      JSON.stringify({
        message: "count updated",
        userId,
        recentPlayed,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "server error",
      }),
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, playlistId } = await request.json();

    const errorReturn = new NextResponse(
      JSON.stringify({
        message: "no userId or playlistId",
      }),
      { status: 400, statusText: "Internal Server Error" },
    );
    if (!userId) {
      return errorReturn;
    }
    if (!playlistId) {
      return errorReturn;
    }

    const recentPlay = await prisma.recentPlay.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        playlist: {
          connect: {
            id: playlistId,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "recent played record updated",
        recentPlay,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (error) {
    console.error("error", error);
    return new NextResponse(
      JSON.stringify({
        message: "server error",
      }),
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
