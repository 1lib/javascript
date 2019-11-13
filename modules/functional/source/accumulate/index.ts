import Base from '@1lib/core/source/builder'

function accumulate(prop: { type: string }) {
  const type: string = prop.type
  const values = (<any>Object).values(prop).filter((value: number) => !isNaN(value))

  return (new Function('return ' + values.join(type)))()
}

export default Base(accumulate, { param: { keys: ['type'] } })
