export function Wide({ css, width, children }) {
  return (
    <>
    <div
      style={{width: "100vw", position: "relative", left: "calc(-50vw + 50%)"}}
      className={`hidden sm:block ${css}`}
    >
      <div style={{width: width+"vw", position: "relative", left: "calc(-"+width/2+"vw + 50%)"}}>
        {children}
      </div>
    </div>
    <div className={`block sm:hidden`}>
      {children}
    </div>
    </>
  )
}
