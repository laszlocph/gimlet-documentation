export function SideBySide({css, children}) {
    return (
      <div className={`sm:flex gap-x-16 ${css}`}>
        {children}
      </div>
    )
}
