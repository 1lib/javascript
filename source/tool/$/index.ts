export default function pipe(data: any): any {
  const toReturn = {
    _data: data,

    data() {
      return this._data
    }


  }

  return toReturn
}
