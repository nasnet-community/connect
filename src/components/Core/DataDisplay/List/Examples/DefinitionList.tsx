import { component$ } from "@builder.io/qwik";
import {
  DefinitionList,
  ListTerm,
  ListDescription,
} from "~/components/Core/DataDisplay/List";

export const DefinitionListExample = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Basic Definition List</h3>
        <DefinitionList>
          <ListTerm>Qwik</ListTerm>
          <ListDescription>
            A resumable web framework for building instant web applications.
          </ListDescription>

          <ListTerm>Resumability</ListTerm>
          <ListDescription>
            The ability to continue execution from where the server left off,
            without having to restart the application on the client.
          </ListDescription>

          <ListTerm>Component$</ListTerm>
          <ListDescription>
            A Qwik component with the $ suffix indicating it creates a
            lazy-loading boundary.
          </ListDescription>
        </DefinitionList>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Styled Definition List</h3>
        <DefinitionList class="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
          <ListTerm class="font-medium text-primary-600 dark:text-primary-400">
            TypeScript
          </ListTerm>
          <ListDescription class="mb-4 border-l-2 border-gray-300 pl-4 dark:border-gray-600">
            A strongly typed programming language that builds on JavaScript,
            adding static type definitions.
          </ListDescription>

          <ListTerm class="font-medium text-primary-600 dark:text-primary-400">
            JSX
          </ListTerm>
          <ListDescription class="mb-4 border-l-2 border-gray-300 pl-4 dark:border-gray-600">
            A syntax extension for JavaScript that resembles HTML and is used
            with React and other frameworks.
          </ListDescription>

          <ListTerm class="font-medium text-primary-600 dark:text-primary-400">
            TailwindCSS
          </ListTerm>
          <ListDescription class="border-l-2 border-gray-300 pl-4 dark:border-gray-600">
            A utility-first CSS framework for rapidly building custom user
            interfaces.
          </ListDescription>
        </DefinitionList>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Multiple Descriptions Per Term</h3>
        <DefinitionList>
          <ListTerm>Web Development</ListTerm>
          <ListDescription>
            Frontend development using frameworks like Qwik, React, Vue, etc.
          </ListDescription>
          <ListDescription>
            Backend development using Node.js, Python, Ruby, etc.
          </ListDescription>
          <ListDescription>
            Full-stack development combining both frontend and backend skills.
          </ListDescription>

          <ListTerm>UI/UX Design</ListTerm>
          <ListDescription>
            Creating user interfaces that are intuitive and easy to use.
          </ListDescription>
          <ListDescription>
            Designing user experiences that delight and engage users.
          </ListDescription>
        </DefinitionList>
      </div>
    </div>
  );
});
