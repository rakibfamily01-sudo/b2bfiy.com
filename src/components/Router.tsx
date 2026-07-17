import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextProps {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextProps>({
  path: window.location.pathname,
  navigate: () => {}
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    // Listen for pushState triggers from custom navigations
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pushstate_changed', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pushstate_changed', handleLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
    // Dispatch custom event so all listeners know about the change
    window.dispatchEvent(new Event('pushstate_changed'));
    // Soft scroll to top
    window.scrollTo({ top: 0 });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  key?: any;
}

export function Link({ to, children, className, onClick, ...props }: LinkProps) {
  const { navigate, path: currentPath } = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (props.target === '_blank') return;
    e.preventDefault();
    if (currentPath !== to) {
      navigate(to);
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

// Simple Route matcher helper
export function Route({ path, element, exact = true }: { path: string; element: React.ReactNode; exact?: boolean }) {
  const { path: currentPath } = useRouter();

  // Handle dynamic paths like /portfolio/:slug
  if (path.includes('/:')) {
    const pattern = new RegExp('^' + path.replace(/:[^\s/]+/g, '([^/]+)') + '$');
    const match = currentPath.match(pattern);
    if (match) {
      return <>{element}</>;
    }
    return null;
  }

  const isMatched = exact ? currentPath === path : currentPath.startsWith(path);
  return isMatched ? <>{element}</> : null;
}
