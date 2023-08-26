import { CommentType } from "@/types/common/userType";
import { sampleUser } from "@/utils/client/userSampleValues";

export const sampleComments1: CommentType[] = [
  {
    id: "1",
    comment: "댓글1 tester tester tester",
    isPrivate: false,
    type: "playlist",
    author: sampleUser,
    authorId: "1",
    playlistId: "1",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  },
  {
    id: "2",
    comment: "MEOWOWOEOWOEOWOEOW",
    isPrivate: false,
    type: "playlist",
    author: sampleUser,
    authorId: "1",
    playlistId: "1",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  },
  {
    id: "3",
    comment: "댓글3 tester tester tester",
    isPrivate: false,
    type: "playlist",
    author: sampleUser,
    authorId: "1",
    playlistId: "1",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  },
  {
    id: "4",
    comment: "ㅋㅋㅋㅋㅋㅋㅋ",
    isPrivate: false,
    type: "playlist",
    author: sampleUser,
    authorId: "1",
    playlistId: "1",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  },
  {
    id: "5",
    comment: "댓글1 tester tester tester",
    isPrivate: false,
    type: "playlist",
    author: sampleUser,
    authorId: "1",
    playlistId: "1",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
  },
];

export const sampleComments2: CommentType[] = sampleComments1.map((x) => ({
  ...x,
  id: String(Number(x.id) + 5),
  comment: "댓글2 " + x.comment,
}));
