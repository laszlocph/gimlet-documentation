export function Deploy() {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-slate-800"
      >
        <img
          className="h-5 w-auto" src="logo.svg" alt="Deploy"/>
        <span
          className="bg-gradient-to-r from-orange-400 from-0% via-pink-400 via-40% to-pink-500 to-90% text-transparent bg-clip-text">
          Deploy
        </span>
      </button>
    )
}
