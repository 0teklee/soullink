/* youtube api type */

export interface YoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: YoutubeItem[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeItem {
  kind: string;
  etag: string;
  id: YoutubeId;
  snippet: YoutubeSnippet;
}

export interface YoutubeId {
  kind: string;
  videoId: string;
}

export interface YoutubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YoutubeThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface YoutubeThumbnails {
  default: YoutubeImgDefault;
  medium: YoutubeImgMedium;
  high: YoutubeImgHigh;
}

export interface YoutubeImgDefault {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeImgMedium {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeImgHigh {
  url: string;
  width: number;
  height: number;
}
