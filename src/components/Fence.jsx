import { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

export function Fence({ children, language }) {
  const isDiff = language?.startsWith('diff')
  let highlightStyle = []
  let code = children.trimEnd()
  if (isDiff) {
    code = []
    language = language.substr(4)
    highlightStyle = children.split('\n').map((line) => {
      code.push(line)
      if (line.startsWith('+')) {
        return 'inserted'
      }
      if (line.startsWith('-')) {
        return 'deleted'
      }
      return "normal"
    })
    code = code.join('\n')
  }

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className} style={style}>
          <code>
            {tokens.map((line, index) => {
              if (isDiff) {
                return (
                  <Fragment key={index}>
                  {line.map((token, i) => (
                    <span key={i} {...getTokenProps({ token })} className={highlightStyle[index]}/>
                  ))}
                  {line[0].content !== '\n' && '\n'}
                  </Fragment>
                )
              } else return (
                <Fragment key={index}>
                  {line.map((token, index) => (
                    <span key={index} {...getTokenProps({ token })} />
                  ))}
                  {line[0].content !== '\n' && '\n'}
                </Fragment>
              )
            })}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
