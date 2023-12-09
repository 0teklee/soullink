import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import {
  formatDateFilter,
  formatSearchOrderBy,
  formatSongResponse,
} from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { recent, keyword, orderBy } = Object.fromEntries(
    url.searchParams.entries(),
  );
  const recentDate = formatDateFilter(recent);
  const order = formatSearchOrderBy(orderBy);

  try {
    const categoriesDB = await prisma.category.findMany({
      where: {
        name: {
          contains: keyword,
        },
      },
      orderBy: [
        {
          _relevance: {
            fields: ["name"],
            search: keyword,
            sort: "asc",
          },
        },
      ],
      select: {
        name: true,
      },
    });

    const categories = categoriesDB.map((category) => category.name);

    const playlists = await prisma.playlist
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
                  name: {
                    in: categories,
                  },
                },
              },
            },
          ],
        },
        orderBy: order,
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
        result: playlists,
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
