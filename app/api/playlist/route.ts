import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// Playlist Detail page get 요청 예시

export async function GET(req: Request) {
  try {
    const pathname = new URL(req.url).pathname.split("/");
    // todo playlist id -> playlist title로 페이지 route 변경 필요할 수도 있음.
    // todo play 재생시 client에서 재생 횟수 추가 요청 api 필요
    const id = pathname[pathname.length - 1].replace("-", " ");
    const playlist = await prisma.playlist.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        songs: true,
        likedBy: true,
        playCount: true,
      },
    });

    return NextResponse.json(
      {
        playlistData: playlist,
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
