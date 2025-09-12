import { NavItem } from '@/props/NavItemData';
import {
  Home,
  User,
  Users,
  BookOpen,
  History,
} from 'lucide-react';


const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Profile', icon: User, href: '/dashboard/profile' },
  { name: 'Rating & Reviews', icon: Users, href: '/dashboard/rating' },
  {
    name: 'Connect Teacher',
    icon: BookOpen,
    href: '/dashboard/teachermatched',
  },
  { name: 'Check Block User', icon: History, href: '/dashboard/viewblock' },
];

export {navItems}