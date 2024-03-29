import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    const playlistIdPaths = await prisma.playlist
      .findMany({
        select: {
          id: true,
          title: true,
        },
      })
      .then((res) => {
        return res && res.length > 0
          ? res.map((item) => encodeURIComponent(item.title))
          : [];
      });

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
    console.log("playlist paths error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail", errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
