import { MainLayout } from '../MainLayout'

type AboutProps = {
  description: string
}
export const About = ({ description }: AboutProps) => {
  return (
    <MainLayout>
      <h1>About</h1>
      <p>{description}</p>
    </MainLayout>
  )
}
