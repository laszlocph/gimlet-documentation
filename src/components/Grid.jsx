export function Grid({children}) {
    return (
      <div className="sm:grid sm:grid-cols-11 sm:gap-x-12 sm:gap-y-4 sm:text-sm">
        {children}
      </div>
    )
}
