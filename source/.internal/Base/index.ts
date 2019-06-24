import { isPlaceHolder } from '../_'


export const ENTRY_CONFIGURATION_PARAM_MODE = {
  PURE: 0,
  OBJECT: 1,
}

const defaultConfiguration = {
  param: {
    count: (<any>Number).MAX_SAFE_INTEGER,
    keys: [],
    mode: ENTRY_CONFIGURATION_PARAM_MODE.PURE,
  },
}

const defaultParam = {}

function getNextAvailableKey(target: object, defaults: Array<string> = []) {
  const keys = Object.keys(target)

  for(const defaultKey of defaults) {
    if (keys.indexOf(defaultKey) === -1) {
      return defaultKey
    }
  }

  const numberKeys = keys.filter(Boolean).filter(key => !isNaN(<any>key))
  return String(Math.max(...<Array<any>>numberKeys, keys.length - 1) + 1)
}

function squash(target: any): any {
	const toReturn = <any>{}

	for (let i in target) {
		if (!target.hasOwnProperty(i)) continue

		if (Object.prototype.toString.call(target[i]) === '[object Object]') {
      let flatObject = squash(target[i])
			for (let x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue

				toReturn[i + x.charAt(0).toUpperCase()] = flatObject[x]
			}
		} else {
			toReturn[i] = target[i]
		}
  }

	return toReturn
}

export default function Base(fn: Function, config: object = {}, param: object = {}): Function {
  const entry = (...args: Array<any>): any => {
    switch (entry._configuration.paramMode) {
      case ENTRY_CONFIGURATION_PARAM_MODE.PURE:
        const newConfig = { ...entry._configuration }
        const newParams = { ...entry._params }

        for (const arg of args) {
          let hasPlaceHolderUnderLoop
          if (isPlaceHolder(arg) || hasPlaceHolderUnderLoop) {
            newParams[getNextAvailableKey(newParams, entry._configuration.paramKeys)] = arg
            hasPlaceHolderUnderLoop = true
          } else {
            let findPlaceHolder
            for (const [key, param] of (<any>Object).entries(newParams)) {
              if (isPlaceHolder(param)) {
                newParams[key] = arg
                findPlaceHolder = true
                break
              }
            }
            if (!findPlaceHolder) {
              newParams[getNextAvailableKey(newParams, entry._configuration.paramKeys)] = arg
            }
          }
        }

        const validParamNum = (<any>Object).values(newParams).filter((param: object) => !isPlaceHolder(param)).length
        if (validParamNum >= entry._configuration.paramCount) {
          return fn(newParams)
        } else {
          return Base(fn, newConfig, newParams)
        }

      case ENTRY_CONFIGURATION_PARAM_MODE.OBJECT:
        if (args.length !== 1 || (args.length === 1 && !(args[0] instanceof Object && !isPlaceHolder(args[0])))) {
          const nextAvailableKey = getNextAvailableKey(entry._params)
          args = [
            args.reduce((res, arg, idx) => ({
              ...res,
              [nextAvailableKey + idx]: arg,
            }), {})
          ]
        }

        const argTotal = {
          ...entry._params,
          ...args[0],
        }

        for (const [idx, param] of (<any>Object).entries(argTotal)) {
          if (isPlaceHolder(param)) {
            delete argTotal[idx]
          }
        }

        if (Object.keys(argTotal).length >= entry._configuration.paramCount) {
          return fn(argTotal)
        } else {
          return Base(fn, { ...entry._configuration }, argTotal)
        }

      default:
        break
    }
  }

  entry._configuration = (<any>Object).assign({}, squash(defaultConfiguration), config)
  entry._params = (<any>Object).assign({}, defaultParam, param)

  entry.$config = (config: object) => {
    return Base(fn, { ...entry._configuration, ...squash(config) }, { ...entry._params })
  }
  entry.$inspection = () => {
    if (entry._configuration.paramMode === ENTRY_CONFIGURATION_PARAM_MODE.OBJECT) {
      for (const [idx, param] of (<any>Object).entries(entry._params)) {
        if (isPlaceHolder(param)) {
          delete entry._params[idx]
        }
      }
    }
  }
  entry.$done = entry.$execute = () => {
    entry.$inspection()
    return fn(entry._params)
  }

  return entry
}
