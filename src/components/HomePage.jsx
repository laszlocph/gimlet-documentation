import { Hero } from '@/components/Hero'
import { YamlAuthoring } from '@/components/home/YamlAuthoring'
import { Configuration } from './home/Configuration'
import { Gitops } from './home/Gitops'
import { ClickOps } from './home/ClickOps'
import { AppPlatform } from './home/AppPlatform'
import { Footer } from './home/Footer'
import { TheProblem } from './home/TheProblem'

export function HomePage({ className, tabs, code, language }) {
  return (
    <>
      <Hero />
      <TheProblem />
      <YamlAuthoring />
      <Configuration />
      <Gitops />
      <ClickOps />
      <AppPlatform />
      <Footer />
    </>
  )
}