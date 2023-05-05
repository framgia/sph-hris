import { NextApiRequest } from 'next'

export async function getServerSideProps({
  req
}: {
  req: NextApiRequest
}): Promise<{ props: { cookies: string | null } }> {
  const cookies =
    req.cookies[
      `${process.env.NEXT_PUBLIC_SECURE_SITE === 'true' ? '__Secure-' : ''}next-auth.session-token`
    ] ?? null

  return { props: { cookies } }
}
