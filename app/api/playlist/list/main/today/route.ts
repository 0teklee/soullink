import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatSongResponse } from "@/libs/utils/server/formatter";

export async function GET() {
  try {
    const todayPlaylist = await prisma.playlist
      .findMany({
        take: 10,
        orderBy: [
          {
            author: {
              isEditor: "desc",
            },
          },
          { createdAt: "desc" },
          {
            recentPlay: {
              _count: "desc",
            },
          },
          { playedCount: "desc" },
          {
            likedCount: "desc",
          },
        ],
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
            },
          },
          authorId: true,
          playedCount: true,
          fontColor: true,
          bgColor: true,
          songs: {
            orderBy: {
              songIndex: "asc",
            },
            select: {
              songIndex: true,
              song: {
                select: {
                  id: true,
                  title: true,
                  artist: true,
                  url: true,
                  likedCount: true,
                  playedCount: true,
                  likedUsers: {
                    select: {
                      userId: true,
                    },
                  },
                },
              },
              songId: true,
              playlistId: true,
            },
          },
          likedBy: {
            select: {
              userId: true,
            },
          },
        },
      })
      .then((playlists) => {
        return playlists.map((playlist) => {
          return {
            ...playlist,
            songs: formatSongResponse(playlist.songs),
          };
        });
      });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        todayPlaylist,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("sercer error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
