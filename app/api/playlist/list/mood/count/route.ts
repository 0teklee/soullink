import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatDateFilter } from "@/libs/utils/server/formatter";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const { recent } = Object.fromEntries(url.searchParams.entries()) as {
    recent: string;
  };

  const recentDate = formatDateFilter(recent);

  try {
    const moodPlayLists = await prisma.playlist.findMany({
      where: {
        OR: [
          {
            recentPlay: {
              every: {
                createdAt: {
                  gte: recentDate,
                },
              },
            },
          },
          {
            createdAt: {
              gte: recentDate,
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        likedCount: "desc",
      },
      select: {
        _count: true,
        mood: {
          select: {
            name: true,
          },
        },
      },
    });

    const moodCount = moodPlayLists
      .map((item: { mood: { name: string } }) => {
        return item.mood.name;
      })
      .reduce((acc: Record<string, number>, cur: string) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {});

    const moodCountArray: { name: string; count: number }[] = Object.entries(
      moodCount,
    ).map(([moodName, countNumber]) => ({
      name: moodName,
      count: countNumber,
    }));

    return new NextResponse(
      JSON.stringify({
        message: "success",
        moodCount: moodCountArray,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("mood get api error: ", err);
    return new NextResponse(JSON.stringify({ message: "fail" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
