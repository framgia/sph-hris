import { NextApiRequest } from 'next'

export async function getServerSideProps({
  req
}: {
  req: NextApiRequest
}): Promise<{ props: { cookies: string | null } }> {
  const cookies = req.cookies['next-auth.session-token'] ?? null

  return { props: { cookies } }
}
