/**
 * Utility method class
 * @type {Object}
 */
const Utility = {
  /**
   * Determine if the element is an object
   * @param {Object} el
   * @return {Boolean}
   */
  isObject(el){
    return el && typeof(el) === 'object' && !Array.isArray(el)
  },

  /**
   * Clone an object
   * @param {Object} obj
   * @return {Object}
   */
  clone(obj){
    return JSON.parse(JSON.stringify(obj))
  },

  /**
   * Deep merge one or more source objects into the target object
   * @param {Object} target
   * @param {Object} sources
   * @return {Object}
   */
  merge(target, ...sources){
    if(!sources.length) return target
    const source = sources.shift()
    if(Utility.isObject(target) && Utility.isObject(source)){
      for(const key in source){
        if(Utility.isObject(source[key])){
          if(!target[key]) Object.assign(target, { [key]: {} })
          Utility.merge(target[key], source[key])
        }
        else{
          Object.assign(target, { [key]: source[key] })
        }
      }
    }
    return Utility.merge(target, ...sources)
  },

  /**
   * Determine if DOM element matches the CSS selector
   * @param {Object} el
   * @param {String} selector
   * @return {Boolean}
   */
  matches(el, selector){
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector)
  },

  /**
   * Find closest DOM element ancestor that matches the CSS selector
   * @param {Object} el
   * @param {String} selector
   * @return {Object|null}
   */
  closest(el, selector){
    let parent
    while(el){
      parent = el.parentElement
      if(parent && Utility.matches(parent, selector)) return parent
      el = parent
    }
    return null
  }
}

export default Utility
