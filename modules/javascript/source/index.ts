export const LIB_NAME = '1lib'

export const MODULES = [
  'core',

  'functional',
  'reactive',
]

for (const MODULE of MODULES) {
  import(`@${LIB_NAME}/${MODULE}/source`)
}
