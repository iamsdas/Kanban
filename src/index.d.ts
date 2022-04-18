interface IBoard {
  id: number;
  title: string;
  description?: string;
}

interface IStage {
  id: number;
  title: string;
  board: number;
}

interface ITask {
  id: number;
  title: string;
  board: number;
  status: number;
  due_date: string | null;
  description: string;
  completed: boolean;
}

type Paginated<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
