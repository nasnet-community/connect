// import { Meta, StoryObj } from "storybook-framework-qwik";
// import { InlineCode } from "./InlineCode";
// import { CodeBlock } from "./CodeBlock";
// import { type InlineCodeProps, type CodeBlockProps } from "./CodeDisplay.types";
// import { Text } from "../Text";

// // Meta information for the InlineCode component
// const meta: Meta<InlineCodeProps> = {
//   title: "Connect/Typography/InlineCode",
//   component: InlineCode,
//   tags: ["autodocs"],
//   argTypes: {
//     children: {
//       control: "text",
//       description: "The code content to display",
//     },
//     noWrap: {
//       control: "boolean",
//       description: "Whether to prevent text wrapping",
//     },
//   },
// };

// export default meta;
// type InlineCodeStory = StoryObj<InlineCodeProps>;

// /**
//  * Basic InlineCode example
//  */
// export const Basic: InlineCodeStory = {
//   args: {
//     children: "const count = useSignal(0);",
//   },
// };

// /**
//  * InlineCode within text
//  */
// export const WithinText: InlineCodeStory = {
//   render: () => {
//     // Use string literals for the text content to avoid JSX compatibility issues
//     return (
//       <div>
//         <Text size="base">To create reactive state in Qwik, use the</Text>
//         <InlineCode>useSignal()</InlineCode>
//         <Text size="base">hook. You can then access and update the value with</Text>
//         <InlineCode>signal.value</InlineCode>
//       </div>
//     );
//   },
// };

// /**
//  * Long InlineCode with wrapping
//  */
// export const LongCode: InlineCodeStory = {
//   render: () => (
//     <div class="w-64 p-4 border rounded">
//       <InlineCode>
//         {`const reallyLongVariableName = useStore({ items: [], users: [], settings: { theme: 'dark' } });`}
//       </InlineCode>
//     </div>
//   ),
// };

// /**
//  * InlineCode with nowrap
//  */
// export const NoWrap: InlineCodeStory = {
//   render: () => (
//     <div class="w-64 p-4 border rounded overflow-auto">
//       <InlineCode noWrap>
//         {`const reallyLongVariableName = useStore({ items: [], users: [], settings: { theme: 'dark' } });`}
//       </InlineCode>
//     </div>
//   ),
// };

// // Meta information for the CodeBlock component
// const codeBlockMeta: Meta<CodeBlockProps> = {
//   title: "Connect/Typography/CodeBlock",
//   component: CodeBlock,
//   tags: ["autodocs"],
//   argTypes: {
//     code: {
//       control: "text",
//       description: "The code to display",
//     },
//     language: {
//       control: "select",
//       options: [
//         "bash", "c", "cpp", "csharp", "css", "diff", "go", "graphql", "html", 
//         "java", "javascript", "js", "json", "jsx", "kotlin", "less", "markdown", 
//         "md", "mysql", "objectivec", "perl", "php", "python", "py", "ruby", 
//         "rust", "scala", "scss", "shell", "sql", "swift", "typescript", "ts", "tsx", "yaml", "yml"
//       ],
//       description: "Programming language for syntax highlighting",
//     },
//     showLineNumbers: {
//       control: "boolean",
//       description: "Whether to show line numbers",
//     },
//     wrap: {
//       control: "boolean",
//       description: "Whether to enable word wrapping",
//     },
//     theme: {
//       control: "select",
//       options: ["light", "dark", "system"],
//       description: "Visual theme for the code block",
//     },
//     title: {
//       control: "text",
//       description: "Custom title or filename to display above the code block",
//     },
//     copyButton: {
//       control: "boolean",
//       description: "Whether to add a copy button",
//     },
//     highlight: {
//       control: "boolean",
//       description: "Whether to add syntax highlighting",
//     },
//     highlightLines: {
//       control: "text",
//       description: "Line numbers or ranges to highlight (e.g., '1,3-5,8')",
//     },
//     maxHeight: {
//       control: "text",
//       description: "Maximum height before scrolling (e.g., '300px')",
//     },
//     caption: {
//       control: "text",
//       description: "Custom caption or description beneath the code block",
//     },
//   },
// };

// type CodeBlockStory = StoryObj<CodeBlockProps>;

// // Sample code snippets
// const jsCodeSample = `// Creating reactive state in Qwik
// import { component$, useSignal, useTask$ } from '@builder.io/qwik';

// export const Counter = component$(() => {
//   const count = useSignal(0);
  
//   useTask$(({ track }) => {
//     track(() => count.value);
//     console.log('Count changed:', count.value);
//   });
  
//   return (
//     <div>
//       <p>Count: {count.value}</p>
//       <button onClick$={() => count.value++}>Increment</button>
//     </div>
//   );
// });`;

// const cssCodeSample = `.code-block-container {
//   border-radius: 0.5rem;
//   overflow: hidden;
//   border: 1px solid #e2e8f0;
// }

// .code-block-container pre {
//   margin: 0;
//   padding: 1rem;
//   font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
//   font-size: 0.875rem;
//   line-height: 1.5;
// }

// .code-block-container .copy-button {
//   position: absolute;
//   top: 0.5rem;
//   right: 0.5rem;
//   opacity: 0;
//   transition: opacity 0.2s ease;
// }

// .code-block-container:hover .copy-button {
//   opacity: 1;
// }`;

// const htmlCodeSample = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Qwik Example</title>
// </head>
// <body>
//   <header>
//     <h1>Welcome to Qwik</h1>
//     <nav>
//       <ul>
//         <li><a href="/">Home</a></li>
//         <li><a href="/about">About</a></li>
//         <li><a href="/contact">Contact</a></li>
//       </ul>
//     </nav>
//   </header>
//   <main>
//     <section id="content">
//       <!-- Content will be loaded here -->
//     </section>
//   </main>
//   <script type="module" src="/src/entry.client.tsx"></script>
// </body>
// </html>`;

// /**
//  * Basic CodeBlock example with JavaScript
//  */
// export const BasicCodeBlock: CodeBlockStory = {
//   args: {
//     code: jsCodeSample,
//     language: "javascript",
//     showLineNumbers: true,
//     copyButton: true,
//   },
// };

// /**
//  * CodeBlock with different languages
//  */
// export const Languages: CodeBlockStory = {
//   render: () => (
//     <div class="space-y-6">
//       <div>
//         <Text size="lg" weight="semibold">{`JavaScript`}</Text>
//         <CodeBlock 
//           code={jsCodeSample}
//           language="javascript"
//           title="counter.jsx"
//           showLineNumbers={true}
//         />
//       </div>
      
//       <div>
//         <Text size="lg" weight="semibold">{`CSS`}</Text>
//         <CodeBlock 
//           code={cssCodeSample}
//           language="css"
//           title="styles.css"
//           showLineNumbers={true}
//         />
//       </div>
      
//       <div>
//         <Text size="lg" weight="semibold">{`HTML`}</Text>
//         <CodeBlock 
//           code={htmlCodeSample}
//           language="html"
//           title="index.html"
//           showLineNumbers={true}
//         />
//       </div>
//     </div>
//   ),
// };

// /**
//  * CodeBlock with title and caption
//  */
// export const WithTitleAndCaption: CodeBlockStory = {
//   args: {
//     code: jsCodeSample,
//     language: "javascript",
//     title: "counter.jsx",
//     caption: "A simple counter component using Qwik's useSignal() for state management",
//     showLineNumbers: true,
//   },
// };

// /**
//  * CodeBlock with line highlighting
//  */
// export const LineHighlighting: CodeBlockStory = {
//   args: {
//     code: jsCodeSample,
//     language: "javascript",
//     highlightLines: "2,6-10,15",
//     showLineNumbers: true,
//     title: "Highlighted important parts",
//   },
// };

// /**
//  * CodeBlock with themes
//  */
// export const Themes: CodeBlockStory = {
//   render: () => (
//     <div class="space-y-6">
//       <div>
//         <Text size="lg" weight="semibold">Light Theme</Text>
//         <CodeBlock 
//           code={jsCodeSample.slice(0, 200)}
//           language="javascript"
//           theme="light"
//           showLineNumbers={true}
//         />
//       </div>
      
//       <div>
//         <Text size="lg" weight="semibold">Dark Theme</Text>
//         <CodeBlock 
//           code={jsCodeSample.slice(0, 200)}
//           language="javascript"
//           theme="dark"
//           showLineNumbers={true}
//         />
//       </div>
      
//       <div>
//         <Text size="lg" weight="semibold">System Theme (follows system preference)</Text>
//         <CodeBlock 
//           code={jsCodeSample.slice(0, 200)}
//           language="javascript"
//           theme="system"
//           showLineNumbers={true}
//         />
//       </div>
//     </div>
//   ),
// };

// /**
//  * CodeBlock with max height and scrolling
//  */
// export const WithMaxHeight: CodeBlockStory = {
//   args: {
//     code: jsCodeSample.repeat(2), // Repeat to make it longer
//     language: "javascript",
//     maxHeight: "200px",
//     showLineNumbers: true,
//   },
// };

// /**
//  * CodeBlock with wrapping disabled
//  */
// export const NoWrapCodeBlock: CodeBlockStory = {
//   args: {
//     code: `const reallyLongLineOfCodeThatWillOverflowIfNotWrappedProperlyAndRequireHorizontalScrollingToSeeTheEntireContentBecauseItIsSoIncrediblyLongThatItCannotPossiblyFitOnASingleLineEvenOnALargeMonitor = true;

// const normalLine = "This is a normal line of code that will not overflow.";`,
//     language: "javascript",
//     wrap: false,
//     showLineNumbers: true,
//   },
// };

// /**
//  * CodeBlock without syntax highlighting
//  */
// export const NoHighlight: CodeBlockStory = {
//   args: {
//     code: jsCodeSample.slice(0, 100),
//     language: "javascript",
//     highlight: false,
//     showLineNumbers: true,
//   },
// };
