// src/components/Sidebar.jsx
import { Avatar } from './UI/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from './UI/dropdown'
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
} from './UI/sidebar'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid'
import React, { useState } from 'react';
import { FaUser, FaPlus, FaTrash, FaThLarge, FaCogs, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sidebarItems = [
  {
    label: "Dashboard",
    icon: FaThLarge,
    link: "/",
    permissions: [],
  },
  {
    label: "Roles",
    icon: FaCogs,
    link: "#",
    permissions: [],
    subItems: [
      {
        label: "Roles",
        icon: FaUser,
        link: "/dashboard/roles",
        permissions: ["role-view"],
      },
      {
        label: "Create Role",
        icon: FaPlus,
        link: "/dashboard/role/create",
        permissions: ["role-create"],
      },
      {
        label: "Trash",
        icon: FaTrash,
        link: "dashboard/roles/trash",
        permissions: ["role-delete"],
      },
    ],
  },
];
function SidebarComponent() {
  const userPermissions = ["role-create", "role-view", "role-delete"]; // Example permissions for the current user
  const [isRolesMenuOpen, setIsRolesMenuOpen] = useState(false);

  const toggleRolesMenu = () => {
    setIsRolesMenuOpen(!isRolesMenuOpen);
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
          {sidebarItems.map((item, index) => {
            const hasPermission = item.permissions.every(permission =>
              userPermissions.includes(permission)
            );

            if (hasPermission) {
              return (
                <div key={index}>
                  {item.subItems ? (
                    <div>
                      <SidebarItem onClick={toggleRolesMenu} className="flex items-center cursor-pointer">
                        <div className="flex-grow flex items-center">
                          <item.icon />
                          <SidebarLabel className="text-sm ml-4">{item.label}</SidebarLabel> {/* Apply text size */}
                        </div>
                        <div className="ml-2">
                          {isRolesMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                      </SidebarItem>

                      {isRolesMenuOpen && (
                        <div className="ml-4">
                          {item.subItems.map((subItem, subIndex) => {
                            const hasSubPermission = subItem.permissions.every(permission =>
                              userPermissions.includes(permission)
                            );

                            if (hasSubPermission) {
                              return (
                                <SidebarItem key={subIndex} href={subItem.link}>
                                  <subItem.icon />
                                  <SidebarLabel>{subItem.label}</SidebarLabel>
                                </SidebarItem>
                              );
                            }

                            return null;
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <SidebarItem href={item.link}>
                      <item.icon />
                      <SidebarLabel>{item.label}</SidebarLabel>
                    </SidebarItem>
                  )}
                </div>
              );
            }

            return null;
          })}
          <SidebarItem href="/">
            <HomeIcon />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/events">
            <Square2StackIcon />
            <SidebarLabel>Events</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/orders">
            <TicketIcon />
            <SidebarLabel>Orders</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/settings">
            <Cog6ToothIcon />
            <SidebarLabel>Settings</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/broadcasts">
            <MegaphoneIcon />
            <SidebarLabel>Broadcasts</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSection className="max-lg:hidden">
          <SidebarHeading>Upcoming Events</SidebarHeading>
          <SidebarItem href="/events/1">Bear Hug: Live in Concert</SidebarItem>
          <SidebarItem href="/events/2">Viking People</SidebarItem>
          <SidebarItem href="/events/3">Six Fingers — DJ Set</SidebarItem>
          <SidebarItem href="/events/4">We All Look The Same</SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          <SidebarItem href="/support">
            <QuestionMarkCircleIcon />
            <SidebarLabel>Support</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/changelog">
            <SparklesIcon />
            <SidebarLabel>Changelog</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
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
            <ChevronUpIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="top start">
            <DropdownItem href="/my-profile">
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/settings">
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/privacy-policy">
              <ShieldCheckIcon />
              <DropdownLabel>Privacy policy</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/share-feedback">
              <LightBulbIcon />
              <DropdownLabel>Share feedback</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/logout">
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  )
}

export default SidebarComponent
