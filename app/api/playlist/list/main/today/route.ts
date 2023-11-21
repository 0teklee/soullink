import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import dayjs from "dayjs";

export async function GET() {
  const now = dayjs();
  const today = now.startOf("day").toDate();
  const yesterday = now.subtract(1, "day").startOf("day").toDate();

  try {
    const todayPlaylist = await prisma.playlist.findMany({
      take: 20,
      where: {
        OR: [
          {
            createdAt: {
              gte: yesterday,
              lt: today,
            },
          },
          {
            recentPlay: {
              every: {
                createdAt: {
                  gte: yesterday,
                  lt: today,
                },
              },
            },
          },
        ],
      },
      orderBy: [
        {
          author: {
            isEditor: "desc",
          },
        },
        { createdAt: "asc" },
        {
          recentPlay: {
            _count: "desc",
          },
        },
        { playedCount: "desc" },
        {
          likedCount: "desc",
        },
      ],
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
        todayPlaylist,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("sercer error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
