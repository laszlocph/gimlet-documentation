export function Box({css, children}) {

  return (
    <div className={`${css}`}>
      {children}
    </div>
  )
}
