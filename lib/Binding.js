'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chainFunction = require('chain-function');

var _chainFunction2 = _interopRequireDefault(_chainFunction);

function mapValue(props, propValue, componentName) {
  var isOpaqueAccessor = typeof props.bindTo === 'function';

  if (isOpaqueAccessor) {
    if (!props[propName]) return new Error(propName + ' is required when `bindTo` is a function');

    if (typeof props[propName] === 'function') return new Error(propName + ' must be an Object or a String, when `bindTo` is a function');
  }

  return _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.func])(props, propValue, componentName);
}

var Binding = (function (_React$Component) {
  _inherits(Binding, _React$Component);

  _createClass(Binding, null, [{
    key: 'propTypes',
    value: {
      /**
       * A callback prop name that the Binding should listen for changes on.
       *
       * ```js
       * <Binding changeProp='onSelect'>
       *   <MyDropDown />
       * </Binding>
       * ```
       */
      changeProp: _react.PropTypes.string.isRequired,

      /**
       * A prop name for the Binding to set from the BindingContext.
       *
       * ```js
       * <Binding valueProp='selectedValue'>
       *   <MyDropDown />
       * </Binding>
       * ```
       */
      valueProp: _react.PropTypes.string.isRequired,

      /**
       * An field name or accessor function, extracting the Binding value from the overall
       * BindingContext value
       *
       * ```js
       * <Binding bindTo='name'>
       *   <input />
       * </Binding>
       *
       * <Binding
       *   bindTo={model => {
       *     let [first, last] = model.name.split(' ')
       *     return { first, last }
       *   }}
       * >
       *  <MyDropdown />
       * </Binding>
       * ```
       */
      bindTo: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,

      /**
       * Customize how the Binding return value maps to the overall BindingContext `value`.
       * `mapValue` can be a a string property name or a function that returns a
       * value to be set to the `bindTo` field.
       *
       * ```js
       * <Binding
       *   bindTo='name'
       *   mapValue={dropdownValue =>
       *     dropdownValue.first + ' ' + dropdownValue.last
       *   }
       * >
       *  <MyDropdown />
       * </Binding>
       * ```
       *
       * You can also provide an object hash, mapping paths of the BindingContext `value`
       * to fields in the Binding value using a string field name, or a function accessor.
       *
       * ```js
       * <Binding
       *   bindTo={model => {
       *     let [first, last] = model.name.split(' ')
       *     return { first, last }
       *   }}
       *   mapValue={{
       *    name: dropdownValue =>
       *      dropdownValue.first + ' ' + dropdownValue.last
       *   }}
       * >
       *   <MyDropdown />
       * </Binding>
       * ```
       */
      mapValue: mapValue
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      changeProp: 'onChange',
      valueProp: 'value'
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      registerWithBindingContext: _react.PropTypes.func
    },
    enumerable: true
  }]);

  function Binding() {
    _classCallCheck(this, Binding);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _React$Component.call.apply(_React$Component, [this].concat(args));
    this._change = this._change.bind(this);
  }

  Binding.prototype.componentWillMount = function componentWillMount() {
    var _this = this;

    var first = true;

    this.bindingContext = this.context.registerWithBindingContext(function (context) {
      var last = _this._value;
      _this._value = context.value(_this.props.bindTo);

      if (!first && last !== _this._value) _this.forceUpdate();

      first = false;
    });
  };

  Binding.prototype.render = function render() {
    var _cloneElement;

    var _props = this.props;
    var changeProp = _props.changeProp;
    var valueProp = _props.valueProp;
    var children = _props.children;

    var child = _react2['default'].Children.only(children);

    return _react.cloneElement(child, (_cloneElement = {}, _cloneElement[valueProp] = this._value, _cloneElement[changeProp] = _chainFunction2['default'](child.props[changeProp], this._change), _cloneElement));
  };

  Binding.prototype._change = function _change() {
    var bindTo = this.props.bindTo;
    var mapValue = this.props.mapValue;

    if (typeof bindTo === 'string') {
      var _mapValue;

      if (typeof mapValue !== 'object') mapValue = (_mapValue = {}, _mapValue[bindTo] = mapValue, _mapValue);
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this.bindingContext.onChange(mapValue, args);
  };

  return Binding;
})(_react2['default'].Component);

exports['default'] = Binding;
module.exports = exports['default'];