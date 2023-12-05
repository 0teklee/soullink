import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatPlaylistsSongOrder } from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  const searchId = id ? (JSON.parse(id) as string[]) : null;
  const whereParam = searchId
    ? {
        id: {
          in: searchId,
        },
      }
    : {};

  try {
    const trendingPlaylist = await prisma.playlist.findMany({
      take: 20,
      orderBy: {
        likedCount: "desc",
      },
      where: whereParam,
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
        createdAt: true,
        likedCount: true,
        author: {
          select: {
            id: true,
            nickname: true,
            profilePic: true,
          },
        },
        authorId: true,
        playedCount: true,
        songs: {
          select: {
            id: true,
            title: true,
            artist: true,
            url: true,
            likedCount: true,
            likedUsers: {
              select: {
                userId: true,
              },
            },
          },
        },
        likedBy: {
          select: {
            userId: true,
          },
        },
      },
    });

    const playlistSongOrder = await prisma.playlistSongIndex.findMany({
      where: {
        playlist: {
          id: {
            in: trendingPlaylist.map((playlist) => playlist.id),
          },
        },
      },
      select: {
        playlistId: true,
        songId: true,
        songIndex: true,
      },
    });

    const trendingPlaylistOrdered = formatPlaylistsSongOrder(
      trendingPlaylist,
      playlistSongOrder,
    );

    return new NextResponse(
      JSON.stringify({
        message: "success",
        trendingPlayLists: trendingPlaylistOrdered,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("write.ts error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
