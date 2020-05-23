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

export const TAB_SCREEN = {
  HOME: "Home",
  STORIES: "Stories",
  CALENDAR: "Calendar",
  IMAGES: "Images",
  SETTING: "Setting",
}

export const REG_EMAIL = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g

export const REG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g