import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import {
  formatDateFilter,
  formatSearchOrderBy,
  formatSongResponse,
} from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { recent, orderBy } = Object.fromEntries(url.searchParams.entries());
  const recentDate = formatDateFilter(recent);
  const order = formatSearchOrderBy(orderBy);

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

    const mostCountCategoryListId =
      mostCountCategoryList && mostCountCategoryList.length > 0
        ? mostCountCategoryList.map((category) => category.id)
        : [];

    const recentMostPlayedCategoryPlaylist = await prisma.playlist
      .findMany({
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
          order,
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
                  playedCount: true,
                  likedCount: true,
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
      .then((playlists) => {
        if (!playlists || playlists?.length === 0) {
          return [];
        }
        return playlists.map((playlist) => {
          return { ...playlist, songs: formatSongResponse(playlist.songs) };
        });
      });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        recentMostPlayedCategoryPlaylist,
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
