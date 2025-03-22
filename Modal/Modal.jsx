import React, { useEffect } from 'react';
import './style.css';

const DEFAULT_STYLES = {
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
    zIndex: 1000,
  },
  modal: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    borderRadius: '100%',
    border: 'none',
    cursor: 'pointer',
  },
};

const Modal = ({
  isOpen,
  onClose,
  children,
  overlayClassName = 'overlay',
  modalClassName = 'modal',
  buttonClassName = 'closeButton',
}) => {
  const modalRef = React.useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        trapFocus(event);
      }
    };

    const trapFocus = (event) => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    setTimeout(() => {
      modalRef.current
        ?.querySelector('button, [href], input, select, textarea')
        ?.focus();
    }, 0);

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={overlayClassName}
      style={DEFAULT_STYLES.overlay}
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      ref={modalRef}
    >
      <div className={modalClassName} style={DEFAULT_STYLES.modal}>
        <button
          className={buttonClassName}
          onClick={onClose}
          aria-label="Close modal"
          style={DEFAULT_STYLES.closeButton}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
