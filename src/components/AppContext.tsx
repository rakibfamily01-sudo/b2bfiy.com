import React, { createContext, useContext, useState, useEffect } from 'react';
import { DatabaseState, SiteSettings } from '../types';
import { DEFAULT_STATE } from '../lib/defaultState';

// Safe localStorage wrapper to prevent crashes inside sandboxed iframes
const memoryStorage: Record<string, string> = {};
const safeStorage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key) || memoryStorage[key] || null;
    } catch (e) {
      return memoryStorage[key] || null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[SafeStorage] Failed to write ${key} to localStorage:`, e);
    }
    memoryStorage[key] = value;
  },
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[SafeStorage] Failed to remove ${key} from localStorage:`, e);
    }
    delete memoryStorage[key];
  }
};

interface AppContextType {
  // Navigation & Routing
  currentPath: string;
  navigateTo: (path: string) => void;
  routeParams: Record<string, string>;

  // Public/CMS Data Cache
  data: Partial<DatabaseState> | null;
  loading: boolean;
  refreshData: () => Promise<void>;

  // Admin authentication
  token: string | null;
  adminEmail: string | null;
  login: (token: string, email: string) => void;
  logout: () => Promise<void>;
  isAdminVerified: boolean;
  verifyAdminToken: () => Promise<boolean>;

  // Notification Toast Helpers
  toast: { message: string; type: 'success' | 'error' | null };
  showToast: (msg: string, type: 'success' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Path navigation state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  
  // Public/Admin data state - Default to built-in high-fidelity DEFAULT_STATE to prevent empty rendering while loading or on API failures (e.g. cookie checking redirects)
  const [data, setData] = useState<Partial<DatabaseState> | null>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);

  // Authentication states
  const [token, setToken] = useState<string | null>(() => safeStorage.getItem('b2bfiy_token'));
  const [adminEmail, setAdminEmail] = useState<string | null>(() => safeStorage.getItem('b2bfiy_email'));
  const [isAdminVerified, setIsAdminVerified] = useState(() => {
    return !!safeStorage.getItem('b2bfiy_token');
  });


  // Notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  // Handle browser popstate (back/forward keys)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync route parameters for dynamic slugs (e.g. /portfolio/[slug])
  useEffect(() => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts[0] === 'portfolio' && parts[1]) {
      setRouteParams({ slug: parts[1] });
    } else {
      setRouteParams({});
    }
  }, [currentPath]);

  // Navigate utility with custom pushState
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch standard public state
  const refreshData = async () => {
    try {
      setLoading(true);
      // Fetch either admin state or public state depending on credentials
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Append cache-busting timestamp to prevent browser cache
      const endpoint = token 
        ? `/api/admin/state?t=${Date.now()}` 
        : `/api/public/state?t=${Date.now()}`;
        
      const res = await fetch(endpoint, { headers });
      if (res.ok) {
        const payload = await res.json();
        setData(payload);
      } else {
        // If admin fetch fails, fall back to public state
        const publicRes = await fetch(`/api/public/state?t=${Date.now()}`);
        if (publicRes.ok) {
          const payload = await publicRes.json();
          setData(payload);
        }
      }
    } catch (e) {
      console.error("Failed to fetch state API", e);
    } finally {
      setLoading(false);
    }
  };

  // Check admin verification
  const verifyAdminToken = async (): Promise<boolean> => {
    if (!token) {
      setIsAdminVerified(false);
      return false;
    }
    try {
      const res = await fetch(`/api/auth/verify?t=${Date.now()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setIsAdminVerified(true);
        return true;
      } else {
        // ONLY clear session if the server explicitly rejects authentication (e.g. 401/403)
        // This prevents kicking out the user due to 502/503/504 proxy issues or serverless cold starts
        if (res.status === 401 || res.status === 403) {
          safeStorage.removeItem('b2bfiy_token');
          safeStorage.removeItem('b2bfiy_email');
          setToken(null);
          setAdminEmail(null);
          setIsAdminVerified(false);
        }
        return false;
      }
    } catch (e) {
      // Network/fetch error (e.g. server restarting or slow connection) - DO NOT kick out the user
      console.warn("[Auth Verify] Background verification network notice:", e);
      return !!token;
    }
  };

  // Trigger cache refresh on startup and token change
  useEffect(() => {
    refreshData();
    if (token) {
      verifyAdminToken();
    } else {
      setIsAdminVerified(false);
    }
  }, [token]);

  // Auth logins
  const login = (authToken: string, email: string) => {
    safeStorage.setItem('b2bfiy_token', authToken);
    safeStorage.setItem('b2bfiy_email', email);
    setToken(authToken);
    setAdminEmail(email);
    setIsAdminVerified(true);
    showToast('Welcome back, Admin!', 'success');
  };

  // Auth logouts
  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      safeStorage.removeItem('b2bfiy_token');
      safeStorage.removeItem('b2bfiy_email');
      setToken(null);
      setAdminEmail(null);
      setIsAdminVerified(false);
      navigateTo('/admin/login');
      showToast('Logged out successfully', 'success');
    }
  };

  // Toast notifier trigger
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: null });
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigateTo,
        routeParams,
        data,
        loading,
        refreshData,
        token,
        adminEmail,
        login,
        logout,
        isAdminVerified,
        verifyAdminToken,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside an AppProvider');
  }
  return context;
}
