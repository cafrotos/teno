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

export const CONTENT_TYPE = {
  TEXT: "TEXT",
  PHOTO: "PHOTO"
}

export const DEFAULT_STYLE = {
  BOLD: {
    style: {
      fontWeight: "bold"
    },
    value: "format-bold"
  },
  ITALIC: {
    style: {
      fontStyle: "italic"
    },
    value: "format-italic"
  },
  UNDERLINE: {
    style: {
      textDecorationLine: "underline"
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