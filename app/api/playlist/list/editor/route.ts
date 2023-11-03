import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    const editorPlayLists = await prisma.playlist.findMany({
      where: {
        OR: [
          {
            author: {
              isEditor: true,
            },
          },
          {
            likedCount: {
              gt: 1,
            },
            likedBy: {
              some: {
                user: {
                  isEditor: true,
                },
              },
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        playedTime: "desc",
      },
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
        mood: {
          select: {
            name: true,
          },
        },
      },
    });

    const filteredEditorPlayLists = editorPlayLists.filter((playlist) => {
      return !!playlist.title && !!playlist.author.nickname;
    });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        editorPlayLists: filteredEditorPlayLists,
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
