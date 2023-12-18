import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatSongResponse } from "@/libs/utils/server/formatter";

export async function GET({ params: { id } }: { params: { id: string } }) {
  try {
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "playlist not found", data: {} }),
        {
          status: 200,
          statusText: "no playlist",
        },
      );
    }

    const title = decodeURIComponent(id);

    const playlist = await prisma.playlist
      .findUnique({
        where: {
          title,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          title: true,
          description: true,
          coverImage: true,
          likedCount: true,
          bgColor: true,
          fontColor: true,
          author: {
            select: {
              id: true,
              nickname: true,
              profilePic: true,
            },
          },
          songs: {
            where: {
              playlist: {
                title,
              },
            },
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
                  likedCount: true,
                  playedCount: true,
                  likedUsers: {
                    select: {
                      userId: true,
                    },
                  },
                },
              },
            },
          },
          likedBy: true,
          playedCount: true,
          mood: {
            select: {
              name: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      })
      .then((data) => ({
        ...data,
        songs: formatSongResponse(data?.songs),
      }));

    if (!playlist) {
      return new NextResponse(
        JSON.stringify({ message: "playlist not found", errorCode: 404 }),
        {
          status: 404,
          statusText: "Not Found",
        },
      );
    }

    return NextResponse.json(
      {
        data: playlist,
      },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("get playlistDetail page error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail to get playlist", errorCode: 500 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
