import dayjs, { Dayjs, QUnitType } from "dayjs";
import { PlaylistMoodType, PlaylistType } from "@/libs/types/song&playlistType";
import { playlistDefault } from "@/libs/utils/client/commonValues";
import { fetcherImagePost } from "@/libs/utils/client/fetchers";
import { RefObject } from "react";
import { toPng } from "html-to-image";
import { SetterOrUpdater } from "recoil";

export const isNowMoreThanTargetTime = (
  startedAt: Dayjs | null | Date,
  targetTime: number,
  unit: QUnitType = "seconds",
) => {
  const now = dayjs(new Date());
  const isMoreThanTargetTime =
    !!startedAt && now.diff(dayjs(startedAt), unit as QUnitType) > targetTime;
  return isMoreThanTargetTime;
};

export const setRecentPlaylistIdLocalStorage = (playlistId: string) => {
  const recentPlaylist = localStorage.getItem("recentPlaylist");
  if (!recentPlaylist) {
    localStorage.setItem("recentPlaylist", JSON.stringify([playlistId]));
    return;
  }
  const recentPlaylistsArr = JSON.parse(recentPlaylist) as Array<string>;
  localStorage.setItem(
    "recentPlaylist",
    JSON.stringify(recentPlaylistsArr.concat(playlistId)),
  );
};

export const filterMoodPlaylists = (
  moodType: PlaylistMoodType,
  playlistArr?: PlaylistType[],
) => {
  if (!playlistArr) return [];
  const moodPlaylists = playlistArr.filter((playlist) => {
    return playlist.mood.name === moodType;
  });
  return moodPlaylists;
};

export const filterCategoryPlaylist = (
  category: string,
  playlistArr?: PlaylistType[],
) => {
  if (!playlistArr) {
    return [];
  }

  if (category === "all" || category === "") {
    return playlistArr.filter((playlist) => playlist.category.length > 0);
  }
  const categoryPlaylists = playlistArr.filter((playlist) => {
    return (
      playlist.category.filter((categoryObj) => {
        return categoryObj.name === category;
      }).length > 0
    );
  });
  return categoryPlaylists;
};

export const fillEmptyPlaylist = (playlistArr?: PlaylistType[]) => {
  if (!playlistArr) {
    return Array(5).fill(playlistDefault);
  }

  if (playlistArr.length > 5) {
    return playlistArr;
  }

  const emptyPlaylist = Array(5 - playlistArr.length);
  const defaultPlaylistArr = emptyPlaylist.fill(playlistDefault);

  return playlistArr.concat(defaultPlaylistArr as PlaylistType[]);
};

const ImageUploadPost = async (data: FormData) => {
  const cloudName = process.env.CLOUD_IMAGE_APP_NAME;
  return fetcherImagePost(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data,
  );
};

const compressImage = (file: File): Promise<File> => {
  const maxWidth = 1000;
  const quality = 0.7;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleSize = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Unable to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas to Blob conversion failed"));
            return;
          }

          resolve(
            new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            }),
          );
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = () => reject(new Error("Image loading error"));
  });
};

export const handleImageUpload = (callback: (imageVal: string) => void) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    if (!input.files) return;
    let file = input.files[0];
    const formData = new FormData();

    if (file.size > 1024 * 1024) {
      file = await compressImage(file);
    }

    if (/^image\//.test(file.type)) {
      formData.append("file", file);
      formData.append("upload_preset", "soullink_user");

      const res = await ImageUploadPost(formData).then((res) => {
        return res.url;
      });
      callback(res);
    } else {
      alert("Image Upload Error");
      return null;
    }
  };
};

export const downloadPlaylistPng = async (
  imageName: string,
  componentRef: RefObject<HTMLElement>,
  setModalOpenState: SetterOrUpdater<boolean>,
) => {
  if (componentRef.current === null) {
    return;
  }

  await toPng(componentRef.current, {
    includeQueryParams: true,
    cacheBust: true,
  })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${imageName}.png`;
      link.href = dataUrl;
      link.click();
      link.remove();
      setModalOpenState(false);
    })
    .catch((err: unknown) => {
      console.error(err);
    });
};

export const formatPlaylistOptimisticSetter = (
  userId: string,
  playlistId: string,
  playlist: PlaylistType,
) => {
  const isLiked = playlist.likedBy && playlist.likedBy.length > 0;
  const isUserLiked =
    playlist.likedBy &&
    playlist.likedBy.filter((user) => user.userId === userId).length > 0;

  if (!isLiked && !isUserLiked) {
    return {
      ...playlist,
      likedBy: [{ playlistId, userId }],
    };
  }

  if (isLiked && isUserLiked) {
    return {
      ...playlist,
      likedBy: playlist.likedBy.filter((user) => user.userId !== userId),
    };
  }

  return {
    ...playlist,
    likedBy: playlist.likedBy.concat({ playlistId, userId }),
  };
};

export const formatSongOptimisticSetter = (
  userId: string,
  songId: string,
  playlist: PlaylistType,
) => {
  const isLiked = playlist.songs && playlist.songs.length > 0;
  const isUserLiked =
    playlist.songs &&
    playlist.songs.filter(
      (song) =>
        song.id === songId && song.likedUsers && song.likedUsers.length > 0,
    ).length > 0;

  if (!isLiked && !isUserLiked) {
    return {
      ...playlist,
      songs: playlist.songs.map((song) => {
        if (song.id === songId) {
          return {
            ...song,
            likedUsers: [{ userId, songId }],
          };
        }
        return song;
      }),
    };
  }

  if (isLiked && isUserLiked) {
    return {
      ...playlist,
      songs: playlist.songs.map((song) => {
        if (song.id === songId) {
          return {
            ...song,
            likedUsers: song.likedUsers?.filter(
              (user) => user.userId !== userId,
            ),
          };
        }
        return song;
      }),
    };
  }

  return {
    ...playlist,
    songs: playlist.songs.map((song) => {
      if (song.id === songId) {
        return {
          ...song,
          likedUsers: song.likedUsers?.concat({ userId, songId }),
        };
      }
      return song;
    }),
  };
};
