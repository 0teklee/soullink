import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { PlaylistCreateRequestType } from "@/libs/types/song&playlistType";

export async function PATCH(req: Request) {
  try {
    const request: PlaylistCreateRequestType & {
      userId: string;
      playlistId: string;
    } = await req.json().then((data) => data);

    const playlist = await prisma.playlist.update({
      where: {
        id: request.playlistId,
        authorId: request.userId,
      },
      data: {
        title: request.title,
        description: request.description,
        coverImage: request.coverImage || "",
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
      },
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
    console.log("patch playlist error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
