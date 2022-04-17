import { useQuery } from 'react-query';
import { request } from './apiUtils';

export const useUser = () =>
  useQuery('user', () => request<{ username: string }>('users/me'), {
    retry: 0,
  });

export const useBoards = () =>
  useQuery('boards', () => request<Paginated<IBoard>>('boards'));
