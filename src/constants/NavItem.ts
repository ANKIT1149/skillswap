import { NavItem } from '@/props/NavItemData';
import {
  Home,
  User,
  Users,
  BookOpen,
  History,
} from 'lucide-react';

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Profile', icon: User, href: '/dashboard/profile' },
  { name: 'Connect Learner', icon: Users, href: '/dashboard/connect-learner' },
  {
    name: 'Connect Teacher',
    icon: BookOpen,
    href: '/dashboard/connect-teacher',
  },
  { name: 'History', icon: History, href: '/dashboard/history' },
];

export {navItems}