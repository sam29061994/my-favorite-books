import { SearchableSelect } from "./components/SearchableSelect/SearchableSelect";
import { useState } from "react";
import { BookTable } from "./components/BookTable/BookTable";
import { useFetchBooks } from "./hooks/useFetchBooks";
import { useGenres } from "./hooks/useGenres";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import "./App.scss";

const ErrorFallback = () => (
  <div className="error-container">
    <h2>Oops! Something went wrong</h2>
    <p>We're sorry, but there was an error loading the application.</p>
    <button onClick={() => window.location.reload()}>Refresh Page</button>
  </div>
);

const BooksContent = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>();
  const {
    books,
    loading: booksLoading,
    error: booksError,
  } = useFetchBooks(selectedGenre);
  const { genres, loading: genresLoading, error: genresError } = useGenres();

  if (booksError || genresError) {
    throw new Error("Failed to fetch books or genres");
  }

  return (
    <section className="books-content">
      <SearchableSelect
        label="Genre"
        options={genres}
        selected={selectedGenre}
        onChange={(value) => setSelectedGenre(value?.toLocaleLowerCase())}
        disabled={genresLoading}
      />
      <BookTable books={books} isLoading={booksLoading} />
    </section>
  );
};

const App = () => {
  return (
    <main className="books-app">
      <h1 className="title">My Favorite Books 📚</h1>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <BooksContent />
      </ErrorBoundary>
    </main>
  );
};

export default App;
