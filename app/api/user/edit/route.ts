import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { EditProfilePayload } from "@/libs/types/userType";

export async function PATCH(req: Request) {
  try {
    const request: EditProfilePayload = await req.json();
    const { userId, ...updateData } = request;

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "fail. no user id" }), {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const userClient = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        nickname: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        userId: userClient.id,
        userNickname: userClient.nickname,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("write.ts error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: `Internal Server Error : ${err}`,
    });
  }
}
