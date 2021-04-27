/* eslint-disable node/no-unsupported-features/es-syntax */

import { promiseQueue } from '@awesomeorganization/promise-queue'
import undici from 'undici'

const example = async () => {
  const { push } = promiseQueue({
    concurrency: 2,
  })
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
      return undici.request('https://httpbin.org/delay/1')
    }),
    push(() => {
      return undici.request('https://httpbin.org/delay/1')
    }),
    push(() => {
      return undici.request('https://httpbin.org/delay/1')
    }),
  ])
  console.dir({
    dateA,
    dateB,
    dateC,
  })
}

example()
