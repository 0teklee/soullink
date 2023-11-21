import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import dayjs from "dayjs";

export async function GET(req: Request) {
  try {
    const now = dayjs();
    const lastweek = now.subtract(1, "week");
    const userIdQuery = new URL(req.url).searchParams.get("userId");
    const userIdWhere = userIdQuery
      ? {
          OR: [
            {
              AND: [
                {
                  author: {
                    followers: {
                      some: {
                        follower: {
                          id: userIdQuery,
                        },
                      },
                    },
                  },
                },
                {
                  author: {
                    following: {
                      some: {
                        following: {
                          id: userIdQuery,
                        },
                      },
                    },
                  },
                },
              ],
            },
            {
              likedBy: {
                some: {
                  createdAt: {
                    gte: lastweek.toDate(),
                    lte: now.toDate(),
                  },
                  user: {
                    followers: {
                      some: {
                        follower: {
                          id: userIdQuery,
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              recentPlay: {
                some: {
                  createdAt: {
                    gte: lastweek.toDate(),
                    lte: now.toDate(),
                  },
                  user: {
                    some: {
                      followers: {
                        some: {
                          follower: {
                            id: userIdQuery,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        }
      : {};

    const friendsList = await prisma.playlist.findMany({
      take: 20,
      where: userIdWhere,
      orderBy: [
        { playedCount: "desc" },
        {
          recentPlay: {
            _count: "desc",
          },
        },
        { likedCount: "desc" },
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

    return new NextResponse(
      JSON.stringify({
        message: "success",
        mainData: { friendsList },
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
