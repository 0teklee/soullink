import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { formatPrivate } from "@/libs/utils/server/formatter";

export async function GET(req: Request) {
  try {
    const pathname = new URL(req.url).pathname.split("/");
    const id = decodeURI(pathname[pathname.length - 1]);
    const userId = new URL(req.url).searchParams.get("userId");
    const isProfile = new URL(req.url).searchParams.get("isProfile") === "true";

    if (isProfile) {
      const unprocessedComments = await prisma.comment.findMany({
        where: {
          profileId: id,
        },
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

    return NextResponse.json(
      {},
      {
        status: 200,
        statusText: "OK",
      },
    );
  } catch (err) {
    console.log("post playlistDetail error: ", err);
    return new NextResponse(
      JSON.stringify({ message: "fail", errorCode: 404 }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
