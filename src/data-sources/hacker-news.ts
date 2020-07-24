import { Story } from "models/story";

export async function getMaxItemId(): Promise<ApiResponse<number>> {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/maxitem.json"
    );
    const body = await response.text();
    const maxItemId = parseInt(body, 10);
    return { status: "ok", payload: maxItemId };
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

export async function getItem(
  itemId: number
): Promise<ApiResponse<HackerNewsItem | null>> {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
    );
    const item = await response.json();
    return { status: "ok", payload: item };
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

export async function getStory(itemId: number): Promise<GetStoryResponse> {
  const response = await getItem(itemId);
  if (response.status === "error") {
    return response;
  }
  const item = response.payload;
  if (!item) {
    return { status: "error", message: "Item not found" };
  }
  if (isStory(item)) {
    const story = convertItemToStory(item);
    return { status: "ok", story };
  }
  return { status: "wrong_type" };
}

type GetStoryResponse =
  | { status: "ok"; story: Story }
  | { status: "wrong_type" }
  | { status: "error"; message: string };

function isStory(item: HackerNewsItem): boolean {
  return item.type === "story" && typeof item.url === "string";
}

function convertItemToStory(item: HackerNewsItem): Story {
  if (!isStory(item)) {
    throw new Error(
      `Cannot convert item to story. Type of item is ${item.type}`
    );
  }
  return {
    id: item.id,
    by: item.by,
    title: item.title,
    url: item.url,
  };
}

type ApiResponse<T> = ApiOkResponse<T> | ApiErrorResponse<T>;
interface ApiOkResponse<T> {
  status: "ok";
  payload: T;
}
interface ApiErrorResponse<T> {
  status: "error";
  message: string;
}

export interface HackerNewsItem {
  id: number;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  url: string;
  time: number;
  text: string;
  // TODO: Eventually I should ignore deleted and dead posts
  dead?: boolean;
  deleted?: boolean;
  parent?: number;
  poll?: number;
  kids?: Array<number>;
  score?: number;
  title: string;
  parts?: Array<number>;
  descendants?: Array<number>;
}
