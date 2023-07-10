import { Hero } from '@/components/Hero'
import { YamlAuthoring } from '@/components/home/YamlAuthoring'
import { Configuration } from './home/Configuration'
import { Gitops } from './home/Gitops'
import { ClickOps } from './home/ClickOps'
import { AppPlatform } from './home/AppPlatform'
import { Footer } from './home/Footer'
import { Message } from './home/Message'
import { Integration } from './home/Integration'
import { Bring } from './home/Bring'
import { Shot } from './home/Shot'
import { CTA } from './home/CTA'

export function HomePage({ className, tabs, code, language }) {
  return (
    <>
      <Hero />
      <Message />
      <Shot />
      <Gitops />
      <ClickOps />
      <Integration />
      <Bring />
      <YamlAuthoring />
      <Configuration />
      <AppPlatform />
      <CTA />
      <Footer />
    </>
  )
}