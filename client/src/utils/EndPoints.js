
// src/utils/EndPoints.js
const config = {
    BASE_URL: process.env.REACT_APP_BASE_URL,
    endPoints: {
        // Authentication endpoints
        login: '/auth/login',
        logout: '/auth/logout',

        // Role endpoints
        getRoles: '/role',
        getRoleById: '/role',
        createRole: '/role',
        updateRole: '/role',
        deleteRole: '/role',

        // Permission endpoints
        getPermissions: '/permission',
        getActionsList: '/permission/actions-list',
        getPermissionById: '/permission',
        createPermission: '/permission',
        updatePermission: '/permission',
        deletePermission: '/permission',



        // Other endpoints can be added here
    },
};

export { config };
