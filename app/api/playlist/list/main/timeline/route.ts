import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

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

    return new NextResponse(
      JSON.stringify({
        message: "success",
        timelinePlaylists,
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
