
export function Event({ name, image, link, date, children }) {
    return (
      <div className="mt-32">
        <h2 className="mt-8 mb-2">{name}</h2>
        <p className="text-sm">{date}</p>
        {image &&
        <img src={image} className="h-96"/>
        }
        <div className="prose mt-2.5 text-gray-600 dark:text-gray-300">
          {children}
        </div>
        {link &&
        <a href={link}>Learn more</a>
        }
      </div>
    )
}
