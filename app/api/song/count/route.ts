import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const request: { songId: string } = await req.json().then((data) => data);
    const { songId } = request;

    const prevTime = await prisma.song.findFirst({
      where: { id: songId },
      select: {
        playedCount: true,
      },
    });

    const updatedCount = await prisma.song.update({
      where: { id: songId },
      data: {
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
    console.log("update song count error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
