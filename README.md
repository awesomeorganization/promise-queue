# promise-queue

:boom: [ESM] The promise-based queue with concurrency control. Works with Browser and Node.js

---

![GitHub Workflow](https://img.shields.io/github/workflow/status/awesomeorganization/promise-queue/npm-publish?style=flat-square)
![Codacy](https://img.shields.io/codacy/grade/517682e4f17148c6a5efcbc3d56583b2?style=flat-square)
![CodeFactor](https://img.shields.io/codefactor/grade/github/awesomeorganization/promise-queue?style=flat-square)
![Snyk](https://img.shields.io/snyk/vulnerabilities/npm/@awesomeorganization/promise-queue?style=flat-square)
![Depfu](https://img.shields.io/depfu/awesomeorganization/promise-queue?style=flat-square)
![npms.io](https://img.shields.io/npms-io/final-score/@awesomeorganization/promise-queue?style=flat-square)

---

## Example

Full example in `/example` folder.

```
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

// {
//   dateA: 'Wed, 26 Jan 2022 20:00:01 GMT',
//   dateB: 'Wed, 26 Jan 2022 20:00:02 GMT',
//   dateC: 'Wed, 26 Jan 2022 20:00:02 GMT',
//   duration: 3
// }
```
