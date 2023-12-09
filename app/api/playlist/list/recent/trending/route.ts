import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import {
  formatDateFilter,
  formatSongResponse,
} from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { recent } = Object.fromEntries(url.searchParams.entries());
  const recentDate = formatDateFilter(recent);

  try {
    const trendingMainPlaylist = await prisma.playlist
      .findMany({
        take: 20,
        where: {
          OR: [
            {
              createdAt: {
                gte: recentDate,
              },
            },
            {
              recentPlay: {
                some: {
                  createdAt: {
                    gte: recentDate,
                  },
                },
              },
            },
          ],
        },
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            playedTime: "desc",
          },
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
          playedTime: true,
          mood: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
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
            },
          },
          likedBy: {
            select: {
              userId: true,
              user: {
                select: {
                  nickname: true,
                  profilePic: true,
                },
              },
            },
          },
        },
      })
      .then((playlists) =>
        playlists.map((playlist) => {
          return { ...playlist, songs: formatSongResponse(playlist.songs) };
        }),
      );

    return new NextResponse(
      JSON.stringify({
        message: "success",
        trendingMainPlaylist,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("server error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
