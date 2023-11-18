import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { CommentPayloadType } from "@/libs/types/userType";

export async function POST(req: Request) {
  try {
    const reqJson = await req.json();
    const {
      userId,
      postId,
      comment,
      isProfile,
      isPrivate,
    }: CommentPayloadType = reqJson;

    if (isProfile) {
      const postProfileComment = await prisma.comment.create({
        data: {
          author: {
            connect: {
              id: userId,
            },
          },
          profile: {
            connect: {
              id: postId,
            },
          },
          comment,
          isPrivate,
          type: "USER",
        },
      });

      return new NextResponse(
        JSON.stringify({ message: "success", postProfileComment }),
        {
          status: 200,
        },
      );
    }
    const postComment = await prisma.comment.create({
      data: {
        author: {
          connect: {
            id: userId,
          },
        },
        playlist: {
          connect: {
            id: postId,
          },
        },
        type: "PLAYLIST",
        isPrivate,
        comment,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "success", postComment }),
      {
        status: 200,
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
