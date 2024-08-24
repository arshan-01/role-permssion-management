
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
        softDeleteRole: '/role',
        parmanentDeleteRole: '/role/delete',
        restoreRole : '/role/restore',

        // Permission endpoints
        getPermissions: '/permission/all',
        getActionsList: '/permission/actions-list',
        getPermissionById: '/permission',
        createPermission: '/permission/create',
        updatePermission: '/permission/update',
        softDeletePermission: '/permission',
        parmanentDeletePermission: '/permission/delete',
        restorePermission : '/permission/restore',


        // Other endpoints can be added here
    },
};

export { config };
