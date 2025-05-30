'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<string>('dark');

  useEffect(() => {
    if (theme !== undefined) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  const themeToggle = () => {
    const isMobile = window.innerWidth <= 768;
    if (currentTheme === 'dark') {
      setTheme('light');
      toast('Switched to Light Mode', {
        icon: <Sun />,
        position: isMobile ? 'top-center' : 'bottom-right',

        style: {
          gap: '1rem',
        },
      });
    } else {
      setTheme('dark');
      toast('Switched to Dark Mode', {
        icon: <Moon />,
        position: isMobile ? 'top-center' : 'bottom-right',
        style: {
          gap: '1rem',
        },
      });
    }
  };

  return (
    <Button
      onClick={() => themeToggle()}
      size="icon"
      variant="outline"
      className="cursor-pointer"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeSwitcher;
