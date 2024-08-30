import React, { useState } from 'react';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import {
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid';
import { FaCogs, FaPlus, FaThLarge, FaTrash, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '../UI/avatar';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '../UI/dropdown';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '../UI/sidebar';
import SidebarMenu from './SidebarMenu'; // Import the new SidebarMenu component

const menuItems = [
  {
    label: 'Roles', icon: <FaCogs />, permissions: ['role-create', 'role-view', 'role-delete'], submenu: [
      { label: 'View Roles', to: '/dashboard/roles', permission: 'role-view' },
      { label: 'Create Role', to: '/dashboard/role/create', permission: 'role-create' },
      { label: 'Trash', to: '/dashboard/roles/trash', permission: 'role-delete' },
    ]
  },
  {
    label: 'Permissions', icon: <FaUser />, permissions: ['permission-view', 'permission-delete'], submenu: [
      { label: 'View Permissions', to: '/dashboard/permissions', permission: 'permission-view' },
      { label: 'Trash', to: '/dashboard/permissions/trash', permission: 'permission-delete' },
    ]
  },
  // Add more menu items here
];

const SidebarComponent = () => {
  const location = useLocation();
  const userPermissions = ["role-create", "role-view", "role-delete", "permission-create", "permission-view", "permission-delete"];
  const [openMenus, setOpenMenus] = useState({}); // Track which menus are open

  const toggleMenu = (label) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [label]: !prevOpenMenus[label], // Toggle the menu open state
    }));
  };

  const hasPermission = (permissions) => {
    return permissions.some(permission => userPermissions?.includes(permission));
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem} className="lg:mb-2.5">
            <Avatar src="/tailwind-logo.svg" />
            <SidebarLabel>Tailwind Labs</SidebarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
            <DropdownItem href="/teams/1/settings">
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/teams/1">
              <Avatar slot="icon" src="/tailwind-logo.svg" />
              <DropdownLabel>Tailwind Labs</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/teams/2">
              <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white" />
              <DropdownLabel>Workcation</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/teams/create">
              <PlusIcon />
              <DropdownLabel>New team&hellip;</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <SidebarSection className="max-lg:hidden">
          <SidebarItem href="/search">
            <MagnifyingGlassIcon />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/inbox">
            <InboxIcon />
            <SidebarLabel>Inbox</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
      <SidebarSection>
          {menuItems.map((item, index) => (
            hasPermission(item.permissions) && (
              <React.Fragment key={index}>
                <SidebarItem
                  onClick={() => toggleMenu(item.label)}
                  icon={item.icon}
                  className="cursor-pointer"
                >
                  {item.label}
                  <ChevronDownIcon className={`transition-transform ${openMenus[item.label] ? 'rotate-180' : ''}`} />
                </SidebarItem>

                {openMenus[item.label] && (
                  <SidebarSection>
                    {item.submenu.map((subItem, subIndex) => (
                      hasPermission([subItem.permission]) && (
                        <SidebarItem key={subIndex} className={`${location.pathname === subItem.to ? 'bg-gray-200' : ''}`}>
                          <Link to={subItem.to} className="block w-full h-full">
                            {subItem.label}
                          </Link>
                        </SidebarItem>
                      )
                    ))}
                  </SidebarSection>
                )}
              </React.Fragment>
            )
          ))}
        </SidebarSection>
        <SidebarSection className="max-lg:hidden">
          <SidebarHeading>Upcoming Events</SidebarHeading>
          <SidebarItem href="/events/1">Bear Hug: Live in Concert</SidebarItem>
          <SidebarItem href="/events/2">Viking People</SidebarItem>
          <SidebarItem href="/events/3">Six Fingers — DJ Set</SidebarItem>
          <SidebarItem href="/events/4">We All Look The Same</SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar src="/profile-photo.jpg" className="size-10" square alt="" />
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Erica</span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  erica@example.com
                </span>
              </span>
            </span>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom end">
            <DropdownItem href="/profile">
              <Avatar slot="icon" src="/profile-photo.jpg" className="size-10" />
              <DropdownLabel>Profile</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/account-settings">
              <Cog8ToothIcon />
              <DropdownLabel>Account Settings</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/logout">
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Logout</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarComponent;
