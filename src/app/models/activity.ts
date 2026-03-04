import { Category } from './category';
import { User } from './user';

export interface Activity {
  id?: number;
  name?: string;
  description?: string;
  startTime?: string; 
  endTime?: string;
  active?: boolean;
  category?: Category;
  participants?: User[];
}
