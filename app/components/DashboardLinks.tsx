

import Link from "next/link"

const links = [
    {
        name: "Sales Records",
        href: "/dashboard",
    },
    {
        name: "Transactions",
        href: "/dashboard/transactions"
    },
    {
        name: "Products",
        href: "/dashboard/products"
    }
]
export default function DashboardLinks() {
  return (
    <>
        {links.map((link)=>(
            <Link key={link.href} href={link.href}>{link.name}</Link>
        ))}
    </>
  )
}
