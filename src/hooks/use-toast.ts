import { toast as sonnerToast } from "sonner"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: {
    label: string
    onClick: () => void
  }
}

export function useToast() {
  const toast = ({ title, description, variant, action }: ToastProps) => {
    const message = title || description || "Notification"
    
    const options = {
      description: title ? description : undefined,
      action: action
        ? {
            label: action.label,
            onClick: action.onClick,
          }
        : undefined,
    }

    if (variant === "destructive") {
      sonnerToast.error(message, options)
    } else {
      sonnerToast.success(message, options)
    }
  }

  return { toast }
}
