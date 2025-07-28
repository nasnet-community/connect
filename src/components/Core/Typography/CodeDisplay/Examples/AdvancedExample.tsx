import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";
import { Text } from "../../Text";
import { Heading } from "../../Heading";

/**
 * Advanced Example - Demonstrates enhanced CodeDisplay features
 */
export const AdvancedExample = component$(() => {
  const complexCode = `import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import { type DocumentProps } from "./types";

export const DocumentViewer = component$<DocumentProps>(({
  data,
  theme = "auto",
  responsive = true,
  touchOptimized = false
}) => {
  const isLoading = useSignal(false);
  const currentTheme = useSignal(theme);
  
  const processedData = useComputed$(() => {
    return data.map(item => ({
      ...item,
      formatted: item.content.replace(/\\n/g, '<br>'),
      timestamp: new Date(item.date).toLocaleDateString()
    }));
  });

  return (
    <div class="document-viewer">
      {processedData.value.map((doc) => (
        <article key={doc.id} class="document-item">
          <header class="document-header">
            <h2>{doc.title}</h2>
            <time datetime={doc.date}>{doc.timestamp}</time>
          </header>
          <div dangerouslySetInnerHTML={doc.formatted} />
        </article>
      ))}
    </div>
  );
});`;

  return (
    <div class="space-y-12 p-6 bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT rounded-lg">
      {/* Header */}
      <div class="space-y-4">
        <Heading level={1} color="primary">
          Enhanced CodeDisplay Features
        </Heading>
        
        <Text variant="paragraph" color="secondary" size="lg">
          Explore the advanced capabilities of our enhanced CodeDisplay components, featuring 
          improved theming, touch optimization, accessibility, and responsive design.
        </Text>
      </div>

      {/* Enhanced Theming */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Enhanced Theme System</Heading>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="info">Light Theme</Text>
            <CodeBlock
              code={`console.log("Light theme example");
const theme = "light";
const colors = {
  background: "#ffffff",
  text: "#1f2937"
};`}
              language="javascript"
              theme="light"
              size="sm"
              borderRadius="lg"
            />
          </div>
          
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="warning">Dark Theme</Text>
            <CodeBlock
              code={`console.log("Dark theme example");
const theme = "dark";
const colors = {
  background: "#0f172a",
  text: "#f8fafc"
};`}
              language="javascript"
              theme="dark"
              size="sm"
              borderRadius="lg"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <Text variant="label" weight="semibold" color="error">Dim Theme (New)</Text>
          <CodeBlock
            code={`// New dim theme for reduced eye strain
const dimTheme = {
  background: "#1a202c",
  text: "#e2e8f0",
  accent: "#4299e1"
};

export const DimModeComponent = () => {
  return <div className="dim-theme">Content with reduced contrast</div>;
};`}
            language="typescript"
            theme="dim"
            size="base"
            borderRadius="lg"
            showLineNumbers
          />
        </div>
      </section>

      {/* Size Variants */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Size Variants</Heading>
        
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="space-y-2">
              <Text variant="label" weight="semibold" color="info">Extra Small</Text>
              <CodeBlock
                code={`const xs = "tiny";`}
                language="javascript"
                size="xs"
                copyButton={false}
                showLineNumbers={false}
              />
            </div>
            
            <div class="space-y-2">
              <Text variant="label" weight="semibold" color="success">Small</Text>
              <CodeBlock
                code={`const small = "compact";`}
                language="javascript"
                size="sm"
                copyButton={false}
                showLineNumbers={false}
              />
            </div>
            
            <div class="space-y-2">
              <Text variant="label" weight="semibold" color="warning">Large</Text>
              <CodeBlock
                code={`const large = "spacious";`}
                language="javascript"
                size="lg"
                copyButton={false}
                showLineNumbers={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Touch Optimization */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Touch & Mobile Optimization</Heading>
        
        <div class="space-y-4">
          <Text variant="label" weight="semibold" color="warning">Touch-Optimized Code Block</Text>
          <CodeBlock
            code={`// Touch-optimized code block
// Larger touch targets and improved scrolling
export const MobileCodeEditor = ({ code }) => {
  return (
    <pre className="touch-friendly">
      <code>{code}</code>
    </pre>
  );
};`}
            language="typescript"
            touchOptimized={true}
            mobileScrolling={true}
            size="base"
            borderRadius="lg"
            showLineNumbers
          />
          
          <div class="flex flex-wrap gap-4 mt-4">
            <Text variant="body" color="secondary">
              Touch-optimized inline code: <InlineCode touchOptimized={true} size="base">touchEvent.target</InlineCode>
            </Text>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Accessibility Enhancements</Heading>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="info">High Contrast Mode</Text>
            <CodeBlock
              code={`// High contrast accessibility
const a11y = {
  contrast: "high",
  colors: {
    text: "#000000",
    background: "#ffffff"
  }
};

console.log("Accessible code display");`}
              language="javascript"
              highContrast={true}
              size="sm"
              borderRadius="md"
            />
            
            <Text variant="body" color="secondary">
              Inline high contrast: <InlineCode highContrast={true}>accessibleCode()</InlineCode>
            </Text>
          </div>
          
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="success">Reduced Motion</Text>
            <CodeBlock
              code={`// Respects motion preferences
const animation = {
  duration: user.prefersReducedMotion ? 0 : 300,
  easing: "ease-out"
};

// No animations for sensitive users`}
              language="javascript"
              reduceMotion={true}
              size="sm"
              borderRadius="md"
            />
          </div>
        </div>
      </section>

      {/* RTL Support */}
      <section class="space-y-6">
        <Heading level={2} color="accent">RTL & Internationalization</Heading>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="info">RTL Code Direction</Text>
            <CodeBlock
              code={`// دعم الاتجاه من اليمين إلى اليسار
const arabicText = "مرحبا بالعالم";
const direction = "rtl";

console.log(arabicText);
// النتيجة: مرحبا بالعالم`}
              language="javascript"
              direction="rtl"
              size="sm"
              borderRadius="md"
            />
          </div>
          
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="warning">Logical Properties</Text>
            <Text variant="body" color="secondary">
              RTL inline code: <InlineCode direction="rtl">console.log("RTL")</InlineCode>
            </Text>
            <Text variant="body" color="secondary">
              LTR inline code: <InlineCode direction="ltr">console.log("LTR")</InlineCode>
            </Text>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Advanced Features</Heading>
        
        <div class="space-y-6">
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="info">Container Responsive</Text>
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 resize overflow-auto">
              <CodeBlock
                code={`// Container-responsive code block
const responsive = {
  container: "auto",
  breakpoints: ["sm", "md", "lg"]
};`}
                language="javascript"
                containerResponsive={true}
                size="base"
                borderRadius="md"
              />
            </div>
            <Text variant="caption" color="tertiary">
              Try resizing the container above to see responsive behavior
            </Text>
          </div>
          
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="warning">Print Optimization</Text>
            <CodeBlock
              code={`// Print-optimized code
const printStyles = {
  colors: "monochrome",
  background: "white",
  text: "black"
};

console.log("Print-friendly code");`}
              language="javascript"
              printOptimized={true}
              size="sm"
              borderRadius="md"
            />
            <Text variant="caption" color="tertiary">
              Use your browser's print preview to see print-optimized styling
            </Text>
          </div>
        </div>
      </section>

      {/* Complex Example */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Complex Code Example</Heading>
        
        <div class="space-y-4">
          <Text variant="label" weight="semibold" color="success">Full-Featured Code Block</Text>
          <CodeBlock
            code={complexCode}
            language="typescript"
            theme="auto"
            size="base"
            showLineNumbers={true}
            borderRadius="lg"
            touchOptimized={false}
            mobileScrolling={true}
            title="DocumentViewer.tsx"
            caption="A complete Qwik component demonstrating advanced patterns"
            maxHeight="400px"
          />
        </div>
      </section>

      {/* Best Practices */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Best Practices</Heading>
        
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-6">
          <div class="space-y-4">
            <Text variant="label" weight="semibold" color="info" size="lg">
              💡 Enhanced CodeDisplay Guidelines
            </Text>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <Text variant="label" weight="semibold" color="success">✓ Do</Text>
                <ul class="space-y-2 text-sm">
                  <li>• Use <InlineCode>theme="auto"</InlineCode> for system preference detection</li>
                  <li>• Enable <InlineCode>touchOptimized</InlineCode> for mobile interfaces</li>
                  <li>• Set <InlineCode>highContrast</InlineCode> for accessibility compliance</li>
                  <li>• Use appropriate <InlineCode>size</InlineCode> variants for context</li>
                  <li>• Enable <InlineCode>mobileScrolling</InlineCode> for long code blocks</li>
                </ul>
              </div>
              
              <div class="space-y-3">
                <Text variant="label" weight="semibold" color="error">✗ Don't</Text>
                <ul class="space-y-2 text-sm">
                  <li>• Override theme preferences unnecessarily</li>
                  <li>• Disable copy buttons without good reason</li>
                  <li>• Use very large sizes for inline code</li>
                  <li>• Ignore RTL support for international apps</li>
                  <li>• Forget print optimization for documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default AdvancedExample;