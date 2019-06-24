export default function pipe(data: any): any {
  const toReturn = {
    _data: data,

    pop() {
      return this._data
    }


  }

  return toReturn
}
