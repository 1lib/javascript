import { dependencies } from '../package.json'

for (const dependency of Object.keys(dependencies)) {
  import(dependency)
}
