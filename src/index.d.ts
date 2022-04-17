interface IBoard {
  id: number;
  title: string;
  description?: string;
}

type Paginated<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
