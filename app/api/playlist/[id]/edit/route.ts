import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { PlaylistCreateRequestType } from "@/libs/types/song&playlistType";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params?.id || "";
  const request: PlaylistCreateRequestType & { userId: string } = await req
    .json()
    .then((data) => data);

  try {
    const playlistUpdate = await prisma.playlist.update({
      where: { id },
      data: {
        title: request.title,
        description: request.description,
        coverImage: request.coverImage || "",
        fontColor: request?.fontColor,
        bgColor: request?.bgColor,
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

    await prisma.$executeRaw`BEGIN;`;

    const playlistSongIds = await prisma.playlistSong.findMany({
      where: {
        playlistId: id,
      },
      select: {
        songId: true,
        songIndex: true,
        song: {
          select: {
            url: true,
          },
        },
      },
    });

    const songIdsToDelete = playlistSongIds
      .filter(
        (playlistSongId) =>
          !songIds.find((songId) => songId.id === playlistSongId.songId) ||
          (songIds.find((songId) => songId.id === playlistSongId.songId) &&
            playlistSongId.songIndex !==
              request.songs.findIndex(
                (song) => song.url === playlistSongId.song.url,
              )),
      )
      .map((playlistSongId) => playlistSongId.songId);

    await prisma.playlistSong.deleteMany({
      where: {
        playlistId: id,
        songId: {
          in: songIdsToDelete,
        },
      },
    });

    const indexWithSongIds = request.songs
      .filter((song) => songIds.find((songId) => songId.url === song.url))
      .map((reqSong, index) => ({
        playlistId: playlistUpdate.id,
        songIndex: index,
        songId: songIds.find((song) => song.url === reqSong.url)?.id || "",
      }));

    const duplicateSongIds = playlistSongIds
      .filter((playlistSongId) => {
        return indexWithSongIds.find((indexWithSongId) => {
          return (
            playlistSongId.songId === indexWithSongId.songId &&
            playlistSongId.songIndex === indexWithSongId.songIndex
          );
        });
      })
      .map((playlistSongId) => playlistSongId.songId);

    // upsert PlaylistSong except the ones in duplicateSongIds

    await prisma.playlistSong.createMany({
      data: indexWithSongIds
        .filter((indexWithSongId) => {
          return !duplicateSongIds.includes(indexWithSongId.songId);
        })
        .map((indexWithSongId) => ({
          playlistId: indexWithSongId.playlistId,
          songIndex: indexWithSongId.songIndex,
          songId: indexWithSongId.songId,
        })),
      skipDuplicates: true,
    });

    await prisma.$executeRaw`COMMIT;`;

    return new NextResponse(
      JSON.stringify({
        message: "success",
        playlistId: playlistUpdate.id,
        playlistTitle: playlistUpdate.title,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("patch playlist error: ", err);

    // Rollback the transaction on error
    await prisma.$executeRaw`ROLLBACK;`;

    return new NextResponse(
      JSON.stringify({ message: "fail", playlistTitle: request.title }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
