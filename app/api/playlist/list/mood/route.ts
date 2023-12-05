import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { PlaylistMoodType } from "@/libs/types/song&playlistType";
import {
  formatDateFilter,
  formatPlaylistsSongOrder,
} from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { param, recent } = Object.fromEntries(url.searchParams.entries()) as {
    param: PlaylistMoodType | "null" | "undefined";
    recent: string;
  };

  const recentDate = formatDateFilter(recent);
  const isAll = param === "null" || param === "undefined" || !param;
  const moodSearch = isAll
    ? {
        createdAt: {
          gte: recentDate,
        },
      }
    : [
        {
          mood: {
            name: param,
          },
        },
        {
          createdAt: {
            gte: recentDate,
          },
        },
      ];

  try {
    const moodPlayLists = await prisma.playlist.findMany({
      where: {
        AND: moodSearch,
      },
      take: 10,
      orderBy: {
        likedCount: "desc",
      },
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
        songs: {
          select: {
            id: true,
            title: true,
            artist: true,
            url: true,
            likedUsers: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    const playlistSongOrder = await prisma.playlistSongIndex.findMany({
      where: {
        playlist: {
          id: {
            in: moodPlayLists.map((playlist) => playlist.id),
          },
        },
      },
      select: {
        playlistId: true,
        songId: true,
        songIndex: true,
      },
    });

    const moodPlayListsOrdered = formatPlaylistsSongOrder(
      moodPlayLists,
      playlistSongOrder,
    );

    return new NextResponse(
      JSON.stringify({
        message: "success",
        moodPlayLists: moodPlayListsOrdered,
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
