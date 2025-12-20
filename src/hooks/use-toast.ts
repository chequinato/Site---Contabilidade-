
type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastProps) => {
      console.log(
        `[TOAST ${variant ?? "default"}]`,
        title,
        description
      );
    },
  };
}
