const placeholder = {
  '@@1lib/placeholder': true,
}

export function isPlaceHolder(target: any) {
  return target['@@1lib/placeholder'] === true
}

export default placeholder
