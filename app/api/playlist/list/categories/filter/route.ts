import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import {
  formatDateFilter,
  formatPlaylistsSongOrder,
} from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { recent, categories } = Object.fromEntries(url.searchParams.entries());
  const recentDate = formatDateFilter(recent);
  const categoryList = JSON.parse(categories);

  try {
    const filteredCategoriesList = await prisma.playlist.findMany({
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
              some: {
                name: {
                  in: categoryList,
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
          likedCount: "desc",
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
          },
        },
      },
    });
    const playlistSongOrder = await prisma.playlistSongIndex.findMany({
      where: {
        playlist: {
          id: {
            in: filteredCategoriesList.map((playlist) => playlist.id),
          },
        },
      },
      select: {
        playlistId: true,
        songId: true,
        songIndex: true,
      },
    });

    const filteredPlaylistsSongOrdered = formatPlaylistsSongOrder(
      filteredCategoriesList,
      playlistSongOrder,
    );

    return new NextResponse(
      JSON.stringify({
        message: "success",
        filteredCategoriesList: filteredPlaylistsSongOrdered,
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
