# promise-queue

:boom: [ESM] The promise-based queue with concurrency control. Works with Browser and Node.js

---

![npm](https://img.shields.io/david/awesomeorganization/promise-queue)
![npm](https://img.shields.io/npm/v/@awesomeorganization/promise-queue)
![npm](https://img.shields.io/npm/dt/@awesomeorganization/promise-queue)
![npm](https://img.shields.io/npm/l/@awesomeorganization/promise-queue)
![npm](https://img.shields.io/bundlephobia/minzip/@awesomeorganization/promise-queue)
![npm](https://img.shields.io/bundlephobia/min/@awesomeorganization/promise-queue)

---

## Example

Full example in `/example` folder.

```
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
```
