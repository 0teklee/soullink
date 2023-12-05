import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import dayjs from "dayjs";
import { formatPlaylistsSongOrder } from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { userId } = Object.fromEntries(url.searchParams.entries()) as {
    userId?: string;
  };

  const DISCOVER_MOOD_UPDATE_DAYS = 1;
  const isLogin = !!userId;
  const today = dayjs().startOf("day");
  const discoverTime = today
    .subtract(DISCOVER_MOOD_UPDATE_DAYS, "day")
    .toDate();

  try {
    const mostLikedMood = await prisma.mood
      .findMany({
        orderBy: [
          {
            playlist: {
              _count: "desc",
            },
          },
        ],
        select: {
          name: true,
        },
      })
      .then((moods) => moods.map((mood) => mood.name));

    const userLikeMood = isLogin
      ? await prisma.playlist.findMany({
          where: {
            likedBy: {
              every: {
                userId,
              },
            },
          },
          select: {
            mood: {
              select: {
                name: true,
              },
            },
          },
          take: 15,
        })
      : [];

    const userLikedMoodRank =
      userLikeMood.length > 0
        ? userLikeMood
            .map((mood) => mood.mood.name)
            .reduce((acc, cur) => {
              const rank = acc.findIndex((mood) => mood === cur);
              if (rank === -1) {
                acc.push(cur);
                return acc;
              }
              acc[rank] = cur;
              return acc;
            }, [] as string[])
        : mostLikedMood;

    const moodSearch = {
      mood: {
        name: {
          in: userLikedMoodRank.length > 0 ? userLikedMoodRank : mostLikedMood,
        },
      },
    };

    const moodPlayLists = await prisma.playlist
      .findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  recentPlay: {
                    some: {
                      createdAt: {
                        gte: discoverTime,
                      },
                    },
                  },
                },
                {
                  likedBy: {
                    some: {
                      createdAt: {
                        gte: discoverTime,
                      },
                    },
                  },
                },
                {
                  createdAt: {
                    gte: discoverTime,
                  },
                },
              ],
            },
            moodSearch,
          ],
        },
        take: 10,
        orderBy: [
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
            },
          },
        },
      })
      .then((playlists) =>
        playlists.filter(
          (playlist, index, self) =>
            index === self.findIndex((p) => p.id === playlist.id) &&
            playlist.songs.length > 0 &&
            playlist.title,
        ),
      );

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
