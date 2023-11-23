import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const request: { nickname: string } = await req.json().then((data) => data);
    const { nickname } = request;
    const userClient = await prisma.user.findMany({
      where: {
        nickname,
      },
    });

    const isDuplicate = userClient.length > 0;

    return new NextResponse(
      JSON.stringify({
        message: isDuplicate ? "please change nickname" : "success",
        isDuplicate,
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("write.ts error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
