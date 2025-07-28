import { component$, $ } from "@builder.io/qwik";
import { ToastContainer } from "~/components/Core/Feedback/Toast/ToastContainer";
import { useToast } from "~/components/Core/Feedback/Toast/useToast";

export const InteractiveToast = component$(() => {
  const toast = useToast();

  const showActionToast = $(() => {
    toast.show({
      status: "info",
      title: "New feature available",
      message: "Try out our new dashboard experience",
      actionLabel: "Try it now",
      onAction$: $((id) => {
        toast.dismiss(id);
        toast.success("Welcome to the new dashboard!", {
          title: "Feature Activated",
        });
      }),
      duration: 8000,
    });
  });

  const showPersistentToast = $(() => {
    toast.show({
      status: "warning",
      title: "Session expiring soon",
      message: "Your session will expire in 5 minutes",
      persistent: true,
      actionLabel: "Extend session",
      onAction$: $((id) => {
        toast.dismiss(id);
        toast.success("Session extended by 1 hour", {
          title: "Session Extended",
        });
      }),
    });
  });

  const showLoadingToast = $(async () => {
    const loadingId: string = await toast.loading(
      "Processing your request...",
      {
        title: "Loading",
      },
    );

    // After 3 seconds, update the loading toast to a success toast
    setTimeout(() => {
      toast.update(loadingId, {
        status: "success",
        loading: false,
        title: "Completed",
        message: "Request processed successfully!",
        persistent: false,
        duration: 3000,
      });
    }, 3000);
  });

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        <button
          onClick$={showActionToast}
          class="rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
        >
          Toast with Action
        </button>

        <button
          onClick$={showPersistentToast}
          class="rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
        >
          Persistent Toast
        </button>

        <button
          onClick$={showLoadingToast}
          class="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
        >
          Loading → Success
        </button>
      </div>

      <ToastContainer position="bottom-right" limit={5} />
    </div>
  );
});
