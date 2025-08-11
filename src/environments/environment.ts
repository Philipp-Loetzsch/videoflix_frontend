export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  apiEndpoints: {
    video: '/video/',
    refresh: '/token/refresh/',
    check: '/check/',
    register: '/register/',
    login: '/login/',
    logout: '/logout/',
    activation: '/activate/',
    resetPassword: '/password_reset/',
    setPassword: '/password_confirm/',
    deleteUser: '/users/delete/'
  }
};
