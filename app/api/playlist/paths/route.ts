import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const playlistIdPaths = await prisma.playlist
      .findMany({
        select: {
          id: true,
          title: true,
        },
      })
      .then((res) => res.map((item) => item.title.replace(" ", "-")));

    return NextResponse.json(
      {
        playlistsPaths: playlistIdPaths,
      },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("post detail error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail", errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
