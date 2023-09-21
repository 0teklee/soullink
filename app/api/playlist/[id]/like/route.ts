import { NextResponse } from "next/server";
import { PlaylistLikeType } from "@/types/common/Song&PlaylistType";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const request: PlaylistLikeType = await req.json().then((data) => data);
    const { userId, playlistId } = request;

    const existingLike = await prisma.playlistLikedByUsers.findFirst({
      where: { userId, playlistId },
    });

    if (existingLike) {
      await prisma.playlistLikedByUsers.delete({
        where: { userId_playlistId: { userId, playlistId } },
      });
      return new NextResponse(
        JSON.stringify({
          message: "unlike success",
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

    return new NextResponse(
      JSON.stringify({
        message: "like success",
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
