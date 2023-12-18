import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { TrendingSongPlaylistType } from "@/libs/types/song&playlistType";

export async function GET() {
  try {
    const songs = await prisma.song.findMany({
      take: 20,
      orderBy: [
        {
          playedCount: "desc",
        },
        {
          likedCount: "desc",
        },
      ],
      select: {
        id: true,
        title: true,
        artist: true,
        url: true,
        thumbnail: true,
        playedCount: true,
        likedUsers: {
          select: {
            userId: true,
          },
        },
        likedCount: true,
      },
    });

    const hotTrackPlaylist: TrendingSongPlaylistType = {
      id: "hotTrack",
      title: "Popular Tracks",
      description: "Trending Songs",
      authorId: "admin",
      author: {
        id: "admin",
        nickname: "",
      },
      songs: songs && songs.length > 0 ? songs : [],
      isSongTable: true,
      category: [{ name: "trending" }],
      mood: { name: "chill" },
    };

    return new NextResponse(
      JSON.stringify({ message: "success", trendingData: hotTrackPlaylist }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("trending songs get api error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
