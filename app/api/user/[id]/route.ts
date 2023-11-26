import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const pathname = new URL(req.url).pathname.split("/");
    const nickname = decodeURIComponent(pathname[pathname.length - 1]);

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
        createdPlaylists: {
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
              select: {
                id: true,
                title: true,
                artist: true,
                thumbnail: true,
                playedCount: true,
                likedUsers: true,
              },
            },
          },
        },
      },
    });

    const songLiked = await prisma.song.findMany({
      where: {
        likedUsers: {
          every: {
            userId: userDb?.id,
          },
        },
      },
      select: {
        id: true,
        title: true,
        artist: true,
        thumbnail: true,
        playedCount: true,
        likedUsers: {
          select: {
            userId: true,
          },
        },
      },
    });

    const user = {
      ...userDb,
      likedPlaylists: userDb
        ? userDb.likedPlayLists.map((playlist) => playlist.playlist)
        : [],
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
    console.log("post playlistDetail error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail", errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
