'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  GlobeIcon,
  GlobeLockIcon,
  Moon,
  SettingsIcon,
  Sun,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/slice';
import { RootState } from '@/store/store';
import { toast } from 'sonner';
import { useAppKitNetwork, useAppKitTheme } from '@reown/appkit/react';
import { base, baseSepolia } from 'viem/chains';

const Settings = () => {
  const dispatch = useDispatch();
  const { setTheme, theme } = useTheme();
  const settings = useSelector((state: RootState) => state.settings);
  const { switchNetwork } = useAppKitNetwork();
  const { setThemeMode } = useAppKitTheme();

  const [currentTheme, setCurrentTheme] = useState<string>('dark');
  const [projectMode, setProjectMode] = useState<string>('production');

  const toggleProjectMode = (mode: string) => {
    const isMobile = window.innerWidth <= 768;
    if (mode === 'production') {
      dispatch(
        setUser({
          ...settings,
          mode: mode,
        })
      );

      toast('Switched to Production Mode', {
        icon: <GlobeIcon />,
        position: isMobile ? 'top-center' : 'bottom-right',
        style: {
          gap: '1rem',
        },
      });
    } else if (mode === 'development') {
      dispatch(
        setUser({
          ...settings,
          mode: mode,
        })
      );
      toast('Switched to Development Mode', {
        icon: <GlobeLockIcon />,
        position: isMobile ? 'top-center' : 'bottom-right',
        style: {
          gap: '1rem',
        },
      });
    }
  };

  const toggleProjectTheme = (themes: string) => {
    const isMobile = window.innerWidth <= 768;
    if (themes === 'light') {
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

  useEffect(() => {
    if (theme !== undefined) {
      setCurrentTheme(theme);
      setProjectMode(settings.mode || 'production');

      if (theme === 'dark') {
        setThemeMode('dark');
      } else {
        setThemeMode('light');
      }
    }
    if (settings.mode === 'production') {
      switchNetwork(base);
    } else {
      switchNetwork(baseSepolia);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, settings.mode]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant={'outline'} className="cursor-pointer">
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={projectMode}
            onValueChange={toggleProjectMode}
          >
            <DropdownMenuRadioItem value="production" disabled>
              <GlobeIcon />
              <span>Production</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="development">
              <GlobeLockIcon />
              <span>Development</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={currentTheme}
            onValueChange={toggleProjectTheme}
          >
            <DropdownMenuRadioItem value="dark">
              <Moon />
              <span>Dark</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light">
              <Sun />
              <span>Light</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default Settings;
