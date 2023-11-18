import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const userIdQuery = new URL(req.url).searchParams.get("userId");
    const userIdWhere = userIdQuery
      ? {
          OR: [
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
            {
              likedBy: {
                some: {
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
              likedBy: {
                some: {
                  user: {
                    following: {
                      some: {
                        following: {
                          id: userIdQuery,
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
      orderBy: [{ likedCount: "desc" }, { playedCount: "desc" }],
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
        songs: true,
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
