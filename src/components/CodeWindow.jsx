import { Fragment, useState } from 'react'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

export function CodeWindow({ className, tabs, code, language, lineNumbers = true, unemphasized }) {
  const [currentTab, setCurrentTab] = useState(tabs ? tabs[0].name : undefined)

  const currentCode = tabs ? tabs.find(t => t.name === currentTab).code : code

  return (
    <div
      className={clsx(
        'relative overflow-hidden shadow-xl flex bg-slate-800 h-[31.625rem] max-h-[60vh] sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10',
        className
      )}
    >
      <div className="relative w-full flex flex-col">
        <div className={clsx('flex-none', !tabs && 'border-b border-slate-500/30')}>
          <div className="flex items-center h-8 space-x-1.5 px-3">
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
          </div>
        </div>
        <div className="relative flex-none min-w-full px-1">
          <ul className="flex text-sm leading-6 text-slate-400">
            {tabs && tabs.map((tab) => {
              const isActive = tab.name === currentTab
              return (
                <li key={tab.name} className="flex-none">
                  <button
                    type="button"
                    className={`relative py-2 px-3 ${isActive ? 'text-sky-300 cursor-default' : 'text-slate-300 cursor-pointer'}`}
                    onClick={() => setCurrentTab(tab.name)}
                  >
                    {tab.name}
                    {isActive && (
                      <span className="absolute z-10 bottom-0 inset-x-3 h-px bg-sky-300" />
                    )}
                  </button>
                </li>
              )
            }
            )}
          </ul>
          <div className="absolute bottom-0 inset-x-0 h-px bg-slate-500/30" />
        </div>
        <div className={`relative min-h-0 flex-auto flex flex-col overflow-auto ${unemphasized ? 'opacity-75' : ''}`}>
          <div className="pl-4">
            <div className="mt-6 flex items-start px-1 text-sm">
              {/* line numbers */}
              {lineNumbers &&
                <div
                  aria-hidden="true"
                  className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                >
                  {Array.from({
                    length: currentCode.split('\n').length,
                  }).map((_, index) => (
                    <Fragment key={index}>
                      {(index + 1).toString().padStart(2, '0')}
                      <br />
                    </Fragment>
                  ))}
                </div>
              }
              {/* code content */}
              <Highlight
                {...defaultProps}
                code={currentCode}
                language={language}
                theme={undefined}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={clsx(
                      className,
                      'flex overflow-x-auto pb-6'
                    )}
                    style={style}
                  >
                    <code className="px-4">
                      {tokens.map((line, index) => (
                        <div key={index} {...lineProps(getLineProps({ line }), line, language)}>
                          {line.map((token, index) => (
                            <span
                              key={index}
                              {...getTokenProps({ token })}
                            />
                          ))}
                        </div>
                      ))}
                    </code>
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function lineProps(lineProps, line, language) {
  if (language !== 'custom-diff') {
    return lineProps
  }
  if (line.length > 0 && line[0].content) {
    if (line[0].content.startsWith('+ ')) {
      lineProps.className = "token-line-added"
    }
    if (line[0].content.startsWith('- ')) {
      lineProps.className = "token-line-deleted"
    }
  }
  return lineProps
}