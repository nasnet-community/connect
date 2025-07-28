import { component$ } from "@builder.io/qwik";

interface FilePreviewProps {
  /**
   * URL to the file (object URL)
   */
  url: string;

  /**
   * Name of the file
   */
  fileName: string;

  /**
   * MIME type of the file
   */
  fileType: string;
}

/**
 * FilePreview component for rendering previews of uploaded files
 */
export const FilePreview = component$<FilePreviewProps>((props) => {
  const { url, fileName, fileType } = props;

  // Determine if file is an image
  const isImage = fileType.startsWith("image/");

  // Determine if file is a PDF
  const isPdf = fileType === "application/pdf";

  // Render file preview based on type
  return (
    <div class="file-preview">
      {isImage && (
        <img
          src={url}
          alt={fileName}
          class="file-preview-image"
          width={64}
          height={64}
        />
      )}

      {isPdf && (
        <div class="file-preview-pdf">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span class="file-preview-pdf-label">PDF</span>
        </div>
      )}

      {!isImage && !isPdf && (
        <div class="file-preview-generic">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span class="file-preview-generic-label">
            {fileType.split("/")[1]?.toUpperCase() || "FILE"}
          </span>
        </div>
      )}
    </div>
  );
});
