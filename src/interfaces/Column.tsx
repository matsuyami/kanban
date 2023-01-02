import { Task } from './Task'

export interface IColumn {
  name: string,
  colId: string,
  tasks: Array<Task> | []
}
