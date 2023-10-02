import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { PayloadCommentLikeType } from "@/libs/types/common/userType";

export async function POST(req: Request) {
  try {
    const request: PayloadCommentLikeType = await req
      .json()
      .then((data) => data);
    const { userId, commentId } = request;

    const existingLike = await prisma.commentLikedByUsers.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });

    if (existingLike) {
      await prisma.commentLikedByUsers.delete({
        where: { userId_commentId: { userId, commentId } },
      });

      return new NextResponse(
        JSON.stringify({
          message: "unlike success",
        }),
        { status: 200, statusText: "OK" },
      );
    }

    await prisma.commentLikedByUsers.create({
      data: { userId, commentId },
    });

    return new NextResponse(
      JSON.stringify({
        message: "like success",
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("like comment error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "like comment fail", err }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
