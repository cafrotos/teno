export const STACK_NAME = {
  // Auth screen
  LOGIN: "Log in",
  SIGNUP: "Sign up",
  // Tab screen
  TABS: "Tabs",
  // Home tab screen
  LIST_NOTES: "List Notes",
  CREATE_NOTE: "Create Note",
  DETAIL_NOTE: "Detail Note"
}

export const FIREBASE_STATUS = {
  SUCCESS: true,
  FAIL: false
}

export const TAB_SCREEN = {
  HOME: "Home",
  STORIES: "Stories",
  CALENDAR: "Calendar",
  IMAGES: "Images",
  SETTING: "Setting",
}

export const REG_EMAIL = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g

export const REG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g

export const WEATHER_ICON = {
"wi-owm-200": "thunderstorm",
"wi-owm-201": "thunderstorm",
"wi-owm-202": "thunderstorm",
"wi-owm-210": "lightning",
"wi-owm-211": "lightning",
"wi-owm-212": "lightning",
"wi-owm-221": "lightning",
"wi-owm-230": "thunderstorm",
"wi-owm-231": "thunderstorm",
"wi-owm-232": "thunderstorm",
"wi-owm-300": "sprinkle",
"wi-owm-301": "sprinkle",
"wi-owm-302": "rain",
"wi-owm-310": "rain-mix",
"wi-owm-311": "rain",
"wi-owm-312": "rain",
"wi-owm-313": "showers",
"wi-owm-314": "rain",
"wi-owm-321": "sprinkle",
"wi-owm-500": "sprinkle",
"wi-owm-501": "rain",
"wi-owm-502": "rain",
"wi-owm-503": "rain",
"wi-owm-504": "rain",
"wi-owm-511": "rain-mix",
"wi-owm-520": "showers",
"wi-owm-521": "showers",
"wi-owm-522": "showers",
"wi-owm-531": "storm-showers",
"wi-owm-600": "snow",
"wi-owm-601": "snow",
"wi-owm-602": "sleet",
"wi-owm-611": "rain-mix",
"wi-owm-612": "rain-mix",
"wi-owm-615": "rain-mix",
"wi-owm-616": "rain-mix",
"wi-owm-620": "rain-mix",
"wi-owm-621": "snow",
"wi-owm-622": "snow",
"wi-owm-701": "showers",
"wi-owm-711": "smoke",
"wi-owm-721": "day-haze",
"wi-owm-731": "dust",
"wi-owm-741": "fog",
"wi-owm-761": "dust",
"wi-owm-762": "dust",
"wi-owm-771": "cloudy-gusts",
"wi-owm-781": "tornado",
"wi-owm-800": "day-sunny",
"wi-owm-801": "cloudy-gusts",
"wi-owm-802": "cloudy-gusts",
"wi-owm-803": "cloudy-gusts",
"wi-owm-804": "cloudy",
"wi-owm-900": "tornado",
"wi-owm-901": "storm-showers",
"wi-owm-902": "hurricane",
"wi-owm-903": "snowflake-cold",
"wi-owm-904": "hot",
"wi-owm-905": "windy",
"wi-owm-906": "hail",
"wi-owm-957": "strong-wind"
}

export const CONTENT_TYPE = {
  TEXT: "TEXT",
  PHOTO: "PHOTO"
}

export const DEFAULT_STYLE = {
  BOLD: {
    style: {
      fontWeight: "bold"
    },
    revertStyle: {
      fontWeight: "normal"
    },
    value: "format-bold"
  },
  ITALIC: {
    style: {
      fontStyle: "italic"
    },
    revertStyle: {
      fontStyle: "normal"
    },
    value: "format-italic"
  },
  UNDERLINE: {
    style: {
      textDecorationLine: "underline"
    },
    revertStyle: {
      textDecorationLine: "none"
    },
    value: "format-underline"
  },
  ALIGN_LEFT: {
    style: {
      textAlign: "left"
    },
    value: "format-align-left"
  },
  ALIGN_CENTER: {
    style: {
      textAlign: "center"
    },
    value: "format-align-center"
  },
  ALIGN_RIGHT: {
    style: {
      textAlign: "right"
    },
    value: "format-align-right"
  },
}