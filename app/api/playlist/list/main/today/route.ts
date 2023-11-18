import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
  );
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
    23,
    59,
    59,
  );

  try {
    const todayPlaylist = await prisma.playlist.findMany({
      take: 20,
      where: {
        AND: [
          {
            createdAt: {
              gte: yesterday,
              lt: today,
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
