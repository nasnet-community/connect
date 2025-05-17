import { component$, useSignal } from '@builder.io/qwik';
import { FileUpload } from '../index';
import type { FileInfo } from '../FileUpload.types';

export default component$(() => {
  const files = useSignal<FileInfo[]>([]);
  
  return (
    <div class="space-y-4">
      <FileUpload
        label="Upload files"
        helperText="Drag and drop files or click to browse"
        multiple
        onFilesSelected$={(selectedFiles) => {
          console.log('Files selected:', selectedFiles);
        }}
        onFileRemoved$={(removedFile) => {
          console.log('File removed:', removedFile);
        }}
      />
      
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Basic file upload component with drag and drop support
      </div>
    </div>
  );
});
