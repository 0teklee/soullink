import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const userNicknamePaths = await prisma.user.findMany({
      select: {
        id: true,
        nickname: true,
      },
    });
    const encodeURIUserNicknamePaths = userNicknamePaths.map((user) => {
      return {
        ...user,
        nickname: encodeURI(user.nickname),
      };
    });

    return NextResponse.json(
      {
        userNicknamePaths: encodeURIUserNicknamePaths,
      },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("user paths error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail", errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error : user paths error",
      },
    );
  }
}
