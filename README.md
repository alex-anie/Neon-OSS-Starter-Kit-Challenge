# Create a Sales Dashboard with Neon, Prisma, Kinde-Auth, Next.js, and Tailwindcss.

In today's fast-paced business environment, real-time data access is crucial for making informed decisions. But building robust, scalable, and efficient applications can be challenging, especially when managing your database. That's where Neon comes in.

Neon is a serverless Postgres built for the cloud. It’s a dataset platform for developers looking to build reliable and scalable applications faster. 

Neon’s auto-scaling feature ensures that your application database adapts seamlessly to varying workloads. Whether you’re handling a surge of datasets or building a solo project, Neon Optimizes resources automatically eliminating the need for manual intervention. 

Additionally, with Neon branching you can work with your data the same way you work with code, by creating isolated copies of your data called “branches” and using them as part of your workflow. The Neon branching uses copy on the right where each branch instantly has both the schema and data with no data being duplicated letting you build unique data across all branches.

Neon is built to integrate with Next.js, Remit, Astro, Django, Elixir, Go, Java, Laravel, Python, and Rails. etc. 

In this tutorial, we’ll walk through the process of creating a dynamic sales dashboard, alongside, Prisma for ORM, Kinde Auth for authentication, Next.js for full-stack framework, and Tailwindcss for sleek styling.

By the end, you’ll have a robust, real-world application that showcases the power of modern web application with Neon at the heart of data management.

## Prerequisites

To follow along, you’ll need a basic knowledge of the following:

- Next.js
- Prisma
- Tailwindcss
- Auth (Kinde Auth)

## Projects Overview

Here is the complete preview of what will be built. the product is a lengthy one and can be group into mainly three sections

1. The Next.js App (Sales dashboard)

![Overview.gif](screenshots/Overview.gif)

1. Authentication with Kinde 

![how to sign in.gif](screenshots/how_to_sign_in.gif)

1. Neon Database integration

![prisma studio.gif](screenshots/prisma_studio.gif)

![neon overview.gif](screenshots/neon_overview.gif)

## Folder Structure

Here is the file structure of the said finished project.

```bash
        📂app
                📂api
                 📂auth
                         📂[kinde-Auth]  
                                 ├──route.js
                             📂creation 
                                 ├──route.js
              📂components
                      ├──DashboardLinks.tsx
                📂dashboard
                     📂products
                            ├──page.tsx
                        📂transactions
                            ├──page.tsx
                    ├──layout.tsx
                    ├──page.tsx
            ├──favicon.tsx
            ├──global.tsx
            ├──layout.tsx
            ├──page.tsx
    📂components
         📂ui
                ├──avatar.tsx
                ├──button.tsx
                ├──card.tsx
                ├──dropdown-menu.tsx
                ├──sheet.tsx
                ├──table.tsx
    📂lib
            ├──db.ts
            ├──utils.tsx
    📂prisma
            ├──schema.prisma
    📂public
            📂images
                    ├──logo.png	
    ├──.env
    ├──.env.local
    ├──.gitignore
    ├──components.json
```

## Project Setup ([Next.js](https://nextjs.org/docs/getting-started/installation))

To get started, create a folder called *dashboard-app* and open it with the Windows Terminal. Copy the code CLI below, paste it on the terminal, and hit enter.  

```bash
npx create-next-app@latest
```

Next, select the following options on the Terminal as indicated below

- √ What is your project named? 👉 amastore (you can choose any name you like)
- √ Would you like to use TypeScript? 👉 Yes
- √ Would you like to use ESLint? 👉 Yes
- √ Would you like to use Tailwind CSS? 👉 Yes
- √ Would you like to use `src/` directory? 👉 No
- √ Would you like to use App Router? (recommended) 👉 Yes
- √ Would you like to customize the default import alias (@/*)?*  👉 *Yes*
- *√ What import alias would you like configured?  @/ [press the enter key to choose]*

Next.js will automatically install and generate a boilerplate. 

![image.png](screenshots/image.png)

Next, type `cd amastore` (or the name of your project) on the Terminal to navigate to the project directory. Once you’ve done that, type `code .` to open the folder on VS Code.

![image.png](screenshots/image1.png)

Your folder structure should look the same as the one above. 

- Next, press `ctrl + J` to open your VS Code Terminal.
- Type `npm run dev` on the VS code Terminal and press enter. This will setup the next.js local server
- Copy the path on the Terminal, in this case, our path is  `http://localhost:3001`.

Depending on your local setup, you might have a `port` of `300`.  paste it on the browser address and press enter

![image.png](screenshots/image2.png)

In this project, we are running on *next.js 14.2.7*. Your browser preview should look like the one above or similar. 

Next, let’s clear our starter files and prepare our app for development. 

## Next.js setup

To kick start our next.js application, click on the `app` folder, and select the `page.tsx` file. 

Select and delete the JSX template code and write a simple hello world text. 

```jsx
├── app/page.tsx

export default function Home() {
  return (
   <>
          👉 <p>Hello World</p>
   </>
  );
}

```

Next, click on the `globla.css` file, and delete all the CSS styles leaving only the tailwindCSS directives as indicated below

```css
├── app/global.css

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Next, click on the `layout.tsx` file and update the metadata as follows: 

```jsx
├── app/layout.tsx
... // some code above 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 👉 title: "Amastore",
 👉 description: "Welcome to Amastore",
};

... // some code below
```

Next, delete the `favicon.ico` image on the app folder and replace it with the Amastore[ comeback] logo. Now save your files and preview your changes on the browser.

![image.png](screenshots/image3.png)

Congratulations 🎉. You now have your Next.js app set up. Now let’s get started developing our dashboard.

## Create a Navbar

We’ll begin our dashboard by creating a navbar component for navigation. 

- Create two folders `‘app/components’` and `‘app/dashboard’` inside the app folder.
- Select the `components` folder and create a file `‘app/components/DashboardLinks.tsx’` and type the code below.

```jsx
├── app/components/DashboardLinks.tsx

import Link from "next/link"

const links = [
    {
        name: "Sales Records",
        href: "/salesrecords",
    },
    {
        name: "Transactions",
        href: "transactions"
    },
    {
        name: "Products",
        href: "products"
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

```

- Next, select the `dashboard` folder and create two files respectively. `‘app/dashboard/page.tsx’` and `‘app/dashboard/layout.tsx’`.
- Select the `layout.tsx` file and type the code below.

```jsx
├── app/dashboard/layout.tsx

import Image from "next/image";
import DashboardLinks from "../components/DashboardLinks";
import Link from "next/link";

export default function DashboardLayout() {
  return (
    <>
        <main className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b">
                <nav className="flex gap-4">
                    <Link href="/dashboard" className="flex gap-2 select-none font-extrabold">
                        <Image width={20} height={20} src="/images/logo.png" alt="Amastore logo" />
                        <p>Amastore</p>
                    </Link>

                    <div className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <DashboardLinks />
                    </div>
                </nav>
            </header>
        </main>
    </>
  )
}

```

- Next, select the `page.tsx` file and type the code below.

```jsx
├── app/dashboard/page.tsx

export default function Dashboard() {
  return (
    <div>Dashboard page</div>
  )
}
```

Save the changes and preview it on your browser. Your navbar should look just like this.

![image.png](screenshots/image4.png)

Now that we have our navbar setup, there are still some features missing, when we shrink the browser to a mobile-size screen, notice the navlinks are hidden. 

![shrink navbar.gif](screenshots/shrink_navbar.gif)

We want to be able to toggle open the same navbar link on mobile using the hamburger icon. This will improve the navbar responsiveness and user experience. 

To implement this feature, we’ll need a <Sheet> component from [shadcn](https://ui.shadcn.com/docs/components/dropdown-menu) to provide a functional side-navbar for mobile navigation.  

- Click `ctrl + J` to open the VS code Terminal and click on the little `+` icon, on the top right corner and add a new Terminal.
- Copy and paste the code below and hit enter.

```jsx
npx shadcn-ui@latest init
```

Select the prompt from the terminal as follows;

- √ Which style would you like to use? 👉 Default
- √ Which color would you like to use as the base color? 👉 Slate
- √ Would you like to use CSS variables for colors? 👉  yes

Next, click enter to install the shadcn dependencies. After the complete installation of schadcn you should see the following folders and files on your VS Code and `package.json` file.

- c**omponents.json:** A file where all the settings of the installed schadcn are stored
- c**omponents: A folder where all imported components from schadcn will be saved.**
- **lucide-react**: An icons library similar to font-awesome.
- **clsx:** utility for constructing className strings conditionally
- class-variance-authority:
- tailwind-merge: Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.
- tailwindcss-animate: A Tailwind CSS plugin for creating beautiful animations

Next, let’s add the Sheet component to our project. Still on the Terminal type hit enter and install the sheet component.

```bash
npx shadcn-ui@latest add sheet
```

After that, install the following components from shadcn one after the other

```bash
👉 npx shadcn-ui@latest add dropdown-menu

👉 npx shadcn-ui@latest add button

👉 npx shadcn-ui@latest add avatar

👉 npx shadcn-ui@latest add card

👉 npx shadcn-ui@latest add table
```

You can find more on shadcn docs here 👉  [https://ui.shadcn.com/docs/components/sheet](https://ui.shadcn.com/docs/components/sheet) 

Next, click on the `dashboard/layout.tsx` file and type the code below.

```jsx
├── app/dashboard/layout.tsx

import Image from "next/image";
import DashboardLinks from "../components/DashboardLinks";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout() {
  return (
    <>
      <main className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-8">
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="shrink-0 md:hidden"
                variant="outline"
                size="icon"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                <DashboardLinks />
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="flex gap-4">// ... some code exists here</nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </main>
    </>
  );
}
```

Make sure the components are properly imported from  `/components/ui/*` and the icons from `lucide-react` then save your file.

From your browser preview, we have three main changes 

- one is the user icon that toggles when click on
- the sidebar with the hamburger icon
- the logo positioning at the middle and hidden navlinks

![side nav toggle.gif](screenshots/side_nav_toggle.gif)

Now we have a nice-looking 😄 navbar. Thanks to shadcn.

# The Sales Records Page

For the Sales Records page, navigate to dashboard/page.tsx and type the code below.

```jsx
├── app/dashboard/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react"
export default function Dashboard() {
  return (
    <>
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">$100.00</p>
                <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Total Sales</CardTitle>
                <ShoppingBag className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">+50</p>
                <p className="text-xs text-muted-foreground">Total Sales on Alexstore</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Total Products</CardTitle>
                <PartyPopper className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">37</p>
                <p className="text-xs text-muted-foreground">Total Product Created</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Total Users</CardTitle>
                <User2 className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">120</p>
                <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
            </CardContent>
        </Card>
    </div>

    <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                    Recent transactions from your store
                </CardDescription>
            </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="test-sm font-medium">Alex Anie</p>
                        <p className="text-sm text-muted-foreground">test@test.com</p>
                    </div>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="test-sm font-medium">Alex Anie</p>
                        <p className="text-sm text-muted-foreground">test@test.com</p>
                    </div>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="test-sm font-medium">Alex Anie</p>
                        <p className="text-sm text-muted-foreground">test@test.com</p>
                    </div>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="test-sm font-medium">Alex Anie</p>
                        <p className="text-sm text-muted-foreground">test@test.com</p>
                    </div>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>
            </CardContent>
        </Card>
    </div>
    </>
  )
}

```

Next, navigate to `dashboard/layout.tsx` and make the following chages to the `layout.tsx` file. This will enable the `page.tsx` to render on the browser. The `layout.tsx` in this case servers as the root file in the dashboard folder. 

```jsx
├── app/dashboard/layout.tsx

// ... some imported code above
👉 import { ReactNode } from "react";

👉 export default function DashboardLayout({children}:{children : ReactNode}) {
  return (
    <>
        <main className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-8">
            // ... some code here 
            <DropdownMenu>
                // ... some code here
            </DropdownMenu>
            </header>
       👉   <div className="my-5">{children}</div>
        </main>
    </>
  )
}

```

Save your changes. Your code should look like this when you preview it on the browser.

![image.png](screenshots/image5.png)

Now let’s create the transactions page.

## The Transactions Page

inside the dashboard folder, create a folder and a file as `'dashboard/transtions/page.tsx'` and then type the code below

```jsx
├── app/dashboard/transitions/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Transactions() {
  return (
    <Card>
        <CardHeader className="px-7">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent Orders from your stores!</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p className="font-medium">Alex Anie</p>
                            <p className="hidden md:flex text-sm text-muted-foreground">test@test.com</p>
                        </TableCell>
                        <TableCell>Sale</TableCell>
                        <TableCell>Successfull</TableCell>
                        <TableCell>2024-06-15</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)
}
```

Click the transactions page to preview your changes on the browser. Your transactions page should look like this below.

![transaction page.gif](screenshots/transaction_page.gif)

## The Transactions Page

inside the dashboard folder, create a folder and a file as `'dashboard/transactions/page.tsx'` and then type the code below

```jsx
├── app/dashboard/products/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Transactions() {
  return (
    <Card>
        <CardHeader className="px-7">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent Orders from your stores!</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p className="font-medium">Alex Anie</p>
                            <p className="hidden md:flex text-sm text-muted-foreground">test@test.com</p>
                        </TableCell>
                        <TableCell>Sale</TableCell>
                        <TableCell>Successfull</TableCell>
                        <TableCell>2024-06-15</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)
}
```

Click the products page to preview your changes on the browser. Your products page should look like this below.

![products page.gif](screenshots/products_page.gif)

We have completed the frontend part of our project, now let’s authenticate using [Kinde Auth](https://app.kinde.com/auth/cx/_:nav&m:register&psid:66d18862f9214035bc4bf35f1ecd49bf) this will enable us to log in as an admin and prevent unauthorized users from logging into our app. 

## Integrating authentication with kinde Auth

To get started, sign in to [Kinde auth](https://app.kinde.com/auth/cx/_:nav&m:register&psid:66d18862f9214035bc4bf35f1ecd49bf) using Gmail, GitHub or Email. I already have an account in this, so I will login. 

![kinde singin.png](screenshots/kinde_singin.png)

This will open up a dashboard, select “business” and click “Switch business”.

![switch besiness.png](screenshots/switch_besiness.png)

Next, click on the add business button. This will enable us to create a project.

![add bussiness.png](screenshots/add_bussiness.png)

From the dialog box below, fill in the following information.

![image.png](screenshots/image6.png)

In this example, I use amastore as the business name and amastore as the kinde-domain. Number of employees is set to 1-10. Click save to update changes.

![amastore link.png](screenshots/amastore_link.png)

Click the amastore.kinde.com link on the card.  From the start guide below select “use kinde with my existing code base” and click next. 

![image.png](screenshots/image7.png)

Select Next.js as the preferred framework and click Next.

![image.png](screenshots/image8.png)

From the page below, choose how you want users to sign in by selecting the platform of your choice. I selected Email, Gmail, and GitHub. This will enable users to sign in with the selected option. Once that has been done, click next.

![how to sign in.gif](screenshots/how_to_sign_in1.gif)

From the dialog box below, click “No thanks, I’ll explore my own pace”.

![no thanks.png](screenshots/no_thanks.png)

From our kinde dashboard below, notice we have 0 monthly active users and total users. 

![Zore monthly users.png](screenshots/Zore_monthly_users.png)

Next, click on the “Docs” button to visit the official docs. Here you can see instructions on how to fully connect kinde with Next.js. Under “all SDKs” select “Next.js”.

![all sdk.png](screenshots/all_sdk.png)

Now go to the docs and copy the cli tool for Next,js App Router SDK for existing project and paste it on the VS Code Terminal click enter to install.

![install auth-next.png](screenshots/install_auth-next.png)

```bash
npm i @kinde-oss/kinde-auth-nextjs
```

Next, go back to your Kinde dashboard and click view details. Here we can set our callback URLs

![view details card.png](screenshots/view_details_card.png)

Next, change the port number to 3001, but if your running on 3000 then leave it as it is. Once you have it updated, scroll to the bottom of the page and click save.

![update port.png](screenshots/update_port.png)

Next, go back to the docs and scroll to where you see “Configure environment variables” copy the code below

```json
├── app/.env.local

KINDE_CLIENT_ID=<your_kinde_client_id>
KINDE_CLIENT_SECRET=<your_kinde_client_secret>
KINDE_ISSUER_URL=https://<your_kinde_subdomain>.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

Replace the information in the example with your own information. You might also set different URLs depending on where your project is running. They need to match the callback URLs you entered in Kinde, above.

- Next, go to VS code and create a `.env.local` file, and paste the above code in the file.
- Next, go to your Kinde dashboard and copy your *Domain, Client ID*, and *Client secret***.**

![client domain secrete.png](screenshots/client_domain_secrete.png)

- ****Update it as indicated below

![update env.png](screenshots/update_env.png)

- Add the `.env.local` to `.gitignore` file. this will prevent it from being pushed to github.
- Next, setup Kinde Auth Route Handlers. Open your VS Code, in the app folder, create the a folder and a `route.ts` file as `app/api/auth/[kindeAuth]/route.js` Inside the file `route.js` put this code:

```jsx
├── app/api/auth/[kindeAuth]/route.js

import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();
```

Next, lets setup our kinde backend with the frontend. This will enable us to redirect the users to login. Here we want to make the dashboard to be accessible to the admin user. 

## Enabling Api Routes with Kinde

Now navigate to the `dashboard/layout.tsx` and type the code below 

```jsx
├── app/dashboard/layout.js

// ... some code above

👉 import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
👉 import { redirect } from "next/navigation"
👉 import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardLayout({children}:{children : ReactNode}) {
👉    const {getUser} = getKindeServerSession()
👉    const user = await getUser();

👉    if(!user || user.email !== "ocxigin@gmail.com"){
        return redirect("/")
    }
  return (
    <>
        <main className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-8">
           // ... some code here
                <DropdownMenuContent align="end">
                   // ... some code here
                    <DropdownMenuItem>
              👉        <LogoutLink>Logout</LogoutLink>
                    </DropdownMenuItem>
             // ... some code here
            <div className="my-5">{children}</div>
        </main>
    </>
  )
}

```

From the code above, we are checking User Authorization. If there is no user or if the user is not the same as the specified email, the user should be redirected to the home page. 

With the `LogoutLink` a component from the Kinde Auth library, the user is log out.

Next, navigate to the home page at `app/page.tsx` and type the code below

```jsx
├── app/page.tsx

import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div className="flex gap-4">
          <Button asChild>
            <LoginLink>Login</LoginLink>
          </Button>
          <Button>
            <RegisterLink>Sign Up</RegisterLink>
          </Button>
        </div>
      </div>
    </>
  );
}
```

Your home page should look like this on the browser.

![image.png](screenshots/image9.png)

if we click on the login button and try to login, the Kinde API route will redirect us back to the home page if the user is not authorized. 

![user not match.gif](screenshots/user_not_match.gif)

In the example above, the user email is alexanie.anie****@gmail.com which is not same with the original email set on the dashboard page.

 However, we try another example below using the right email. ocxigin@gmail.com

![user matched.gif](screenshots/user_matched.gif)

We were able to login into the dashboard for providing the right email.

## Connection with Neon

Neon is a serverless Postgres provider. We are going to be using Neon to store our user’s data so as to determine which users can have authorization to the dashboard information. 

So right here, head to [neon.tech](http://neon.tech) and click signup or signin if you already have an account.

![image.png](screenshots/image10.png)

You will be directed to the console where you’ll be require to created a project. So go ahead and create a project. In this example, we’ll name our project *amastore*.

![image.png](screenshots/image11.png)

Next, click Create Project. You should see “Your project is ready” text.

![image.png](screenshots/image12.png)

If you scroll down you will see options to integrate  your project with like Postgres, Next,js, Prisma, Node.js Django etc.

![choose prisma.png](screenshots/choose_prisma.png)

In this example, we are going to use Prisma for data validation with neon. So in your VS code Terminal type the code below.

```bash
npm i -D prisma
```

Once the above have been installed, go ahead and type the code below to install the prisma client.

```bash
npm i @prisma/client
```

Next, lets init prisma. Type the code below

```bash
npx prisma init
```

Once installed. you will see a display message on the terminal that says: *Your Prisma schema was created at prisma/schema.prisma You can now open it in your favorite editor.* 

Now go to the new prisma folder and open it. your generate text should look just like this 👇

```sql
├── prisma/schema.prisma

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

Here we have a prisma schema file, where we’ll also create our users models for the neon database

Next, create a `.env` file and copy and paste the code below if prisma did not auto-generate it for you.

```jsx
├── .env

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

> Note: Prisma integrate with `.env` not `env.local` that we used with Kinde-Auth, so make sure your prisma “DATABASE_URL” is save in .`env` file.

also: You already have a `.gitignore` file. Don't forget to add `.env` in it to not commit any private information.
> 

If you successfully have very thing setup. its times we connect it to the database. 

- Go back to the Neon database and select prisma.
- Select the .env tab
- click on show password
- then copy the `DATABSE_URL` string.
- replace the string in `.env` file with the newly copied `DATABASE_URL`

![prisma database_URL.png](screenshots/prisma_database_URL.png)

If you go to our Neon database and click on tables, you find we have no tables on the database. 

![no tables on the database.png](screenshots/no_tables_on_the_database.png)

Now, lets create our models for the database. Go to the `prisma/schema.prisma` and the code below. This will enable create a table  for our database.

```jsx
├── prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id String @id @unique
  email String
  firstName String
  lastName String
  profileImage String

  createdAt DateTime @default(now())
}

```

Next, type the code below to sync the above schema with Neon database

```jsx
npx prisma db push
```

Once this is successful you see a text on the Terminal *Your database is now in sync with your Prisma schema. Done in 10.15s.* 

Now go back to your database and refresh the table panel. Your should see your newly created table.

![Tables inseted.png](screenshots/Tables_inseted.png)

No rows for now. This will be solve as soon as we connect Kinde to the database. To do this, navigate to `app/api`folder and create a folder as `app/api/creation/route.ts`. This is a route handler where we’ll store the user in our database.

```jsx
├── app/api/creation/route.ts

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user === null || !user.id){
        throw new Error("Something went wrong...");
    }

    const dbUser = await prisma;
}
```

Next, create a new prisma instance. Go to the `lib` folder and create a file called `db.ts`

```jsx
├── app/lib/db.ts

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

To learn why this above solution is necessary, read the docs on 👉 [prisma best practices](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices). 

Next, set up our route handle 

```jsx
├── app/api/creation/route.ts

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user === null || !user.id){
        throw new Error("Something went wrong...");
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        }
    });

    if(!dbUser){
        dbUser = await prisma.user.create({
        data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            } 
        })
    }

    return NextResponse.redirect('http://localhost:3001/')
}
```

Next, update our `.env.local` file as follow. 

```jsx
//... some code above
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3001/api/auth/creation
```

Next, visit our app and click on navbar user icon. Click logout

![user logout.gif](screenshots/user_logout.gif)

Now let’s try to login again

- Click login
- then select login with google
- Next, type the  `http://localhost:3001/dashboard` and press enter to navigate to the dashboard

Once you successfully login to your dashboard, open your Terminal and type the following.

```jsx
npx prisma studio
```

This will lunch prisma studio client. Next click on the user to navigate you to the user’s data.

![prisma studio.gif](screenshots/prisma_studio.gif)

Once your user’s data have been successfully loaded on primsa studio. Next, go to the Neon dashboard click on table and refresh the browser to load the row and dataset.

![image.png](screenshots/image13.png)

*Congratulations* 🎉: you have successfully set up neon and Kinde-Auth. 

## Summary:

In the just concluded tutorial, we learnt how to create a sales dashboard with Neon, Prisma, Kinde-Auth, Next.js and Tailwindcss. 

Where we see how to setup a Next.js application and integrate it with a database (Neon) and Authenticate it. 

References: 

- [Neon](https://neon.tech/docs/introduction)
- [Kinds-Auth](https://docs.kinde.com/)
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Shadcn](https://ui.shadcn.com/)