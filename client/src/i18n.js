import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      app: {
        title: 'LibertaDEpelota',
        subtitle: 'Tu app de fútbol favorita',
      },
      nav: {
        matches: 'Partidos',
        information: 'Información',
        settings: 'Configuración',
        config: 'Config',
      },
      common: {
        close: 'Cerrar',
      },
      login: {
        button: 'Iniciar sesión',
        loading: 'Iniciando sesión...',
        googleButton: 'Iniciar sesión con Google',
        googleLoading: 'Conectando...',
      },
      settings: {
        title: 'Configuración',
        defaultUser: 'Usuario',
        userInformation: 'Información del usuario',
        name: 'Nombre',
        email: 'Correo',
        role: 'Rol',
        noInfo: 'No informado',
        noEmail: 'Sin email',
        logout: 'Cerrar sesión',
        userOptions: 'Opciones del usuario',
        edit: 'Editar',
        aboutTitle: 'Acerca de la aplicación',
        version: 'Versión',
        userAgent: 'User Agent',
        logoutDialogTitle: '¿Cerrar sesión?',
        logoutDialogText:
          'Estás a punto de cerrar tu sesión. Tendrás que volver a iniciar sesión para acceder a la aplicación.',
        logoutCancel: 'Cancelar',
        logoutConfirm: 'Sí, cerrar sesión',
      },
      accountSettings: {
        title: 'Información de usuario',
        readonlyInfo: 'Nombre, correo e imagen no son editables',
        birthDate: 'Fecha de nacimiento',
        address: 'Dirección',
        phones: 'Teléfonos',
        phone: 'Teléfono',
        addPhone: 'Agregar teléfono',
        saveChanges: 'Guardar cambios',
        cancel: 'Cancelar',
        addressLengthError: 'La dirección debe tener entre {{min}} y {{max}} caracteres',
        birthDateMaxError: 'La fecha no puede ser mayor a la actual',
        phoneLengthError: 'El teléfono debe tener entre {{min}} y {{max}} números',
      },
      items: {
        title: 'Partidos',
        sortBy: 'Ordenar por',
        searchPlaceholder: 'Buscar equipo...',
        noMatches: 'No se encontraron los partidos',
        season: 'Año',
        filter: {
          name: 'Nombre',
          date: 'Fecha',
          home: 'Equipo Local',
          away: 'Equipo Visitante',
          score: 'Goles totales',
        },
      },
      match: {
        referee: 'Árbitro: {{referee}}',
        stadium: 'Estadio: {{venue}}',
        localAlt: 'local',
        awayAlt: 'visitante',
        noInfo: 'No informado',
      },
      errors: {
        api: 'Error en la API',
        loadMatches: 'No se pudieron cargar los partidos',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
