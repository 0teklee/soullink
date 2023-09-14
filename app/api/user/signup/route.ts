import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { SignupPayload } from "@/types/common/userType";

export async function POST(req: Request) {
  try {
    const request: SignupPayload = await req.json().then((data) => data);
    const { email, socialLinks, profilePic, nickname, bio } = request;
    const { website, instagram, twitter } = socialLinks;
    const userClient = await prisma.user.create({
      data: {
        nickname,
        bio,
        profilePic,
        email,
        twitter,
        instagram,
        website,
        isBlocked: false,
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
      statusText: "Internal Server Error",
    });
  }
}
