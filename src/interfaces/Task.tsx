export interface Task {
  index?: number,
  id: string,
  title: string,
  description: string,
  subtasks?: Array<SubTask>,
  status: string,
}

export interface SubTask {
  title: string,
  isCompleted: boolean,
}

