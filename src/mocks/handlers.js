import { rest } from "msw";

export const handlers = [
  rest.get("https://hacker-news.firebaseio.com/v0/maxitem.json", getMaxItem),
];

function getMaxItem(req, res, ctx) {
  return res(ctx.status(200), ctx.json(4343));
}
