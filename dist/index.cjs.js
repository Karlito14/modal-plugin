'use strict';

var React = require('react');

function styleInject(css, ref) {
  if ( ref === undefined ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".modal{background-color:#fff;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,.1);padding:20px;text-align:center}.closeButton{background:#000;color:#fff;font-size:20px}";
styleInject(css_248z);

var DEFAULT_STYLES = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    borderRadius: '100%',
    border: 'none',
    cursor: 'pointer'
  }
};
var Modal = function Modal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    children = _ref.children,
    _ref$overlayClassName = _ref.overlayClassName,
    overlayClassName = _ref$overlayClassName === undefined ? '' : _ref$overlayClassName,
    _ref$modalClassName = _ref.modalClassName,
    modalClassName = _ref$modalClassName === undefined ? 'modal' : _ref$modalClassName,
    _ref$buttonClassName = _ref.buttonClassName,
    buttonClassName = _ref$buttonClassName === undefined ? 'closeButton' : _ref$buttonClassName;
  var modalRef = React.useRef(null);
  React.useEffect(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab') {
        trapFocus(event);
      }
    };
    var trapFocus = function trapFocus(event) {
      var focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      var firstElement = focusableElements[0];
      var lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  var handleOverlayClick = function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: overlayClassName,
    style: DEFAULT_STYLES.overlay,
    role: "dialog",
    "aria-modal": "true",
    onClick: handleOverlayClick,
    ref: modalRef
  }, /*#__PURE__*/React.createElement("div", {
    className: modalClassName,
    style: DEFAULT_STYLES.modal
  }, /*#__PURE__*/React.createElement("button", {
    className: buttonClassName,
    onClick: onClose,
    "aria-label": "Close modal",
    style: DEFAULT_STYLES.closeButton
  }, "\xD7"), children));
};

exports.Modal = Modal;
//# sourceMappingURL=index.cjs.js.map
