/* eslint-disable node/no-unsupported-features/es-syntax */

import { promiseQueue } from '@awesomeorganization/promise-queue'
import { request } from 'undici'

const example = async () => {
  const { push } = promiseQueue({
    concurrency: 2,
  })
  const time = Date.now()
  const [
    {
      headers: { date: dateA },
    },
    {
      headers: { date: dateB },
    },
    {
      headers: { date: dateC },
    },
  ] = await Promise.all([
    push(() => {
      return request('https://httpbin.org/delay/1')
    }),
    push(() => {
      return request('https://httpbin.org/delay/1')
    }),
    push(() => {
      return request('https://httpbin.org/delay/1')
    }),
  ])
  console.dir({
    dateA,
    dateB,
    dateC,
    duration: Math.round((Date.now() - time) / 1000),
  })
}

example()
