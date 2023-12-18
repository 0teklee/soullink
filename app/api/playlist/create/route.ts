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
      },
    });

    await prisma.song.createMany({
      data: request.songs.map((song, index) => ({
        title: song.title,
        artist: song.artist,
        url: song.url,
      })),
      skipDuplicates: true,
    });

    const songIds = await prisma.song.findMany({
      where: {
        url: {
          in: request.songs.map((song) => song.url),
        },
      },
      select: {
        id: true,
        url: true,
      },
    });

    const indexWithSongIds = request.songs.map((reqSong, index) => ({
      playlistId: playlist.id,
      songIndex: index,
      songId: songIds.find((song) => song.url === reqSong.url)?.id || "",
    }));

    await prisma.playlistSong.createMany({
      data: indexWithSongIds,
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
    console.log("playlist create error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
