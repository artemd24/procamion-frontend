import {
  AboutVideo,
  EcologyCare,
  Features,
  Footer,
  Header,
  MainSection,
  ProcessSteps,
  QuestionsForm,
  Tagline,
  UserRoles
} from '@/widgets/layout'

import classes from './Landing.module.scss'

export const LandingPage = () => {
  return (
    <div className={classes.landing}>
      <Header isLanding />

      <main>
        <MainSection />
        <Features />
        <ProcessSteps />
        <UserRoles />
        <QuestionsForm />
        <AboutVideo />
        <EcologyCare />
        <Tagline />
      </main>

      <Footer isLanding />
    </div>
  )
}
