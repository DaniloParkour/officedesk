import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-12 items-center justify-center">
      <h1 className="text-2xl font-bold">Officedesk</h1>
      
      <Link href="/dashboard">Dashboard</Link>
    </main>
  )
}
