import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatSongResponse } from "@/libs/utils/server/formatter";

export async function GET(req: NextRequest) {
  // const userId = new URL(req.url).searchParams.get("userId");
  const lastId = new URL(req.url).searchParams.get("lastId");
  const lastIdCursor = !!lastId ? { cursor: { id: lastId } } : undefined;

  try {
    // const userFollowingsDB = await prisma.user.findUnique({
    //   where: {
    //     id: userId || "",
    //   },
    //   select: {
    //     following: {
    //       select: {
    //         followingId: true,
    //       },
    //     },
    //   },
    // });
    //
    // const userFollowings =
    //   userFollowingsDB?.following.map((following) => following.followingId) ||
    //   [];

    const timelinePlaylists = await prisma.playlist
      .findMany({
        take: 10,
        skip: !!lastIdCursor ? 1 : 0,
        ...lastIdCursor, // where: {
        //   OR: [
        //     {
        //       author: {
        //         id: {
        //           in: userFollowings,
        //         },
        //       },
        //     },
        //     {
        //       likedBy: {
        //         some: {
        //           user: {
        //             id: {
        //               in: userFollowings,
        //             },
        //           },
        //         },
        //       },
        //     },
        //     {
        //       recentPlay: {
        //         some: {
        //           user: {
        //             some: {
        //               id: {
        //                 in: userFollowings,
        //               },
        //             },
        //           },
        //         },
        //       },
        //     },
        //   ],
        // },
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
                },
              },
            },
          },
        },
      })
      .then((playlists) => {
        return playlists.map((playlist) => {
          return {
            ...playlist,
            songs: formatSongResponse(playlist.songs) || [],
          };
        });
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
