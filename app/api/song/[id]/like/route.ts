import { NextResponse } from "next/server";
import { SongLikeType } from "@/libs/types/song&playlistType";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const request: SongLikeType = await req.json().then((data) => data);
    const { userId, songId } = request;

    const existingLike = await prisma.songLikedByUsers.findFirst({
      where: { userId, songId },
    });

    if (existingLike) {
      await prisma.songLikedByUsers.delete({
        where: { userId_songId: { userId, songId } },
      });

      const likedBy = await prisma.song.update({
        where: { id: songId },
        data: {
          likedCount: {
            decrement: 1,
          },
        },
        select: {
          likedUsers: {
            select: {
              userId: true,
            },
          },
        },
      });

      return new NextResponse(
        JSON.stringify({
          message: "unlike success",
          songId,
          likedBy: likedBy.likedUsers,
        }),
        { status: 200, statusText: "OK" },
      );
    }

    await prisma.songLikedByUsers.create({
      data: {
        userId,
        songId,
      },
    });

    const likedBy = await prisma.song.update({
      where: { id: songId },
      data: {
        likedCount: {
          increment: 1,
        },
      },
      select: {
        likedUsers: {
          select: {
            userId: true,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "like success",
        songId,
        likedUsers: likedBy.likedUsers,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("like song error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
