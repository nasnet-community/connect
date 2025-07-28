# Toggle vs. Radio Component Distinction

This document defines the clear distinction between toggle and radio functionality in the Connect design system as part of Task 5.2.2.

## Functional Distinction

### Toggle Component

A toggle component represents a binary state with two possible values: ON and OFF (or true/false). It's used for:

1. **Binary Settings**: Enable/disable a specific feature or functionality
2. **Immediate Action**: Toggling often implies an immediate effect or state change
3. **Single Option**: Represents a standalone choice, independent of other options
4. **Stateful UI**: Provides a clear visual indication of the current state

### Radio Component

A radio component allows selecting a single option from a group of mutually exclusive options. It's used for:

1. **Selection from Multiple Options**: Choose one from two or more alternatives
2. **Grouped Choices**: Options are related and part of a coherent set
3. **Mutually Exclusive Selection**: Only one option can be selected at a time
4. **Form Submission**: Typically used in forms for sending a selected value

## Usage Guidelines

### When to Use Toggle

Use a toggle switch when:

- The action or setting has only two states (on/off, enabled/disabled)
- The change should apply immediately (without a form submission)
- The option stands alone and isn't part of a group of related options
- The user would expect a binary choice represented as a physical switch

**Examples:**

- Enable/disable dark mode
- Turn on/off notifications
- Show/hide advanced settings
- Enable/disable a feature flag

### When to Use Radio Buttons

Use radio buttons when:

- Users need to select one option from several related choices
- Options are mutually exclusive
- The choices represent a set of related alternatives
- The selection is typically confirmed through form submission
- You need to show all available options at once for comparison

**Examples:**

- Selecting a payment method from multiple options
- Choosing a shipping speed (standard, express, overnight)
- Selecting a subscription plan
- Setting a default view mode from multiple alternatives

## Visual and Interactive Distinction

### Toggle Design

- **Appearance**: Resembles a physical switch that can slide between positions
- **Animation**: Slides or transitions between states
- **States**: Clear visual difference between ON and OFF states
- **Labels**: Often has single label describing the feature being toggled
- **Interaction**: Click anywhere on the component to toggle

### Radio Design

- **Appearance**: Circular buttons with fill/outline to indicate selection
- **Grouping**: Always presented as a group of options
- **Selection**: One option highlighted/filled when selected
- **Labels**: Each option has its own descriptive label
- **Interaction**: Click on an option to select it

## Implementation Guidelines

### Toggle Component

```tsx
// Example usage:
<Toggle
  checked={isDarkMode}
  onChange$={(checked) => setDarkMode(checked)}
  label="Dark Mode"
/>
```

### Radio Component and RadioGroup

```tsx
// Single radio button:
<Radio
  value="option1"
  name="choiceGroup"
  checked={selectedOption === "option1"}
  onChange$={(value) => setSelectedOption(value)}
  label="Option 1"
/>

// Radio group:
<RadioGroup
  name="paymentMethod"
  value={selectedPayment}
  onChange$={(value) => setSelectedPayment(value)}
  options={[
    { value: "credit", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank", label: "Bank Transfer" }
  ]}
/>
```

## Accessibility Considerations

### Toggle Accessibility

- Use `role="switch"` when appropriate
- Ensure keyboard navigation works (space to toggle)
- Use clear labels describing what is being toggled
- Provide visual and potentially auditory feedback when state changes
- Use `aria-checked` to indicate current state

### Radio Accessibility

- Use standard `<input type="radio">` elements for native accessibility
- Ensure proper keyboard navigation with arrow keys
- Group related radio buttons with the same `name` attribute
- Use proper labeling with `<fieldset>` and `<legend>` for groups
- Ensure adequate spacing for touch targets

## Design System Integration

Both components should:

1. Follow the Connect design system's color tokens and spacing
2. Support dark and light modes with appropriate contrasts
3. Include size variants (sm, md, lg) for different contexts
4. Use semantic design tokens instead of direct color values
5. Support RTL layouts for internationalization
6. Include proper keyboard and screen reader support

## Component Naming

To clarify these distinctions in our codebase:

1. Rename "Switch" to "Toggle" to better reflect its binary nature
2. Rename "RadioButtonSwitch" to "Toggle" (merge with the above)
3. Keep "RadioGroup" naming as is
4. Create a new "Radio" component for single radio button instances

This clear distinction will guide the implementation of our updated components in subsequent tasks.
