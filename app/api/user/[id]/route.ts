import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  req: Request,
  { params: { id: nickname } }: { params: { id: string } },
) {
  try {
    const userLikedPlaylists = await prisma.playlist.findMany({
      where: {
        likedBy: {
          some: {
            userId: nickname,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const userDb = await prisma.user.findUnique({
      where: {
        nickname,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        nickname: true,
        profilePic: true,
        bio: true,
        instagram: true,
        twitter: true,
        website: true,
        isEditor: true,
        bgColor: true,
        fontColor: true,
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                nickname: true,
                profilePic: true,
              },
            },
          },
        },
        following: {
          select: {
            following: {
              select: {
                id: true,
                nickname: true,
                profilePic: true,
              },
            },
          },
        },
        likedPlayLists: {
          where: {
            playlist: {
              id: {
                in: userLikedPlaylists.map((playlist) => playlist.id),
              },
            },
          },
          select: {
            playlist: {
              select: {
                id: true,
                title: true,
                description: true,
                category: true,
                coverImage: true,
                createdAt: true,
                author: {
                  select: {
                    id: true,
                    nickname: true,
                  },
                },
                likedCount: true,
                playedCount: true,
                mood: {
                  select: {
                    name: true,
                  },
                },
                likedBy: {
                  select: {
                    userId: true,
                  },
                },
                songs: {
                  where: {
                    playlist: {
                      id: {
                        in: userLikedPlaylists.map((playlist) => playlist.id),
                      },
                    },
                  },
                  select: {
                    song: {
                      select: {
                        id: true,
                        title: true,
                        artist: true,
                        url: true,
                        thumbnail: true,
                        playedCount: true,
                        likedUsers: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        createdPlaylists: {
          where: {
            author: {
              nickname,
            },
          },
          select: {
            id: true,
            author: {
              select: {
                id: true,
                nickname: true,
              },
            },
            title: true,
            description: true,
            coverImage: true,
            createdAt: true,
            likedBy: {
              select: {
                userId: true,
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
                    likedUsers: {
                      select: {
                        userId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const songLiked = await prisma.song.findMany({
      where: {
        likedUsers: {
          some: {
            user: {
              nickname,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        artist: true,
        thumbnail: true,
        url: true,
        playedCount: true,
        likedUsers: {
          select: {
            userId: true,
          },
        },
      },
    });

    const likedPlaylists =
      userDb?.likedPlayLists?.map((playlist) => playlist.playlist) || [];

    const createdPlaylists =
      userDb?.createdPlaylists?.map((playlist) => {
        return {
          ...playlist,
          songs: playlist.songs.map((song) => song.song),
        };
      }) || [];

    const user = {
      ...userDb,
      createdPlaylists,
      likedPlaylists,
      likedSong: {
        title: `Liked Songs`,
        id: `${userDb?.nickname} liked songs`,
        author: {
          id: userDb?.id,
          nickname: userDb?.nickname,
        },
        coverImage: userDb?.profilePic,
        songs: songLiked,
        isSongTable: true,
      },
    };

    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("get user detail error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail", errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
