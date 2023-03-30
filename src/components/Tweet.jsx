export function Tweet({link}) {
  return (
    <>
      <blockquote className="twitter-tweet">
        <a href={link} />
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js"></script>
    </>
  )
}
