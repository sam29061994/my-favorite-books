import { useState, useEffect } from "react";
import Books from "../services/books";
import { ApiError } from "./useFetchBooks";

const booksService = new Books();

export const useGenres = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = await booksService.askListGenres();
        setGenres(data);
      } catch (error) {
        setError({
          message: `Failed to fetch genres: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};
