import { NextResponse } from "next/server";
import { PlaylistLikeType } from "@/libs/types/song&playlistType";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const request: PlaylistLikeType = await req.json().then((data) => data);
    const { userId, playlistId } = request;

    if (!userId || !playlistId)
      return new NextResponse(JSON.stringify({ message: "fail" }), {
        status: 400,
        statusText: "Bad Request",
      });

    const existingLike = await prisma.playlistLikedByUsers.findFirst({
      where: { userId, playlistId },
    });

    if (existingLike && userId) {
      await prisma.playlistLikedByUsers.delete({
        where: { userId_playlistId: { userId, playlistId } },
      });

      await prisma.playlist.update({
        where: { id: playlistId },
        data: {
          likedCount: {
            decrement: 1,
          },
        },
      });

      const likedBy = await prisma.playlist.findUnique({
        where: { id: playlistId },
        select: {
          likedBy: {
            select: {
              userId: true,
              playlistId: true,
              user: {
                select: { nickname: true, profilePic: true },
              },
            },
          },
        },
      });

      return new NextResponse(
        JSON.stringify({
          message: "unlike success",
          userId,
          playlistId,
          likedBy: likedBy?.likedBy || [],
        }),
        { status: 200, statusText: "OK" },
      );
    }

    await prisma.playlistLikedByUsers.create({
      data: {
        userId,
        playlistId,
      },
    });

    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        likedCount: {
          increment: 1,
        },
      },
    });

    const likedBy = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: {
        likedBy: {
          select: {
            userId: true,
            playlistId: true,
            user: {
              select: { nickname: true, profilePic: true },
            },
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "like success",
        userId,
        playlistId,
        likedBy: likedBy?.likedBy || [],
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("like playlist error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
