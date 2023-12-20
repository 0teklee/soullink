import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const { keyword } = Object.fromEntries(url.searchParams.entries());

  try {
    const users = await prisma.user.findMany({
      take: 20,
      orderBy: [
        {
          _relevance: {
            fields: "nickname",
            search: keyword,
            sort: "desc",
          },
        },
        {
          nickname: "asc",
        },
      ],
      select: {
        id: true,
        nickname: true,
        profilePic: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        result: users,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("server error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
