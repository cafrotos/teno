import 'react-native-get-random-values'

import Realm from 'realm';
import { v1 as uuid } from 'uuid'

import { NAME } from 'consts/entities';
import Notes from './entities/Notes';


const schemaOptions = {
  path: "teno.realm",
  schema: [
    Notes
  ],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    /**
     * @fixme change version
     */
  }
}

const create = (schema, object) => new Promise((resolve, reject) => {
  Realm.open(schemaOptions)
    .then(realm => {
      realm.write(() => {
        object.id = uuid()
        object.createdAt = new Date()
        if (!object.date) {
          object.date = new Date()
        }
        const instance = realm.create(schema, object)
        resolve(instance);
      })
    })
    .catch(err => reject(err))
})

const update = (schema, object) => new Promise((resolve, reject) => {
  Realm.open(schemaOptions)
    .then(realm => {
      realm.write(() => {
        const instance = realm.objectForPrimaryKey(schema, object.id)
        if (!instance) {
          throw Error(`${schema} id = ${object.id} not found`)
        }
        Object.keys(instance).map(key => {
          if (object[key] !== undefined && key !== "id") {
            instance[key] = object[key]
          }
        })
        instance.updatedAt = new Date()
        resolve(instance)
      })
    })
    .catch(err => reject(err))
})

const remove = (schema, objectId) => new Promise((resolve, reject) => {
  Realm.open(schemaOptions)
    .then(realm => {
      realm.write(() => {
        const instance = realm.objectForPrimaryKey(schema, objectId);
        if (!instance) {
          throw Error(`${schema} id = ${object.id} not found`)
        }
        realm.delete(instance)
        resolve();
      })
    })
    .catch(err => reject(err))
})

const get = (schema) => new Promise((resolve, reject) => {
  Realm.open(schemaOptions)
    .then(realm => {
      resolve(realm.objects(schema))
    })
    .catch(err => reject(err))
})

const getById = (schema, objectId) => new Promise((resolve, reject) => {
  Realm.open(schemaOptions)
    .then(realm => {
      resolve(realm.objectForPrimaryKey(schema, objectId))
    })
    .catch(err => reject(err))
})

export const NotesRepository = {
  create: (object) => create(NAME.NOTES, object),
  update: (object) => update(NAME.NOTES, object),
  delete: (id) => remove(NAME.NOTES, id),
  get: () => get(NAME.NOTES),
  getById: (id) => getById(NAME.NOTES, id)
}