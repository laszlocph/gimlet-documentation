
export function Event({ name, image, link, children }) {
    return (
      <div>
        <h3>{name}</h3>
        <img src={image} className="h-96"/>
        <div className="prose mt-2.5 text-gray-600 dark:text-gray-300">
          {children}
        </div>
        <a href={link}>Learn more</a>
      </div>
    )
}
