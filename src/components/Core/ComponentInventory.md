# Core Component Inventory

This document provides a comprehensive inventory of all components in the Core directory of the Connect project.

## Component Categories

The Core component directory is organized into the following main categories:

1. Button
2. Card
3. Feedback (Alert, ErrorMessage, PromoBanner)
4. FileInput (ConfigFileInput, VPNConfigFileSection)
5. Form (Container, Field, FormErrorMessage, FormHelperText, FormLabel, RadioGroup, ServerField)
6. Foundation (Design tokens, ThemeToggle, etc.)
7. Graph (Connection, Container, Node, Traffic, hooks)
8. Input
9. Modal
10. Select (VPNSelect)
11. Stepper (CStepper, HStepper, VStepper, StateViewer)
12. Switch (ConfigMethodToggle)
13. TimePicker
14. Common

## Detailed Component Inventory

Below is a detailed inventory of all Core components:

| Component Family | Component Name       | Path                            | Status        | Notes                                               |
| ---------------- | -------------------- | ------------------------------- | ------------- | --------------------------------------------------- |
| Button           | Button               | /button                         | To be audited |                                                     |
| Card             | Card                 | /Card                           | To be audited |                                                     |
| Feedback         | Alert                | /Feedback/Alert                 | To be audited |                                                     |
| Feedback         | ErrorMessage         | /Feedback/ErrorMessage          | To be audited |                                                     |
| Feedback         | PromoBanner          | /Feedback/PromoBanner           | To be audited |                                                     |
| FileInput        | FileInput            | /FileInput                      | To be audited |                                                     |
| FileInput        | ConfigFileInput      | /FileInput/ConfigFileInput      | To be audited |                                                     |
| FileInput        | VPNConfigFileSection | /FileInput/VPNConfigFileSection | To be audited |                                                     |
| Form             | Container            | /Form/Container                 | To be audited |                                                     |
| Form             | Field                | /Form/Field                     | To be audited |                                                     |
| Form             | FormErrorMessage     | /Form/FormErrorMessage          | To be audited |                                                     |
| Form             | FormHelperText       | /Form/FormHelperText            | To be audited |                                                     |
| Form             | FormLabel            | /Form/FormLabel                 | To be audited |                                                     |
| Form             | RadioGroup           | /Form/RadioGroup                | To be audited |                                                     |
| Form             | ServerField          | /Form/ServerField               | To be audited | Potentially specialized component to be generalized |
| Graph            | Connection           | /Graph/Connection               | To be audited |                                                     |
| Graph            | Container            | /Graph/Container                | To be audited |                                                     |
| Graph            | Node                 | /Graph/Node                     | To be audited |                                                     |
| Graph            | Traffic              | /Graph/Traffic                  | To be audited |                                                     |
| Graph            | Hooks                | /Graph/hooks                    | To be audited |                                                     |
| Input            | Input                | /Input                          | To be audited |                                                     |
| Modal            | Modal                | /Modal                          | To be audited |                                                     |
| Select           | Select               | /Select                         | To be audited |                                                     |
| Select           | VPNSelect            | /Select/VPNSelect               | To be audited | Potentially overlapping with Select                 |
| Stepper          | CStepper             | /Stepper/CStepper               | To be audited | Circular stepper                                    |
| Stepper          | HStepper             | /Stepper/HStepper               | To be audited | Horizontal stepper                                  |
| Stepper          | VStepper             | /Stepper/VStepper               | To be audited | Vertical stepper                                    |
| Stepper          | StateViewer          | /Stepper/StateViewer            | To be audited |                                                     |
| Switch           | Switch               | /Switch                         | To be audited |                                                     |
| Switch           | ConfigMethodToggle   | /Switch/ConfigMethodToggle      | To be audited | Specialized switch component                        |
| TimePicker       | TimePicker           | /TimePicker                     | To be audited |                                                     |
| Foundation       | GlobalStyles         | /foundation/GlobalStyles        | Completed     | Cross-browser reset styles                          |
| Foundation       | ThemeToggle          | /foundation/ThemeToggle         | Completed     | Dark/light mode toggle                              |
| Foundation       | RTLProvider          | /foundation/RTLProvider         | Completed     | RTL language support                                |
| Foundation       | DesignTokens         | /foundation/DesignTokens.md     | Completed     | Design tokens documentation                         |

## Components with Potential Overlap

Based on the directory structure, the following components may have overlapping functionality:

1. **Select Components**:

   - Select (generic)
   - VPNSelect (specialized)

2. **Form Field Components**:

   - Field (generic)
   - ServerField (specialized)

3. **Switch-like Components**:
   - Switch (generic)
   - ConfigMethodToggle (specialized)
   - Potentially RadioGroup

## Next Steps

For each component family, we will:

1. Audit its implementation, variants, and props
2. Test its responsiveness
3. Check accessibility
4. Verify dark mode support
5. Document its API and usage guidelines
6. Consolidate overlapping components where appropriate

The audit will be documented in component-specific audit files.
