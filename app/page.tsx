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
