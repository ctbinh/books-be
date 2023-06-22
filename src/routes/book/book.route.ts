import { HandlerTag } from "@constants";
import { createBookSchema } from "@dtos/in";
import { bookResultSchema } from "@dtos/out";
import { createRoute } from "@utils";
import S from "fluent-json-schema";
import { bookHandler } from "src/handlers/books.handler";

export const bookRoute = createRoute(HandlerTag.BOOK, [
  {
    method: "GET",
    url: "",
    schema: {
      querystring: S.object()
        .prop("from", S.integer().required().minimum(0))
        .prop("size", S.integer().required().minimum(10)),
      response: {
        200: S.object()
          .prop("total", S.integer().required())
          .prop("data", S.array().items(bookResultSchema)),
      },
    },
    handler: bookHandler.getList,
  },
  {
    method: "POST",
    url: "",
    schema: {
      body: createBookSchema,
      response: {
        200: S.string().description("Book ID"),
      },
    },
    handler: bookHandler.create,
  },
  {
    method: "GET",
    url: "/:bookId",
    schema: {
      params: S.object().prop("bookId", S.string().required()),
      response: {
        200: bookResultSchema,
      },
    },
    handler: bookHandler.getById,
  },
  {
    method: "PUT",
    url: "/:bookId",
    schema: {
      params: S.object().prop("bookId", S.string().required()),
      response: {
        200: S.string().description("Updated book ID"),
      },
    },
    handler: bookHandler.update,
  },
]);
