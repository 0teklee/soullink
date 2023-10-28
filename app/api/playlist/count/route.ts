import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const request: { playlistId: string; playedTime: number } = await req
      .json()
      .then((data) => data);
    const { playedTime, playlistId } = request;

    const prevTime = await prisma.playlist.findFirst({
      where: { id: playlistId },
      select: {
        playedTime: true,
      },
    });

    const updatedCount = await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        playedTime:
          !!prevTime && !!prevTime.playedTime
            ? prevTime.playedTime + playedTime
            : playedTime,
        playedCount: {
          increment: 1,
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "count updated",
        updatedCount,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("update playlist count error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
