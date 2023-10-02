import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { PayloadCommentDeleteType } from "@/libs/types/common/userType";

export async function POST(req: Request) {
  try {
    const request: PayloadCommentDeleteType = await req
      .json()
      .then((data) => data);
    const { userId, commentId } = request;

    await prisma.comment.update({
      where: {
        id: commentId,
        authorId: userId,
      },
      data: {
        isDeleted: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "comment deleted success",
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("delete comment error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "delete comment fail", err }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
