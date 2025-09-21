export interface Assignee {
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
}

export interface Todo {
  name: string;
  date: string;
  assignee: Assignee[];
  priority: "Medium" | "Important" | "Urgent";
}

export interface TodosData {
  data: Todo[];
  pagination: {
    current_page: number;
    total_pages: number;
    rows_per_page: number;
    total_rows_approx: number;
  };
}
