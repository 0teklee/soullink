import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatPrivate } from "@/libs/utils/server/formatter";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const url = new URL(req.url);
    const { userId, isProfile, lastId } = Object.fromEntries(
      url.searchParams.entries(),
    ) as {
      userId: string;
      isProfile?: string;
      lastId?: string;
    };

    const profile = isProfile === "true";

    const lastIdCursor =
      lastId !== "0" ? { cursor: { id: lastId } } : undefined;

    if (profile) {
      const unprocessedComments = await prisma.comment.findMany({
        where: {
          profileId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        skip: !!lastIdCursor ? 1 : 0,
        ...lastIdCursor,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          comment: true,
          authorId: true,
          author: {
            select: {
              id: true,
              nickname: true,
              profilePic: true,
              followers: {
                select: {
                  followerId: true,
                  follower: {
                    select: {
                      id: true,
                      nickname: true,
                      profilePic: true,
                    },
                  },
                },
              },
              following: {
                select: {
                  followingId: true,
                  following: {
                    select: {
                      id: true,
                      nickname: true,
                      profilePic: true,
                    },
                  },
                },
              },
            },
          },
          likedBy: {
            select: {
              user: {
                select: {
                  id: true,
                  nickname: true,
                  profilePic: true,
                },
              },
            },
          },
          isDeleted: true,
          isPrivate: true,
          type: true,
          profileId: true,
        },
      });

      const profileComments = unprocessedComments.map((comment) => {
        if (comment?.isDeleted || !comment?.author) {
          return {
            ...comment,
            author: { id: "", nickname: "deleted", profilePic: null },
            comment: "deleted comment",
          };
        }

        return formatPrivate(comment, id, userId);
      });

      return NextResponse.json(
        {
          comments: profileComments,
        },
        {
          status: 200,
          statusText: "OK",
        },
      );
    }

    const unprocessedPlaylistComments = await prisma.comment.findMany({
      where: {
        playlistId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      skip: 1,
      ...lastIdCursor,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        comment: true,
        authorId: true,
        author: {
          select: {
            id: true,
            nickname: true,
            profilePic: true,
            followers: {
              select: {
                followerId: true,
                follower: {
                  select: {
                    id: true,
                    nickname: true,
                    profilePic: true,
                  },
                },
              },
            },
            following: {
              select: {
                followingId: true,
                following: {
                  select: {
                    id: true,
                    nickname: true,
                    profilePic: true,
                  },
                },
              },
            },
          },
        },
        likedBy: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
                profilePic: true,
              },
            },
          },
        },
        isDeleted: true,
        isPrivate: true,
        type: true,
        profileId: true,
      },
    });

    const playlistComments = unprocessedPlaylistComments.map((comment) => {
      if (comment?.isDeleted || !comment?.author) {
        return {
          ...comment,
          author: { id: "", nickname: "deleted", profilePic: null },
          comment: "deleted comment",
        };
      }

      return formatPrivate(comment, userId);
    });

    return NextResponse.json(
      {
        comments: playlistComments,
      },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("comment error: ", err);
    return new NextResponse(
      JSON.stringify({ message: `fail ${err}`, errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
