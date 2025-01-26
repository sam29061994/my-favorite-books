import { BookTableProps } from "./BookTable.type";
import { Loading } from "../Loading/Loading";
import "./BookTable.scss";
import { capitalizeFirstLetter } from "../../utils/string";

export const BookTable = ({ books, isLoading }: BookTableProps) => {
  const MAX_BOOKS = 10;
  const displayedBooks = books.slice(0, MAX_BOOKS);

  return (
    <div className="book-table-container">
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody className="book-table-body">
          {isLoading ? (
            <tr className="loading-row">
              <td colSpan={4}>
                <Loading size="small" className="book-table-loading" />
              </td>
            </tr>
          ) : (
            displayedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.genre.map(capitalizeFirstLetter).join(", ")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
