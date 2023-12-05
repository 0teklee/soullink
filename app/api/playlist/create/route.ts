import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { PlaylistCreateRequestType } from "@/libs/types/song&playlistType";

export async function POST(req: Request) {
  try {
    const request: PlaylistCreateRequestType & { userId: string } = await req
      .json()
      .then((data) => data);
    const playlist = await prisma.playlist.create({
      data: {
        title: request.title,
        description: request.description,
        coverImage: request.coverImage || "",
        author: {
          connect: { id: request.userId },
        },
        songs: {
          connectOrCreate: request.songs.map((song) => ({
            where: { url: song.url },
            create: {
              artist: song.artist,
              title: song.title,
              url: song.url,
              thumbnail: song?.thumbnail,
            },
          })),
        },
        mood: {
          connectOrCreate: {
            where: { name: request.mood },
            create: {
              name: request.mood,
            },
          },
        },
        category: {
          connectOrCreate: request.categories?.map((category) => ({
            where: { name: category },
            create: {
              name: category,
            },
          })),
        },
      },
      select: {
        id: true,
        title: true,
        songs: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    await prisma.playlistSongIndex.createMany({
      data: playlist.songs.map((song, index) => ({
        playlistId: playlist.id,
        songId: song.id,
        songIndex: request.songs.findIndex((s) => s.url === song.url),
      })),
    });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        playlistId: playlist.id,
        playlistTitle: playlist.title,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("write.ts error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
