import { component$, $ } from '@builder.io/qwik';
import { useLocation } from "@builder.io/qwik-city";
import { ComponentGroupsDisplay, ComponentGroup } from "~/components/Docs";
import { HiCursorArrowRaysOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  
  const componentGroups: ComponentGroup[] = [
    {
      name: "Form",
      description: "Input components for collecting user data",
      icon: $(HiCursorArrowRaysOutline),
      components: [
        {
          name: "Checkbox",
          description: "Selection control that allows users to select multiple options from a set",
          path: `/${locale}/docs/components/form/checkbox`,
          status: "stable"
        },
        {
          name: "Container",
          description: "Container component to group related form elements with shared styles",
          path: `/${locale}/docs/components/form/container`,
          status: "stable"
        },
        {
          name: "DatePicker",
          description: "Calendar-based date selection with range support and localization",
          path: `/${locale}/docs/components/form/datepicker`,
          status: "stable"
        },
        {
          name: "Field",
          description: "Wrapper for form controls with integrated label, helper text, and validation",
          path: `/${locale}/docs/components/form/field`,
          status: "stable"
        },
        {
          name: "File Upload",
          description: "Component for selecting and uploading files with drag-and-drop support",
          path: `/${locale}/docs/components/form/fileupload`,
          status: "stable"
        },
        {
          name: "Form",
          description: "Container for form elements with validation and submission handling",
          path: `/${locale}/docs/components/form/form`,
          status: "stable"
        },
        {
          name: "Form Error Message",
          description: "Component for displaying form-level or field-level error messages",
          path: `/${locale}/docs/components/form/formerrormessage`,
          status: "stable"
        },
        {
          name: "Form Helper Text",
          description: "Supplementary text to provide additional context or instructions for form fields",
          path: `/${locale}/docs/components/form/formhelpertext`,
          status: "stable"
        },
        {
          name: "Form Label",
          description: "Accessible label component for form fields with required field indication",
          path: `/${locale}/docs/components/form/formlabel`,
          status: "stable"
        },
        {
          name: "Password Field",
          description: "Specialized input for password entry with visibility toggle",
          path: `/${locale}/docs/components/form/passwordfield`,
          status: "stable"
        },
        {
          name: "Radio Group",
          description: "Selection control that allows users to select a single option from a set",
          path: `/${locale}/docs/components/form/radiogroup`,
          status: "stable"
        },
        {
          name: "Server Field",
          description: "Input field with specialized handling for server information",
          path: `/${locale}/docs/components/form/serverfield`,
          status: "stable"
        },
        {
          name: "Slider",
          description: "Input control for selecting a value from a range",
          path: `/${locale}/docs/components/form/slider`,
          status: "stable"
        },
        {
          name: "Text Area",
          description: "Multi-line text input with auto-resizing and character counting",
          path: `/${locale}/docs/components/form/textarea`,
          status: "stable"
        }
      ]
    }
  ];

  return <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />;
});