import { useState, useEffect } from "react";
import Books from "../services/books";
import { Book } from "../components/BookTable/BookTable.type";

export type ApiError = {
  message: string;
  code?: string;
  timestamp?: string;
};

const booksService = new Books();

export const useFetchBooks = (genre: string | undefined) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await booksService.askListBooks(genre);
        setBooks(data);

        const uniqueGenres = Array.from(
          new Set(data.flatMap((book) => book.genre))
        ).sort();

        setGenres(uniqueGenres);
      } catch (error) {
        setError({
          message: `Failed to fetch books: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre]);

  return { books, genres, loading, error };
};
