import { Hero } from '@/components/Hero'
import { YamlAuthoring } from '@/components/home/YamlAuthoring'
import { Configuration } from './home/Configuration'
import { Gitops } from './home/Gitops'
import { ClickOps } from './home/ClickOps'
import { AppPlatform } from './home/AppPlatform'
import { Footer } from './home/Footer'
import { TheProblem } from './home/TheProblem'
import Script from 'next/script'


export function EventsPage({ className, tabs, code, language }) {
  return (
    <>
      <div className="max-w-4xl mx-auto relative">
        <h1>Gimlet Events</h1>
        <div>
          <img src="/logo-social.png" width="600px"/>
          <p>In our first meetup, we introduced everyone to Acorn, a new, open-source application packaging and deployment framework for Kubernetes</p>
          <p>This month, we’ll be demonstrating how to use Acorn in CI/CD workflows. By attending the meetup you will learn:</p>
          <ul className="list-disc">
            <li>How Acorn works with GitHub actions</li>
            <li>How to run integration tests using Acorn in CI</li>
            <li>How Acorn works with GitOps tools like Flux and Argo</li>
          </ul>
          <p>This event will be a meetup, which means we are looking forward to hearing your questions, answering them as best we can and speaking technically about Acorn.  We’re scheduled for 90 minutes, but we will be sticking around until all questions have been answered.</p>
          <p>
            Details
            Date: Wednesday, September 14th, 2022
            Time: 10:00 am US Pacific Time
            Hosts: Shannon Williams and Darren Shepherd

            If you have any questions, please email events@acorn.io.
          </p>
        </div>
        
        <Script 
          data-uid="af751ce151"
          src="https://deft-producer-8360.ck.page/af751ce151/index.js"
          strategy="afterInteractive"
          onLoad={()=>{
            const form = document.getElementsByTagName("form")[0];
            form.style.margin = "100px auto 100px auto"
          }}
        />
      </div>
    </>
  )
}