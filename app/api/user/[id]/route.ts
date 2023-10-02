import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const pathname = new URL(req.url).pathname.split("/");
    const nickname = decodeURIComponent(pathname[pathname.length - 1]);

    const user = await prisma.user.findUnique({
      where: {
        nickname,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        nickname: true,
        profilePic: true,
        bio: true,
        instagram: true,
        twitter: true,
        website: true,
        followers: true,
        following: true,
        likedPlayLists: true,
        likedSong: true,
        createdPlaylists: {
          select: {
            id: true,
            author: {
              select: {
                id: true,
                nickname: true,
              },
            },
            title: true,
            description: true,
            coverImage: true,
            createdAt: true,
            songs: {
              select: {
                id: true,
                title: true,
                artist: true,
                thumbnail: true,
                playedCount: true,
                likedUsers: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("post playlistDetail error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail", errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
