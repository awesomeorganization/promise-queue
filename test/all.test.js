import { strict as assert } from 'assert'
import { promiseQueue } from '@awesomeorganization/promise-queue'

// replace with timers.promises in future
export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const example = async () => {
  {
    const { push } = promiseQueue({
      concurrency: 2,
    })
    const time = Date.now()
    await Promise.all([
      push(() => {
        return delay(1e3)
      }),
      push(() => {
        return delay(1e3)
      }),
      push(() => {
        return delay(1e3)
      }),
    ])
    assert.equal(Math.round((Date.now() - time) / 1000), 2)
  }
  {
    const { push } = promiseQueue({
      concurrency: 1,
    })
    const time = Date.now()
    await Promise.all([
      push(() => {
        return delay(1e3)
      }),
      push(() => {
        return delay(1e3)
      }),
      push(() => {
        return delay(1e3)
      }),
    ])
    assert.equal(Math.round((Date.now() - time) / 1000), 3)
  }
}

example()
