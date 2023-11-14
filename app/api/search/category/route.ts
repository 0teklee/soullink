import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import {
  formatDateFilter,
  formatSearchOrderBy,
} from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { keyword, orderBy } = Object.fromEntries(url.searchParams.entries());

  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: keyword,
        },
      },
      take: 20,
      orderBy: [
        {
          _relevance: {
            fields: ["name"],
            search: keyword,
            sort: "asc",
          },
        },
      ],
      select: {
        name: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "success",
        result: categories,
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
