import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const request: { userId: string; targetId: string } = await req
      .json()
      .then((data) => data);
    const { userId, targetId } = request;

    const targetCurrent = await prisma.user.findUnique({
      where: {
        id: targetId,
      },
      select: {
        followers: {
          where: {
            follower: { id: userId },
          },
        },
      },
    });

    if (targetCurrent && targetCurrent.followers.length > 0) {
      await prisma.user.update({
        where: {
          id: targetId,
        },
        data: {
          followers: {
            delete: {
              followerId: userId,
              followingId: targetId,
              followerId_followingId: {
                followerId: userId,
                followingId: targetId,
              },
            },
          },
        },
      });

      return new NextResponse(
        JSON.stringify({
          message: "unfollow success",
        }),
        { status: 200, statusText: "OK" },
      );
    }

    await prisma.user.update({
      where: {
        id: targetId,
      },
      data: {
        followers: {
          create: {
            followerId: userId,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "follow success",
      }),
      { status: 200, statusText: "OK" },
    );
  } catch (err) {
    console.log("user follow post api error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
