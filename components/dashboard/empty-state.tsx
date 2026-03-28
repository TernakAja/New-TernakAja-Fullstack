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
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111111] shadow-sm dark:shadow-none min-h-[300px]">
      <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-zinc-950 flex items-center justify-center text-gray-400 dark:text-zinc-600 mb-6">
        {icon || <Plus size={24} />}
      </div>
      
      <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
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