import { noop } from './util';

class FunctorParameter {
  private paramMap: Map<string, any>;

  constructor(props: Map<string, any> | Array<any>) {
    if (props instanceof Map) {
      this.paramMap = new Map(props);
    } else {
      this.paramMap = new Map(Object.entries(props));
    }
  }

  get params(): Array<any> {
    return Object.values(this.paramEntities);
  }

  get paramEntities(): object {
    const returns = {};
    this.paramMap.forEach((v,k) => {
      returns[k] = v;
    });
    return returns;
  }
}

enum FunctorMode {
  entities,
  array,
}

class Functor {
  /**
   * attributes
   */
  private executor: Function = noop;

  private parameter: FunctorParameter;

  private mode: FunctorMode = FunctorMode.entities;

  constructor(executor: Function, mode: FunctorMode) {
    this.executor = executor;
    this.mode = mode;
  }

}

export default Functor;
