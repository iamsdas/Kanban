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
  dueDate: string;
  description: string;
  completed: boolean;
}

type Paginated<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
