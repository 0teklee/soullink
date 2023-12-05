import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import {
  formatDateFilter,
  formatPlaylistsSongOrder,
} from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { recent } = Object.fromEntries(url.searchParams.entries());
  const recentDate = formatDateFilter(recent);

  try {
    const mostCountCategoryList = await prisma.category.findMany({
      take: 20,
      orderBy: [
        {
          playlists: {
            _count: "desc",
          },
        },
      ],
    });

    const mostCountCategoryListId = mostCountCategoryList.map(
      (category) => category.id,
    );

    const recentMostPlayedCategoryPlaylist = await prisma.playlist.findMany({
      take: 20,
      where: {
        AND: [
          {
            createdAt: {
              gte: recentDate,
            },
          },
          {
            category: {
              every: {
                id: {
                  in: mostCountCategoryListId,
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
            profilePic: true,
          },
        },
        authorId: true,
        playedCount: true,
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
            user: {
              select: {
                nickname: true,
                profilePic: true,
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
            in: recentMostPlayedCategoryPlaylist.map((playlist) => playlist.id),
          },
        },
      },
      select: {
        playlistId: true,
        songId: true,
        songIndex: true,
      },
    });

    const recentMostPlayedCategoryListsOrdered = formatPlaylistsSongOrder(
      recentMostPlayedCategoryPlaylist,
      playlistSongOrder,
    );

    return new NextResponse(
      JSON.stringify({
        message: "success",
        recentMostPlayedCategoryPlaylist: recentMostPlayedCategoryListsOrdered,
        categories: mostCountCategoryList.map((category) => category.name),
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
