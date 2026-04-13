import { Plus } from "lucide-react"

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-border bg-card text-card-foreground shadow-sm dark:shadow-none min-h-[300px]">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-6">
        {icon || <Plus size={24} />}
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
        {description}
      </p>
      
      {actionLabel && (
        <button 
          onClick={onAction}
          className="px-4 py-2 font-medium text-sm rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-gray-200 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
