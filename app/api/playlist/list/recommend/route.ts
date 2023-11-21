import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const userId = new URL(req.url).searchParams.get("userId") || "";

    if (!userId) {
      const nonLoginSuggestions = await prisma.playlist.findMany({
        take: 10,
        orderBy: [
          { createdAt: "desc" },
          {
            recentPlay: {
              _count: "desc",
            },
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

    const userLikeCategoriesMood = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
        select: {
          likedPlayLists: {
            take: 10,
            orderBy: [
              {
                playlist: {
                  recentPlay: {
                    _count: "desc",
                  },
                },
              },
              {
                playlist: {
                  recentPlay: {
                    _count: "desc",
                  },
                },
              },
            ],
            select: {
              playlist: {
                select: {
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
                },
              },
            },
          },
        },
      })
      .then((res) => {
        if (!res) {
          return {};
        }

        const playlist = res.likedPlayLists.map(
          (playlist) => playlist.playlist,
        );
        const likeCategories = playlist
          .map((item) => item.category.map((category) => category.name))
          .flat()
          .filter((v, i, a) => a.indexOf(v) === i);

        const likeMoods = playlist
          .map((item) => item.mood.name)
          .filter((v, i, a) => a.indexOf(v) === i);

        return {
          likeCategories,
          likeMoods,
        };
      });

    const { likeCategories, likeMoods } = userLikeCategoriesMood;

    const userFavoritePlaylist = await prisma.playlist.findMany({
      where: {
        OR: [
          {
            author: {
              followers: {
                some: {
                  followerId: userId,
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
                      followerId: userId,
                    },
                  },
                },
              },
            },
          },
          {
            mood: {
              name: {
                in: likeMoods,
              },
            },
          },
          {
            category: {
              some: {
                name: {
                  in: likeCategories,
                },
              },
            },
          },
        ],
      },
      take: 10,
      orderBy: [
        { createdAt: "desc" },
        {
          recentPlay: {
            _count: "desc",
          },
        },
        {
          playedTime: "desc",
        },
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
        userRecommendPlaylist: userFavoritePlaylist,
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
