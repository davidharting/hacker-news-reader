import { rest } from "msw";
import items from "./fixtures/items";

export const handlers = [
  rest.get("https://hacker-news.firebaseio.com/v0/maxitem.json", getMaxItem),
  rest.get("https://hacker-news.firebaseio.com/v0/item/:itemId.json", getItem),
];

function getMaxItem(req, res, ctx) {
  return res(ctx.status(200), ctx.json(4343));
}

function getItem(req, res, ctx) {
  const { itemId } = req.params;
  const item = items[itemId];
  if (!item) {
    return res(ctx.status(200), ctx.json(null));
  }
  return res(ctx.status(200), ctx.json(item));
}
