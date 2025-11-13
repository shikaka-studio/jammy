export const ROUTES = {
  HOME: '/',
  CALLBACK: '/callback',
  ROOMS: '/rooms',
  ROOM: (id: string) => `/rooms/${id}`,
  CREATE_ROOM: '/rooms/create',
  ABOUT: '/about',
} as const;
