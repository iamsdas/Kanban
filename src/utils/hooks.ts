import { useQuery } from 'react-query';
import { request } from './apiUtils';

export const useUser = () =>
  useQuery('user', () => request<{ username: string }>('users/me'), {
    retry: 0,
  });

export const useBoards = () =>
  useQuery('boards', () => request<Paginated<IBoard>>('boards'));

export const useBoard = (id: number) =>
  useQuery(['boards', id], () => request<IBoard>(`boards/${id}`));

export const useStages = (id: number) =>
  useQuery(['stages', id], () => request<IStage[]>(`boards/${id}/status`));

export const useTasks = (id: number) =>
  useQuery(['tasks', id], () =>
    request<Paginated<ITask>>(`boards/${id}/tasks`)
  );

export const useGlobalTasks = (date: string) =>
  useQuery(['tasks', date], () => request<ITask[]>(`tasks`, 'GET', { date }));
