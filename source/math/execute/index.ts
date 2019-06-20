import Base from '../../.internal/Base'

function execute(prop: { type: string }) {
  const type: string = prop.type
  const values = (<any>Object).values(prop).filter((value: number) => !isNaN(value))

  return (new Function('return ' + values.join(type)))()
}

export default Base(execute, { paramKeys: ['type'] })
