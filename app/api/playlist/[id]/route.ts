import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatSongOrder } from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  try {
    const pathname = new URL(req.url).pathname.split("/");
    const title = decodeURIComponent(pathname[pathname.length - 1]);

    const playlist = await prisma.playlist.findUnique({
      where: {
        title,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        coverImage: true,
        likedCount: true,
        author: {
          select: {
            id: true,
            nickname: true,
            profilePic: true,
          },
        },
        songs: {
          select: {
            id: true,
            title: true,
            artist: true,
            thumbnail: true,
            url: true,
            playedCount: true,
            likedUsers: {
              select: {
                userId: true,
              },
            },
          },
        },
        likedBy: true,
        playedCount: true,
        mood: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!playlist) {
      return new NextResponse(
        JSON.stringify({ message: "playlist not found", errorCode: 404 }),
        {
          status: 404,
          statusText: "Not Found",
        },
      );
    }

    const playlistSongOrder = await prisma.playlistSongIndex.findMany({
      where: {
        playlist: {
          id: playlist.id,
        },
      },
      select: {
        songId: true,
        songIndex: true,
      },
    });

    const playlistOrdered = formatSongOrder(playlist.songs, playlistSongOrder);

    return NextResponse.json(
      {
        data: { ...playlist, songs: playlistOrdered },
      },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("post playlistDetail error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail to get playlist", errorCode: 500 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
