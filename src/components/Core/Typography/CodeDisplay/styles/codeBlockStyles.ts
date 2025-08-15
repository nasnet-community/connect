export const highlightStyles = `
  /* Light theme styles */
  .hljs-light {
    color: #383a42;
    background: #fafafa;
  }
  .hljs-light .hljs-comment,
  .hljs-light .hljs-quote {
    color: #a0a1a7;
    font-style: italic;
  }
  .hljs-light .hljs-doctag,
  .hljs-light .hljs-keyword,
  .hljs-light .hljs-formula {
    color: #a626a4;
  }
  .hljs-light .hljs-section,
  .hljs-light .hljs-name,
  .hljs-light .hljs-selector-tag,
  .hljs-light .hljs-deletion,
  .hljs-light .hljs-subst {
    color: #e45649;
  }
  .hljs-light .hljs-literal {
    color: #0184bb;
  }
  .hljs-light .hljs-string,
  .hljs-light .hljs-regexp,
  .hljs-light .hljs-addition,
  .hljs-light .hljs-attribute,
  .hljs-light .hljs-meta .hljs-string {
    color: #50a14f;
  }
  .hljs-light .hljs-attr,
  .hljs-light .hljs-variable,
  .hljs-light .hljs-template-variable,
  .hljs-light .hljs-type,
  .hljs-light .hljs-selector-class,
  .hljs-light .hljs-selector-attr,
  .hljs-light .hljs-selector-pseudo,
  .hljs-light .hljs-number {
    color: #986801;
  }
  .hljs-light .hljs-symbol,
  .hljs-light .hljs-bullet,
  .hljs-light .hljs-link,
  .hljs-light .hljs-meta,
  .hljs-light .hljs-selector-id,
  .hljs-light .hljs-title {
    color: #4078f2;
  }
  .hljs-light .hljs-built_in,
  .hljs-light .hljs-class .hljs-title,
  .hljs-light .hljs-title.class_ {
    color: #c18401;
  }
  .hljs-light .hljs-emphasis {
    font-style: italic;
  }
  .hljs-light .hljs-strong {
    font-weight: bold;
  }

  /* Dark theme styles - Modern slate-based with yellow/blue accents */
  .hljs-dark {
    color: #e2e8f0;
    background: transparent;
  }
  .hljs-dark .hljs-comment,
  .hljs-dark .hljs-quote {
    color: #64748b;
    font-style: italic;
  }
  .hljs-dark .hljs-doctag,
  .hljs-dark .hljs-keyword,
  .hljs-dark .hljs-formula {
    color: #a78bfa;
    font-weight: 500;
  }
  .hljs-dark .hljs-section,
  .hljs-dark .hljs-name,
  .hljs-dark .hljs-selector-tag,
  .hljs-dark .hljs-deletion,
  .hljs-dark .hljs-subst {
    color: #f87171;
  }
  .hljs-dark .hljs-literal {
    color: #60a5fa;
  }
  .hljs-dark .hljs-string,
  .hljs-dark .hljs-regexp,
  .hljs-dark .hljs-addition,
  .hljs-dark .hljs-attribute,
  .hljs-dark .hljs-meta .hljs-string {
    color: #34d399;
  }
  .hljs-dark .hljs-attr,
  .hljs-dark .hljs-variable,
  .hljs-dark .hljs-template-variable,
  .hljs-dark .hljs-type,
  .hljs-dark .hljs-selector-class,
  .hljs-dark .hljs-selector-attr,
  .hljs-dark .hljs-selector-pseudo,
  .hljs-dark .hljs-number {
    color: #fbbf24;
  }
  .hljs-dark .hljs-symbol,
  .hljs-dark .hljs-bullet,
  .hljs-dark .hljs-link,
  .hljs-dark .hljs-meta,
  .hljs-dark .hljs-selector-id,
  .hljs-dark .hljs-title {
    color: #60a5fa;
  }
  .hljs-dark .hljs-built_in,
  .hljs-dark .hljs-class .hljs-title,
  .hljs-dark .hljs-title.class_ {
    color: #fbbf24;
  }
  .hljs-dark .hljs-emphasis {
    font-style: italic;
  }
  .hljs-dark .hljs-strong {
    font-weight: bold;
  }

  /* Line highlights */
  .hljs-line-highlight {
    background-color: rgba(255, 255, 100, 0.2);
    margin: 0 -1rem;
    padding: 0 1rem;
    display: block;
  }
  .hljs-dark .hljs-line-highlight {
    background-color: rgba(250, 204, 21, 0.15);
    border-left: 3px solid #fbbf24;
    padding-left: calc(1rem - 3px);
  }

  /* Line numbers */
  .hljs-line-numbers {
    counter-reset: line;
    padding-left: 3rem !important;
  }
  .hljs-line-numbers .hljs-ln {
    position: relative;
    display: block;
  }
  .hljs-line-numbers .hljs-ln::before {
    content: counter(line);
    counter-increment: line;
    position: absolute;
    left: -2.5rem;
    width: 2rem;
    color: #888;
    text-align: right;
    font-size: 0.8rem;
    padding-top: 0.1rem;
  }
  .hljs-dark .hljs-line-numbers .hljs-ln::before {
    color: #475569;
  }

  /* Copy button animations */
  .copy-button {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .code-block-container:hover .copy-button {
    opacity: 1;
  }
  .copy-success {
    animation: fade-out 1.5s ease forwards;
  }
  @keyframes fade-out {
    0% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
