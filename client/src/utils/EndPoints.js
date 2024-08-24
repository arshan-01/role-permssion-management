
// src/utils/EndPoints.js
const config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    endPoints: {
        // Authentication endpoints
        login: '/auth/login',
        logout: '/auth/logout',

        // Role endpoints
        getRoles: '/role/all',
        getRoleById: '/role',
        createRole: '/role/create',
        updateRole: '/role/update',
        deleteRole: '/role',

        // Permission endpoints
        getPermissions: '/permission/all',
        getActionsList: '/permission/actions-list',
        getPermissionById: '/permission',
        createPermission: '/permission/create',
        updatePermission: '/permission/update',
        deletePermission: '/permission',


        // Other endpoints can be added here
    },
};

export { config };
