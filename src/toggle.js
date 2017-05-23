/*! toggle.js v1.0.0 | MIT License | https://github.com/oldrivercreative/toggle */

import Options from './options'
import Utility from './utility'

/**
 * Create new toggle object
 * @param {Object} config
 * @override {String} targetSelector
 * @return {Toggle}
 */
const Toggle = function(config = {}){
  // Override: targetSelector
  if(typeof(config) === 'string'){
    let selector = config
    config = {
      targetSelector: selector
    }
  }

  // Options scaffolding
  this.options = {}

  /**
   * Toggle events
   * @return {Toggle}
   */
  this.options.onInit = () => this
  this.options.onBeforeToggle = () => this
  this.options.onToggle = () => this

  // Configure
  Utility.merge(this.options, Utility.clone(Options), config)

  // Target scaffolding
  this.targets = {}

  /**
   * Get all toggle targets
   * @return {Array}
   */
  this.targets.all = () => {
    return Array.from(document.querySelectorAll(this.options.targetSelector))
  }

  /**
   * Get expanded state of target
   * @return {Boolean}
   */
  this.targets.get = (target) => {
    return target.getAttribute('aria-expanded') === 'true'
  }

  /**
   * Set expanded state of target
   * @param {HTMLElement} target
   * @param {Boolean} expanded
   * @return {void}
   */
  this.targets.set = (target, expanded = null) => {
    // Get new expanded state
    if(expanded === null) expanded = !this.targets.get(target)

    // Expand
    if(expanded){
      if(this.options.single) this.blur()
      target.setAttribute('aria-expanded', 'true')
      if(this.options.targetClassExpanded) target.classList.add(this.options.targetClassExpanded)
      if(this.options.buttonClassExpanded) this.buttons.fromTarget(target).forEach((button) => button.classList.add(this.options.buttonClassExpanded))
      if(this.options.parentClassExpanded) target.parentNode.classList.add(this.options.parentClassExpanded)
    }

    // Collapse
    else{
      target.setAttribute('aria-expanded', 'false')
      if(this.options.targetClassExpanded) target.classList.remove(this.options.targetClassExpanded)
      if(this.options.buttonClassExpanded) this.buttons.fromTarget(target).forEach((button) => button.classList.remove(this.options.buttonClassExpanded))
      if(this.options.parentClassExpanded) target.parentNode.classList.remove(this.options.parentClassExpanded)
    }
  }

  /**
   * Set expanded state of all targets
   * @param {Boolean} expanded
   * @return {void}
   */
  this.targets.setAll = (expanded = null) => {
    this.targets.all().forEach((target) => {
      this.targets.set(target, expanded)
    })
  }

  /**
   * Get toggle targets from button
   * @param {HTMLElement} button
   * @return {Array}
   */
  this.targets.fromButton = (button) => {
    if(!this.options.scoped) return this.targets.all()
    let next = button.nextElementSibling
    if(next && Utility.matches(next, this.options.targetSelector)) return [ next ]
    else return []
  }

  /**
   * Initialize all targets
   * @return {void}
   */
  this.targets.init = () => {
    this.targets.all().forEach((target) => {
      // Create buttons
      if(this.options.createButtons){
        let button = document.createElement('button')
        button.innerHTML = this.options.buttonContent
        button.parentNode.insertBefore(button, target)
      }

      // Add target class
      if(this.options.targetClass) target.classList.add(this.options.targetClass)

      // Add parent class
      if(this.options.parentClass) target.parentNode.classList.add(this.options.parentClass)

      // Collapse target
      if(this.targets.get(target) !== true){
        this.targets.set(target, false)
      }
    })
  }

  // Buttons scaffolding
  this.buttons = {}

  /**
   * Get all toggle buttons
   * @return {Array}
   */
  this.buttons.all = () => {
    // Scoped to toggle target siblings
    if(this.options.scoped){
      let buttons = []
      this.targets.all().forEach((target) => {
        let targetBtns = this.buttons.fromTarget(target)
        targetBtns.forEach((button) => buttons.push(button))
      })
      return buttons
    }

    // Unscoped (search whole document)
    else{
      return Array.from(document.querySelectorAll(this.options.buttonSelector))
    }
  }

  /**
   * Get toggle buttons from target
   * @param {HTMLElement} target
   * @return {Array}
   */
  this.buttons.fromTarget = (target) => {
    if(!this.options.scoped) return this.buttons.all()
    let prev = target.previousElementSibling
    if(prev && Utility.matches(prev, this.options.buttonSelector)) return [ prev ]
    else return []
  }

  /**
   * Get toggle button from click event
   * @param {Event} e
   * @return {HTMLElement|null}
   */
  this.buttons.fromClick = (e) => {
    let button = Utility.matches(e.target, this.options.buttonSelector) ? e.target : Utility.closest(e.target, this.options.buttonSelector)
    if(button) return button
    else return null
  }

  /**
   * Handle button click event
   * @param {Eveent} e
   * @return {void}
   */
  this.buttons.click = (e) => {
    let button = this.buttons.fromClick(e)
    if(!button) return
    let targets = this.targets.fromButton(button)
    targets.forEach((target) => {
      this.targets.set(target)
    })
  }

  /**
   * Initialize all buttons
   * @return {void}
   */
  this.buttons.init = () => {
    this.buttons.all().forEach((button) => {
      // Add button class
      if(this.options.buttonClass) button.classList.add(this.options.buttonClass)

      // Click handler
      button.addEventListener('click', this.buttons.click)
    })
  }

  /**
   * Blur all targets
   * @return {void}
   */
  this.blur = (e = null) => {
    if(e === null || (this.options.blur && this.options.blurFilter && !Utility.matches(e.target, this.options.blurFilter))){
      this.targets.setAll(false)
    }
  }

  // Listen for blur
  document.addEventListener('click', this.blur)

  // Configure blur filters if not set
  if(this.options.blur && !this.options.blurFilter){
    this.options.blurFilter = `${this.options.targetSelector}, ${this.options.targetSelector} *, ${this.options.buttonSelector}, ${this.options.buttonSelector} *`
  }

  // Initialize targets and buttons
  this.targets.init()
  this.buttons.init()

  // Event: onInit
  this.options.onInit()

  return this
}

// Global accessor
window.Toggle = Toggle

export default Toggle
