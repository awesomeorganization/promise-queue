/* eslint-disable node/no-unsupported-features/es-syntax */

const DEFAULT_CONCURRENCY = 1

export const promiseQueue = ({ concurrency = DEFAULT_CONCURRENCY } = { concurrency: DEFAULT_CONCURRENCY }) => {
  if (concurrency <= 0) {
    throw RangeError('The concurrency value cannot be equal or less than 0')
  }
  let isEmpty = true
  const queue = []
  const onFinally = () => {
    if (queue.length === 0) {
      isEmpty = true
    } else {
      isEmpty = false
      if (concurrency === 1 || queue.length === 1) {
        const [callback, onFulfilled, onRejected] = queue.shift()
        callback().then(onFulfilled, onRejected).finally(onFinally)
      } else {
        const slice = queue.splice(0, concurrency)
        Promise.allSettled(
          slice.map((iterator) => {
            return iterator[0]()
          })
        )
          .then((values) => {
            values.forEach((iterator, index) => {
              iterator.status === 'fulfilled' ? slice[index][1](iterator.value) : slice[index][2](iterator.reason)
            })
          })
          .finally(onFinally)
      }
    }
  }
  const push = (callback) => {
    return new Promise((onThen, onCatch) => {
      queue.push([callback, onThen, onCatch])
      if (isEmpty === true) {
        onFinally()
      }
    })
  }
  return {
    push,
  }
}
