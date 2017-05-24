/**
 * Toggle configuration options
 * @type {Object}
 */
const Options = {
  /**
   * Collapse targets when clicking away
   * @type {Boolean}
   */
  blur: false,

  /**
   * Query selector for click targets that don't trigger blur; this is optional
   * and is automatically generated, but you may need to customize this to get
   * blur working just right in your specific application
   * @type {String}
   */
  blurFilter: null,

  /**
   * Class added to toggle buttons
   * @type {String}
   */
  buttonClass: null,

  /**
   * Class added to toggle buttons when the target is expanded
   * @type {String}
   */
  buttonClassExpanded: null,

  /**
   * HTML content to be added to created buttons, if enabled (see
   * "createButtons")
   * @type {String}
   */
  buttonContent: 'Toggle',

  /**
   * Elements matching this query selector will toggle the target on click; note
   * that this query selector applies only to siblings of the target by default;
   * see "scoped" option for additional configuration options
   * @type {String}
   */
  buttonSelector: 'button',

  /**
   * Insert a toggle button before each toggle target
   * @type {Boolean}
   */
  createButtons: false,

  /**
   * Class applied to toggle target's parent element
   * @type {String}
   */
  parentClass: null,

  /**
   * Class applied to toggle target's parent element when expanded
   * @type {String}
   */
  parentClassExpanded: null,

  /**
   * Search for toggle targets that are siblings of the toggle button
   *   true: The button's parent element will be searched for toggle targets
   *   false: The entire document will be searched for toggle targets
   * @type {Boolean}
   */
  scoped: true,

  /**
   * Allow only a single target to be expanded at one time
   * @type {Boolean}
   */
  single: false,

  /**
   * Allow only a single target sibling to be expanded at one time; enabling
   * this option will search the target parent's siblings for expanded targets
   * and close them if they are open; this is especially useful when you have a
   * multi-level navigation menu accordion
   * @type {Boolean}
   */
  singleSibling: false,

  /**
   * Class added to toggle targets
   * @type {String}
   */
  targetClass: null,

  /**
   * Class added to toggle targets when expanded
   * @type {String}
   */
  targetClassExpanded: null,

  /**
   * Query selector for toggle targets
   * @type {String}
   */
  targetSelector: '.toggle'
}

export default Options
