
export type ViewLayout = 'grid' | 'list';

export interface UserPreferences {
  viewLayout: ViewLayout;
  sidebarCollapsed: boolean;
  theme?: 'light' | 'dark' | 'auto';
  // Add more preferences as needed
}

// Storage keys
const STORAGE_KEYS = {
  VIEW_LAYOUT: 'user-view-layout',
  SIDEBAR_COLLAPSED: 'user-sidebar-collapsed',
  USER_PREFERENCES: 'user-preferences', 
} as const;

// Default values
const DEFAULT_PREFERENCES: UserPreferences = {
  viewLayout: 'list',
  sidebarCollapsed: false,
  theme: 'light',
};

// Utility functions for localStorage operations
const isClient = typeof window !== 'undefined';

const safeGetItem = (key: string): string | null => {
  if (!isClient) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Failed to read from localStorage: ${error}`);
    return null;
  }
};

const safeSetItem = (key: string, value: string): boolean => {
  if (!isClient) return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Failed to write to localStorage: ${error}`);
    return false;
  }
};

const safeRemoveItem = (key: string): boolean => {
  if (!isClient) return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove from localStorage: ${error}`);
    return false;
  }
};

// Individual preference functions
export const viewLayoutUtils = {
  // Get current view layout
  get: (): ViewLayout => {
    const stored = safeGetItem(STORAGE_KEYS.VIEW_LAYOUT);
    if (stored && ['grid', 'list', 'kanban', 'table'].includes(stored)) {
      return stored as ViewLayout;
    }
    return DEFAULT_PREFERENCES.viewLayout;
  },

  // Set view layout
  set: (layout: ViewLayout): boolean => {
    return safeSetItem(STORAGE_KEYS.VIEW_LAYOUT, layout);
  },

  // Toggle between grid and list (common use case)
  toggle: (): ViewLayout => {
    const current = viewLayoutUtils.get();
    const newLayout = current === 'grid' ? 'list' : 'grid';
    viewLayoutUtils.set(newLayout);
    return newLayout;
  },

  // Cycle through all layouts
  cycle: (): ViewLayout => {
    const layouts: ViewLayout[] = ['grid', 'list'];
    const current = viewLayoutUtils.get();
    const currentIndex = layouts.indexOf(current);
    const nextIndex = (currentIndex + 1) % layouts.length;
    const newLayout = layouts[nextIndex];
    viewLayoutUtils.set(newLayout);
    return newLayout;
  },

  // Reset to default
  reset: (): ViewLayout => {
    viewLayoutUtils.set(DEFAULT_PREFERENCES.viewLayout);
    return DEFAULT_PREFERENCES.viewLayout;
  },
};

export const sidebarUtils = {
  // Get current sidebar state
  get: (): boolean => {
    const stored = safeGetItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
    return stored ? JSON.parse(stored) : DEFAULT_PREFERENCES.sidebarCollapsed;
  },

  // Set sidebar state
  set: (collapsed: boolean): boolean => {
    return safeSetItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, JSON.stringify(collapsed));
  },

  // Toggle sidebar state
  toggle: (): boolean => {
    const current = sidebarUtils.get();
    const newState = !current;
    sidebarUtils.set(newState);
    return newState;
  },

  // Collapse sidebar
  collapse: (): boolean => {
    sidebarUtils.set(true);
    return true;
  },

  // Expand sidebar
  expand: (): boolean => {
    sidebarUtils.set(false);
    return false;
  },

  // Reset to default
  reset: (): boolean => {
    sidebarUtils.set(DEFAULT_PREFERENCES.sidebarCollapsed);
    return DEFAULT_PREFERENCES.sidebarCollapsed;
  },
};

// Combined preferences functions (alternative approach)
export const userPreferencesUtils = {
  // Get all preferences
  getAll: (): UserPreferences => {
    const stored = safeGetItem(STORAGE_KEYS.USER_PREFERENCES);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      } catch (error) {
        console.warn('Failed to parse stored preferences, using defaults', error);
      }
    }
    return DEFAULT_PREFERENCES;
  },

  // Set all preferences
  setAll: (preferences: Partial<UserPreferences>): boolean => {
    const current = userPreferencesUtils.getAll();
    const updated = { ...current, ...preferences };
    return safeSetItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
  },

  // Get specific preference
  get: <K extends keyof UserPreferences>(key: K): UserPreferences[K] => {
    const preferences = userPreferencesUtils.getAll();
    return preferences[key];
  },

  // Set specific preference
  set: <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ): boolean => {
    const current = userPreferencesUtils.getAll();
    const updated = { ...current, [key]: value };
    return safeSetItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
  },

  // Reset all preferences
  reset: (): boolean => {
    return safeSetItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(DEFAULT_PREFERENCES));
  },

  // Clear all preferences
  clear: (): boolean => {
    return safeRemoveItem(STORAGE_KEYS.USER_PREFERENCES);
  },
};

// React hooks for using preferences in components
import { useState, useEffect } from 'react';

export const useViewLayout = () => {
  const [viewLayout, setViewLayout] = useState<ViewLayout>(DEFAULT_PREFERENCES.viewLayout);

  useEffect(() => {
    setViewLayout(viewLayoutUtils.get());
  }, []);

  const updateViewLayout = (layout: ViewLayout) => {
    setViewLayout(layout);
    viewLayoutUtils.set(layout);
  };

  const toggleLayout = () => {
    const newLayout = viewLayoutUtils.toggle();
    setViewLayout(newLayout);
  };

  const cycleLayout = () => {
    const newLayout = viewLayoutUtils.cycle();
    setViewLayout(newLayout);
  };

  return {
    viewLayout,
    setViewLayout: updateViewLayout,
    toggleLayout,
    cycleLayout,
    isGrid: viewLayout === 'grid',
    isList: viewLayout === 'list',
  };
};

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(DEFAULT_PREFERENCES.sidebarCollapsed);

  useEffect(() => {
    setIsCollapsed(sidebarUtils.get());
  }, []);

  const updateSidebar = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    sidebarUtils.set(collapsed);
  };

  const toggleSidebar = () => {
    const newState = sidebarUtils.toggle();
    setIsCollapsed(newState);
  };

  const collapseSidebar = () => {
    setIsCollapsed(true);
    sidebarUtils.set(true);
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
    sidebarUtils.set(false);
  };

  return {
    isCollapsed,
    setIsCollapsed: updateSidebar,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    isExpanded: !isCollapsed,
  };
};

// Combined preferences hook
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    setPreferences(userPreferencesUtils.getAll());
  }, []);

  const updatePreference = <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    userPreferencesUtils.set(key, value);
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
    userPreferencesUtils.setAll(updates);
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    userPreferencesUtils.reset();
  };

  return {
    preferences,
    updatePreference,
    updatePreferences,
    resetPreferences,
  };
};