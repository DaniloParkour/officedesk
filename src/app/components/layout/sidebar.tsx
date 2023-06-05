import { IconCalculator, IconDashboard, IconListCheck, IconWriting, IconNotes, IconClock2 } from "@tabler/icons-react"
import Link from "next/link";

export default function Sidebar() {
  return(
    <div>
      <aside className="bg-cyan-900 text-cyan-50 min-h-screen pt-8">

      <Link href="/" className="hover:text-yellow-200">
        <IconDashboard size={48} className="mx-auto"/>
      </Link>

        <ul className="flex flex-col p-6 gap-8">
          <li className=" hover:text-yellow-200"> <Link href="/calculator" className="flex gap-2"> <IconCalculator /> Calculator </Link></li>
          <li className="hover:text-yellow-200"> <Link href="/tasks" className="flex gap-2"> <IconListCheck /> Tasks </Link> </li>
          <li className="hover:text-yellow-200"> <Link href="/draw" className="flex gap-2"> <IconWriting /> Draw </Link> </li>
          <li className="hover:text-yellow-200"> <Link href="/notepad" className="flex gap-2"> <IconNotes /> Notepad </Link> </li>
          <li className="hover:text-yellow-200"> <Link href="/timer" className="flex gap-2"> <IconClock2 /> Timer </Link> </li>
        </ul>

      </aside>
    </div>
  );
}
