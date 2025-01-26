export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string[];
  year: string;
};

export interface BookTableProps {
  books: Book[];
  isLoading?: boolean;
}
