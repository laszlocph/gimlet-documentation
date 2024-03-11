export function Dropdown() {
  return (
    <div className="group relative dropdown cursor-pointer">
      <a className="flex items-center text-center gap-1 text-zinc-900 dark:text-white font-bold rounded">
        Use cases
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-3 h-3 group-hover:-rotate-180 transition-all duration-300 ease-in-out">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </a>
      <div className="group-hover:block -my-2 dropdown-menu absolute hidden h-auto -right-1/2 p-6 rounded-3xl backdrop-blur-3xl bg-white/30 dark:bg-zinc-900/30 ring-1 ring-white/10" id="headlessui-popover-panel-:r1h:" tabIndex="-1" data-headlessui-state="open">
        <ul className="divide-y divide-zinc-100 top-0 w-48 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
          <li><a className="block py-2 hover:text-zinc-300 bg-[radial-gradient(ellipse_at_center_200px,_var(--tw-gradient-stops))] hover:from-white/10 rounded-md" data-headlessui-state="open" href="/frontend">Frontend</a></li>
          <li><a className="block py-2 hover:text-zinc-300 bg-[radial-gradient(ellipse_at_center_200px,_var(--tw-gradient-stops))] hover:from-white/10 rounded-md" data-headlessui-state="open" href="/backend">Backend</a></li>
          <li><a className="block py-2 hover:text-zinc-300 bg-[radial-gradient(ellipse_at_center_200px,_var(--tw-gradient-stops))] hover:from-white/10 rounded-md" data-headlessui-state="open" href="/ai-deployment">AI Deployment</a></li>
        </ul>
      </div>
    </div>
  )
}
