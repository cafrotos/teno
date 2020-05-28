import { NAME } from "consts/entities";

export default {
  name: NAME.NOTES,
  primaryKey: "id",
  properties: {
    id: 'string',
    content: 'string',
    date: 'date',
    weather: 'string?',
    weatherTemperature: 'string?',
    location: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
  }
}