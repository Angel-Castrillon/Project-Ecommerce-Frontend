export interface CursorPage<T> {
  data: T[];
  path: string;
  per_page: number;
  next_cursor: string | null;
  prev_cursor: string | null;
}