import { useTodoStore } from "./todos.store";

// Dummy assignees
const dummyAssignees = [
  { id: '1', firstName: 'John', lastName: 'Smith', profilePicture: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', profilePicture: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', firstName: 'Mike', lastName: 'Chen', profilePicture: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', firstName: 'Emma', lastName: 'Wilson', profilePicture: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', firstName: 'David', lastName: 'Brown', profilePicture: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', firstName: 'Lisa', lastName: 'Davis', profilePicture: 'https://i.pravatar.cc/150?img=6' },
];

// Helper function to get random items from array
const getRandomItems = <T>(arr: T[], count: number = 1): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
};

// Helper function to get date strings
const getDateString = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

// Function to populate dummy todos
export const populateDummyTodos = () => {
  const { addTodo } = useTodoStore.getState();

  const dummyTodos = [
    // TODO status todos
    {
      title: "Design new landing page",
      status: 'todo' as const,
      priority: 'urgent' as const,
      assignees: getRandomItems(dummyAssignees, 2),
      description: "Create a modern, responsive landing page design for the new product launch",
      dates: {
        startDate: getDateString(1),
        endDate: getDateString(7)
      }
    },
    {
      title: "Set up CI/CD pipeline",
      status: 'todo' as const,
      priority: 'important' as const,
      assignees: getRandomItems(dummyAssignees, 1),
      description: "Configure automated testing and deployment pipeline for the main repository"
    },
    {
      title: "Research competitor analysis",
      status: 'todo' as const,
      priority: 'medium' as const,
      assignees: getRandomItems(dummyAssignees, 1),
      dates: {
        endDate: getDateString(14)
      }
    },
    {
      title: "Update documentation",
      status: 'todo' as const,
      priority: 'low' as const,
      assignees: getRandomItems(dummyAssignees, 1),
      description: "Review and update all API documentation and user guides"
    },
    {
      title: "Plan team building event",
      status: 'todo' as const,
      priority: 'medium' as const,
      assignees: getRandomItems(dummyAssignees, 2),
      dates: {
        endDate: getDateString(21)
      }
    },

    // IN-PROGRESS status todos
    {
      title: "Implement user authentication",
      status: 'in-progress' as const,
      priority: 'urgent' as const,
      assignees: getRandomItems(dummyAssignees, 2),
      description: "Add JWT-based authentication system with role-based access control",
      dates: {
        startDate: getDateString(-3),
        endDate: getDateString(5)
      }
    },
    {
      title: "Database optimization",
      status: 'in-progress' as const,
      priority: 'important' as const,
      assignees: getRandomItems(dummyAssignees, 1),
      description: "Optimize database queries and add proper indexing for better performance",
      dates: {
        startDate: getDateString(-5),
        endDate: getDateString(3)
      }
    },
    {
      title: "Mobile app testing",
      status: 'in-progress' as const,
      priority: 'medium' as const,
      assignees: getRandomItems(dummyAssignees, 3),
      description: "Comprehensive testing of mobile application across different devices and OS versions"
    },
    {
      title: "API integration with third-party service",
      status: 'in-progress' as const,
      priority: 'important' as const,
      assignees: getRandomItems(dummyAssignees, 1),
      dates: {
        startDate: getDateString(-2),
        endDate: getDateString(4)
      }
    },

    // COMPLETE status todos
    {
      title: "Setup project repository",
      status: 'complete' as const,
      priority: 'urgent' as const,
      assignees: getRandomItems(dummyAssignees, 1),
      description: "Initialize Git repository with proper branch structure and initial configuration",
      dates: {
        startDate: getDateString(-10),
        endDate: getDateString(-8)
      }
    },
    {
      title: "Create project wireframes",
      status: 'complete' as const,
      priority: 'important' as const,
      assignees: getRandomItems(dummyAssignees, 2),
      description: "Design wireframes for all main application screens and user flows"
    },
    {
      title: "Team kickoff meeting",
      status: 'complete' as const,
      priority: 'medium' as const,
      assignees: getRandomItems(dummyAssignees, 4),
      description: "Initial project kickoff meeting to align on goals and timeline",
      dates: {
        startDate: getDateString(-12),
        endDate: getDateString(-12)
      }
    },
    {
      title: "Environment setup",
      status: 'complete' as const,
      priority: 'important' as const,
      assignees: getRandomItems(dummyAssignees, 1),
      description: "Set up development, staging, and production environments"
    },
    {
      title: "Choose tech stack",
      status: 'complete' as const,
      priority: 'urgent' as const,
      assignees: getRandomItems(dummyAssignees, 3),
      description: "Research and decide on the technology stack for the project"
    },
    {
      title: "Brand guidelines document",
      status: 'complete' as const,
      priority: 'medium' as const,
      assignees: getRandomItems(dummyAssignees, 2),
      description: "Create comprehensive brand guidelines including colors, fonts, and design principles"
    }
  ];

  // Add all dummy todos
  dummyTodos.forEach(todo => {
    addTodo(todo);
  });

  console.log(`Added ${dummyTodos.length} dummy todos to the store!`);
};