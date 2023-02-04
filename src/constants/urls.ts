const common = {
  notFound: '/not-found',
};

const authURLS = Object.freeze({
  logIn: '/login',
  logOut: '/logout',
});

export const URLS = Object.freeze({
  ...common,
  auth: authURLS,
});
