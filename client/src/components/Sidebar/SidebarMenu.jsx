import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { SidebarItem, SidebarLabel } from '../UI/sidebar';

function SidebarMenu({ item, userPermissions }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current route location

  // Check if the current route is in the submenu
  const isActive = (link) => location.pathname === link;

  // Determine if the user has the required permissions for this item
  const hasPermission = item.permissions.every(permission =>
    userPermissions.includes(permission)
  );

  // Toggle the submenu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle click to mark an item as selected
  const handleSubItemClick = (link) => {
    setIsOpen(true); // Keep submenu open when item is selected
  };

  // Check if any subItem has the user's permission
  const hasSubPermission = item.subItems?.some(subItem =>
    subItem.permissions?.every(permission => userPermissions.includes(permission))
  );

  useEffect(() => {
    // Ensure submenu is open if the active route is a subitem
    if (item.subItems?.some(subItem => isActive(subItem.link))) {
      setIsOpen(true);
    }
  }, [location.pathname, item.subItems]);

  if (!hasPermission) return null;

  return (
    <div>
      {item.subItems ? (
        <div>
          {hasSubPermission && (
            <SidebarItem onClick={toggleMenu} className="flex items-center cursor-pointer">
              <item.icon />
              <SidebarLabel>{item.label}</SidebarLabel>
              {isOpen ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
            </SidebarItem>
          )}

          {isOpen && (
            <div className="ml-4">
              {item.subItems.map((subItem, index) => {
                const hasSubPermission = subItem.permissions.every(permission =>
                  userPermissions.includes(permission)
                );

                return hasSubPermission ? (
                  <SidebarItem
                    key={index}
                    as={Link}
                    to={subItem.link}
                    className={`flex items-center ${isActive(subItem.link) ? 'bg-gray-200' : ''}`}
                    onClick={() => handleSubItemClick(subItem.link)}
                  >
                    <subItem.icon />
                    <SidebarLabel>{subItem.label}</SidebarLabel>
                  </SidebarItem>
                ) : null;
              })}
            </div>
          )}
        </div>
      ) : (
        <SidebarItem as={Link} to={item.link} className={`flex items-center ${isActive(item.link) ? 'bg-gray-200' : ''}`}>
          <item.icon />
          <SidebarLabel>{item.label}</SidebarLabel>
        </SidebarItem>
      )}
    </div>
  );
}

export default SidebarMenu;
