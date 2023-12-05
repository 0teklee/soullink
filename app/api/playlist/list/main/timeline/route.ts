import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatPlaylistsSongOrder } from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");

  try {
    const userFollowingsDB = await prisma.user.findUnique({
      where: {
        id: userId || "",
      },
      select: {
        following: {
          select: {
            followingId: true,
          },
        },
      },
    });

    const userFollowings =
      userFollowingsDB?.following.map((following) => following.followingId) ||
      [];

    const timelinePlaylists = await prisma.playlist.findMany({
      take: 20,
      where: {
        OR: [
          {
            author: {
              id: {
                in: userFollowings,
              },
            },
          },
          {
            likedBy: {
              every: {
                user: {
                  id: {
                    in: userFollowings,
                  },
                },
              },
            },
          },
          {
            recentPlay: {
              every: {
                user: {
                  every: {
                    id: {
                      in: userFollowings,
                    },
                  },
                },
              },
            },
          },
        ],
      },
      orderBy: [
        { createdAt: "desc" },
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
        category: {
          select: {
            name: true,
          },
        },
        mood: {
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
            in: timelinePlaylists.map((playlist) => playlist.id),
          },
        },
      },
      select: {
        playlistId: true,
        songId: true,
        songIndex: true,
      },
    });

    const timelinePlaylistsOrdered = formatPlaylistsSongOrder(
      timelinePlaylists,
      playlistSongOrder,
    );

    return new NextResponse(
      JSON.stringify({
        message: "success",
        timelinePlaylists: timelinePlaylistsOrdered,
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
