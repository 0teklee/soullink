import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const userId = new URL(req.url).searchParams.get("userId") || "";

    if (!userId) {
      const nonLoginSuggestions = await prisma.playlist.findMany({
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
              isEditor: true,
            },
          },
          likedBy: {
            select: {
              userId: true,
              user: {
                select: {
                  id: true,
                  nickname: true,
                  profilePic: true,
                  isEditor: true,
                },
              },
            },
          },
          songs: {
            select: {
              id: true,
              title: true,
              artist: true,
              url: true,
              likedCount: true,
            },
          },
          mood: {
            select: {
              name: true,
            },
          },
        },
      });
      return new NextResponse(
        JSON.stringify({
          message: "success",
          userRecommendPlaylist: nonLoginSuggestions,
        }),
        {
          status: 200,
          statusText: "OK",
        },
      );
    }

    const userFavoritePlaylist = await prisma.playlist.findMany({
      where: {
        OR: [
          {
            likedCount: {
              gte: 1,
            },
            author: {
              followers: {
                every: {
                  followerId: userId,
                },
              },
            },
          },
          {
            likedCount: {
              gte: 1,
            },
            likedBy: {
              every: {
                user: {
                  following: {
                    some: {
                      followingId: userId,
                    },
                  },
                },
              },
            },
          },
        ],
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
            isEditor: true,
          },
        },
        likedBy: {
          select: {
            userId: true,
            user: {
              select: {
                id: true,
                nickname: true,
                profilePic: true,
                isEditor: true,
              },
            },
          },
        },
        songs: {
          select: {
            id: true,
            title: true,
            artist: true,
            url: true,
            likedCount: true,
          },
        },
        mood: {
          select: {
            name: true,
          },
        },
      },
    });

    const followingUsers = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          following: {
            select: {
              followingId: true,
            },
          },
        },
      })
      .then((res) => res?.following || []);

    const userFollowingPlaylistPromise = await prisma.playlist.findMany({
      where: {
        AND: [
          {
            likedCount: {
              gte: 1,
            },
          },
          {
            likedBy: {
              every: {
                userId: {
                  in: followingUsers.map((user) => user.followingId),
                },
              },
            },
          },
        ],
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
            isEditor: true,
          },
        },
        likedBy: {
          select: {
            userId: true,
            user: {
              select: {
                id: true,
                nickname: true,
                profilePic: true,
                isEditor: true,
              },
            },
          },
        },
        songs: {
          select: {
            id: true,
            title: true,
            artist: true,
            url: true,
            likedCount: true,
          },
        },
        mood: {
          select: {
            name: true,
          },
        },
      },
    });

    const userFollowingPlaylist = await Promise.all(
      userFollowingPlaylistPromise,
    ).then((res) => {
      return res.flat();
    });

    const userRecommendPlaylist = userFavoritePlaylist
      .concat(userFollowingPlaylist)
      .filter((playlist, index) => {
        return (
          index ===
          userFavoritePlaylist.concat(userFollowingPlaylist).findIndex((p) => {
            return p.id === playlist.id;
          })
        );
      })
      .sort((a, b) => b.likedCount - a.likedCount);

    return new NextResponse(
      JSON.stringify({
        message: "success",
        userRecommendPlaylist,
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
