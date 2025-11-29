export const SKIP_VOTES_REQUIRED = 5;

export const ROOM_TEXTS = {
  QUEUE_TITLE: 'A continuación en la cola',
  SEARCH_PLACEHOLDER: 'Busca una canción en Spotify...',
  ADD_BUTTON: 'Añadir',
  SKIP_LABEL: 'para saltar',
  NO_RESULTS: 'No se encontraron resultados',
  NOW_PLAYING: 'Reproduciendo ahora',
} as const;

export const QUEUE_TABS = {
  QUEUE: 'En cola',
  RECENT: 'Recientes',
  CHAT: 'Chat',
} as const;

export const CHAT_TEXTS = {
  PLACEHOLDER: 'Escribe un mensaje...',
  EMPTY_MESSAGE: 'No hay mensajes aún. ¡Sé el primero en escribir!',
  SEND_BUTTON: 'Enviar',
} as const;

export const HISTORY_MODAL = {
  TITLE: 'Historial de sesiones',
  SONGS_LABEL: 'canciones',
  SONG_LABEL: 'canción',
  EXPORT_BUTTON: 'Exportar a Spotify',
  EMPTY_MESSAGE: 'No hay sesiones anteriores',
  PLAYED_AT: 'Reproducida a las',
} as const;

export const PLAYER_CONTROLS = {
  VOLUME_STEP: 0.1,
  SEEK_STEP: 5,
} as const;

export const BASE_ROOM_FILTERS = [
  { type: 'all', label: 'Todas' },
  { type: 'popular', label: 'Más populares' },
  { type: 'recent', label: 'Recién creadas' },
] as const;

export const ROOMS_PAGE_TEXTS = {
  TITLE: 'Explora la galaxia',
  SUBTITLE: 'Explora las salas de música activas o crea la tuya.',
  CREATE_BUTTON: 'Crear Nueva Sala',
  USERS_LABEL: 'usuarios',
} as const;

export const CREATE_ROOM_MODAL = {
  TITLE: 'Crear Nueva Sala',
  NAME_LABEL: 'Nombre de la sala',
  NAME_PLACEHOLDER: 'Ej: Rock de los 90',
  TAGS_LABEL: 'Tags',
  TAGS_PLACEHOLDER: 'Escribe tags separados por comas (ej: rock, 90s, grunge)',
  DESCRIPTION_LABEL: 'Descripción',
  DESCRIPTION_PLACEHOLDER: 'Describe el ambiente de tu sala...',
  COVER_LABEL: 'Imagen de portada',
  COVER_HINT: 'Arrastra una imagen o haz clic para seleccionar',
  COVER_CHANGE: 'Cambiar imagen',
  SUBMIT_BUTTON: 'Crear Sala',
  CANCEL_BUTTON: 'Cancelar',
} as const;

