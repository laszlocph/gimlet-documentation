
export function Post({ name, image, link, children, date }) {
    return (
      <div className="mt-16">
        <h2 className="mt-8 mb-2">{name}</h2>
        <p className="text-sm">{date}</p>
        {image &&
        <img src={image} className="h-96 object-cover w-full"/>
        }
        <div className="prose mt-2.5 text-gray-600 dark:text-gray-300">
          {children}
        </div>
        <a href={link}>Continue reading</a>
      </div>
    )
}
