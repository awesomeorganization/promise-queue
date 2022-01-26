/* eslint-disable node/no-unsupported-features/es-syntax */

import { equal } from 'assert/strict'
import { promiseQueue } from '@awesomeorganization/promise-queue'
import { setTimeout } from 'timers/promises'

const example = async () => {
  const { push } = promiseQueue({
    concurrency: 2,
  })
  const time = Date.now()
  await Promise.all([
    push(() => {
      return setTimeout(1e3)
    }),
    push(() => {
      return setTimeout(1e3)
    }),
    push(() => {
      return setTimeout(1e3)
    }),
  ])
  equal(2, Math.round((Date.now() - time) / 1000))
}

example()
