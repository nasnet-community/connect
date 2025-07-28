import { component$ } from "@builder.io/qwik";
import { FileUpload } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Horizontal Layout (Default)</h3>
        <FileUpload
          label="Horizontal layout"
          layout="horizontal"
          helperText="Default layout with horizontal orientation"
          browseButtonText="Select Files"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Vertical Layout</h3>
        <FileUpload
          label="Vertical layout"
          layout="vertical"
          helperText="Alternative layout with vertical orientation"
          browseButtonText="Choose Files"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Customized Drop Area Text</h3>
        <FileUpload
          label="Custom drop text"
          dropText="Drop your files here or"
          browseButtonText="browse your computer"
          helperText="With customized text for the drop area and button"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Custom Styling</h3>
        <FileUpload
          label="Styled upload area"
          containerClass="border-2 border-dashed border-purple-500 rounded-xl"
          dropAreaClass="bg-purple-50 dark:bg-purple-900/20"
          browseButtonClass="bg-purple-600 hover:bg-purple-700 text-white"
          helperText="With custom CSS classes for styling"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Without Drag and Drop</h3>
        <FileUpload
          label="No drag and drop"
          dragAndDrop={false}
          browseButtonText="Select Files"
          helperText="Only allows selection via file dialog"
        />
      </div>
    </div>
  );
});
