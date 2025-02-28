# React Modal Component

A reusable, accessible **modal dialog** implementation for **React applications**. This component supports features like focus trapping, keyboard accessibility, and overlay click handling.

## Table of Contents

1. [Features](#features)
2. [Props](#props)
3. [Usage](#usage)
4. [Accessibility](#accessibility)
5. [Key Functions](#key-functions)
6. [Styling](#styling)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [License](#license)

## Features

- Close the modal using the Escape key.
- Focus trapping within the modal when open.
- Close the modal by clicking on the overlay (background).
- Fully customizable through props for styling and behavior.

## Props

|Prop Name|Type|Default Value|Description|
|---------|----|-------------|-----------|
|isOpen   |boolean|undefined|Controls whether the modal is open. Pass true to open and false to close.|
|onClose  |function|undefined|Callback function executed when the modal is closed. Required for handling close actions|
|children |node|undefined|Content to display inside the modal.|
|overlayClassName |string|'overlay'|Class name for the overlay. Use for custom styling.|
|modalClassName |string|'modal'|Class name for the modal container. Use for custom styling.|
|buttonClassName |string|'closeButton'|Class name for the close button. Use for custom styling.|

## Usage
### Basic Example

```
import React, { useState } from 'react';
import Modal from './Modal';
import './style.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Modal Content</h1>
        <p>This is an example of modal content.</p>
      </Modal>
    </div>
  );
};

export default App;
```

### Custom Styling Example

```
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  overlayClassName="customOverlay"
  modalClassName="customModal"
  buttonClassName="customCloseButton"
>
  <h1>Custom Styled Modal</h1>
</Modal>
```

## Accessibility

1. Keyboard Navigation:
    - Press `Escape` to close the modal
    - Use `Tab` and `Shift + Tab` to navigate within the modal content.
2. ARIA Attributes:
    - `role="dialog"` and `aria-modal="true"` are used to ensure compatibility with screen readers.


## Key Functions

`handleKeyDown`
Handles keyboard interactions, including:
- Closing the modal with the `Escape` key.
- Managing focus trapping with the `Tab` key.

`trapFocus`
Ensures focus remains within the modal by cycling through focusable elements.

`handleOverlayClick`
Closes the modal if a click occurs on the overlay (background).

## Styling

The component is fully customizable through CSS class names provided via props.

### Default Styles 

```
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
```

### Default CSS 

```
.modal {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
}

.closeButton {
  background: black;
  color: white;
  font-size: 20px;
}
```

### Custom CSS
Use the overlayClassName, modalClassName, and buttonClassName props to apply your custom styles.

## Best Practices

1. **Provide Required Props:**
    - Ensure `isOpen` and `onClose` are passed to control modal behavior properly.
2. **Test Focus Management:**
    - Verify focus trapping with `Tab` navigation in various scenarios.
3. **Customize Styles:**
    - Match the modal's appearance to your application's theme using the class name props.
4. **Ensure Accessibility:**
    - Validate ARIA attributes and focus trapping for assistive technologies.

## Troubleshooting

1. **Modal Not Closing on Escape Key**
    - Verify `onClose` is passed and correctly implemented
2. **Focus Not Trapped:**
    - Check that all focusable elements inside the modal are correctly defined.
3. **Overlay Click Not Working:**
    - Ensure `handleOverlayClick` is triggered by checking event propagation.

## Notes

- Manage the `isOpen` state in the parent component to avoid unintended behavior.

## License

This component is provided under the MIT license. Feel free to use and modify it as needed.