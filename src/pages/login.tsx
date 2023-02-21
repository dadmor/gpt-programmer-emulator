
import { useRouter } from "next/router";
//@ts-ignore
export default function Login({id}) {
  const router = useRouter();

  //
  return (
    <div
      className="text-blue p-3 underline cursor-pointer"
      onClick={() =>
        router.push(
          `https://github.com/login/oauth/authorize?scope=user:email&client_id=${id}`
        )
      }
    >
      Login to github as: {id}
    </div>
  );

}
/* @ts-ignore */
export async function getServerSideProps() {
  return { props: { id: process.env.GITHUB_ID }}
}
