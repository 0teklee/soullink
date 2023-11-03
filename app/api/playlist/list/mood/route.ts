import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { PlaylistMoodType } from "@/libs/types/common/Song&PlaylistType";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { param } = Object.fromEntries(url.searchParams.entries()) as {
    param: PlaylistMoodType;
  };

  try {
    const moodPlayLists = await prisma.playlist.findMany({
      where: {
        mood: {
          name: param,
        },
      },
      take: 10,
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
            profilePic: true,
          },
        },
        likedBy: {
          select: {
            userId: true,
          },
        },
        mood: {
          select: {
            name: true,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        moodPlayLists,
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
