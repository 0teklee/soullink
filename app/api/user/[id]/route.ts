import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatPlaylistsSongOrder } from "@/libs/utils/server/formatter";

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

    const likedPlaylists =
      userDb?.likedPlayLists.map((playlist) => playlist.playlist) || [];

    const createdPlaylists = userDb?.createdPlaylists || [];

    const likedPlaylistSongOrder = likedPlaylists
      ? await prisma.playlistSongIndex.findMany({
          where: {
            playlist: {
              id: {
                in: likedPlaylists.map((playlist) => playlist.id),
              },
            },
          },
          select: {
            playlistId: true,
            songId: true,
            songIndex: true,
          },
        })
      : [];

    const createdPlaylistSongOrder = createdPlaylists
      ? await prisma.playlistSongIndex.findMany({
          where: {
            playlist: {
              id: {
                in: createdPlaylists.map((playlist) => playlist.id),
              },
            },
          },
          select: {
            playlistId: true,
            songId: true,
            songIndex: true,
          },
        })
      : [];

    const userLikedPlaylistsOrdered = formatPlaylistsSongOrder(
      likedPlaylists,
      likedPlaylistSongOrder,
    );

    const userCreatedPlaylistsOrdered = formatPlaylistsSongOrder(
      createdPlaylists,
      createdPlaylistSongOrder,
    );

    const user = {
      ...userDb,
      createdPlaylists: userCreatedPlaylistsOrdered,
      likedPlaylists: userLikedPlaylistsOrdered,
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
