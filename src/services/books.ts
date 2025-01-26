import { books } from "./data.ts";
import { v4 as uuidv4 } from "uuid";
import { Book } from "../components/BookTable/BookTable.type";

export default class Books {
  askListBooks(genre?: string) {
    return this._mockServerRequest(genre);
  }

  askListGenres() {
    return new Promise<string[]>((resolve) => {
      window.setTimeout(() => {
        const genres = Array.from(new Set(books.flatMap((book) => book.genre)))
          .sort()
          .map((genre) => genre.charAt(0).toUpperCase() + genre.slice(1));
        resolve(genres);
      }, this._random());
    });
  }

  _mockServerRequest = (genre?: string) => {
    return new Promise<Book[]>((resolve) => {
      window.setTimeout(() => {
        const filteredBooks = genre
          ? books.filter((book) => book.genre.includes(genre))
          : books;

        resolve(filteredBooks.map((book) => ({ ...book, id: uuidv4() })));
      }, this._random());
    });
  };

  _random() {
    return Math.floor(Math.random() * 1200);
  }
}
