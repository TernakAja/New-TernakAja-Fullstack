export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-1">Manage farm preferences and user accounts.</p>
      </div>

      <div className="rounded-xl border border-border  bg-white dark:bg-[#111111] overflow-hidden shadow-sm w-full">
        <div className="p-6 border-b border-border ">
          <h2 className="text-lg font-semibold text-black dark:text-white">Profile Information</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Configure your personal and farm details.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Farm Name</label>
            <div className="md:col-span-3">
              <input 
                type="text" 
                defaultValue="TernakAja Demonstration Farm" 
                className="w-full rounded-md border border-border  bg-card-950 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 dark:focus:ring-accent-green/30"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="md:col-span-3">
              <input 
                type="email" 
                defaultValue="admin@ternakaja.example.com" 
                className="w-full rounded-md border border-border  bg-card-950 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 dark:focus:ring-accent-green/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Alert Thresholds</label>
            <div className="md:col-span-3">
              <select className="w-full rounded-md border border-border  bg-card-950 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 dark:focus:ring-accent-green/30">
                <option>Standard (Recommended)</option>
                <option>High Sensitivity</option>
                <option>Low Sensitivity</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mt-2">Adjust how quickly health warnings are dispatched.</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card border-t border-border  flex justify-end">
          <button className="bg-accent-green hover:bg-accent-green/90 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
