import Link from "next/link";
export default function Home() {
  return (
    <div className="mt-5">
      <>
        <h1 className="text-center">
          Welcome, please log in or sign up to continue.
        </h1>
        <div className="flex justify-center mt-5">
          <Link href="/login" className="mr-5">
            Login
          </Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </>
    </div>
  );
}
