import 'jest'

import accumulate from './index'
import _ from '@1lib/core/source/placeholder'

const part = (name: string): string => `Math::accumulate - ${name}`

test(part('operator'), () => {
  expect(accumulate('+', 1, 2, 3, 5).$done()).toBe(11)
  expect(accumulate('-', 1, 2).$done()).toBe(-1)
  expect(accumulate('*', 1, 2).$done()).toBe(2)
  expect(accumulate('/', 1, 2).$done()).toBe(0.5)
  expect(accumulate('%', 1, 2).$done()).toBe(1)
})

test(part('object-parameters'), () => {
  const accumulateOPM = (<any>accumulate).$config({ param: { mode: 'PARAM_MODE_OBJECT' } })

  expect(
    accumulateOPM({ type: '+' })({ number1: 2, number2: 3 })({ number3: 5 }).$done()
  ).toBe(10)

  expect(
    accumulateOPM({ number1: 2, number2: 3 })({ type: '+' })({ number3: 5 }).$done()
  ).toBe(10)
})

test(part('placeholder'), () => {
  expect(
    (<any>accumulate('+')).$config({ param: { count: 6 } })(_, 2, _)(_, 3, _, 5)(1, _)(4)
  ).toBe(15)

  expect(
    accumulate('%')(_, 3)(_, 2)(5).$done()
  ).toBe(0)
})
