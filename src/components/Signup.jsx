import Script from 'next/script'

export function Signup({ id }) {
    return (
      <Script 
      data-uid={id}
      src="https://deft-producer-8360.ck.page/af751ce151/index.js"
      strategy="afterInteractive"
      onLoad={()=>{
        const form = document.getElementsByTagName("form")[0];
        form.style.margin = "0px auto 50px auto"
      }}
    />
    )
}
