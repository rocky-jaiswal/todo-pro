export interface TaskList {
  id: string
  name: string
  description: string | null
}

export interface Task {
  id: string
  name: string
  description: string | null
  completed: boolean
  dueBy: Date | null
}
