/**
 * @deprecated The constant is deprecated.
 * Use EVENTBUS_EVENTS.authHttpUnauthorized.
 */
export const HTTP_UNAUTHORIZED_ERROR_EVENT = 'AUTH:HTTP_UNAUTHORIZED';

export const EVENTBUS_EVENTS = Object.freeze({
  coreShowLeftSideMenu: 'CORE:SHOW_LEFT_SIDE_MENU',
  coreHideLeftSideMenu: 'CORE:HIDE_LEFT_SIDE_MENU',
  coreChangeLanguage: 'CORE:CHANGE_LANGUAGE',
  authHttpUnauthorized: 'AUTH:HTTP_UNAUTHORIZED',
  authLogout: 'AUTH:LOGOUT',
});

export * from './urls';
