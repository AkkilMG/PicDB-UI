
"use client";
import dynamic from "next/dynamic";

import Image from 'next/image';
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import uploadAniData from "@/assets/upload.json";
import SigninForm from "@/components/auth/signin-form";


export default function SignInPage() {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="absolute top-5 left-5">
              <div className="flex items-center gap-2">
                <div className="-mt-4 ml-3 flex items-center">
                  <Image src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-left mb-6">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Let's not keep the login box waiting—your details, please!</p>
              </div>

              <SigninForm />

              <div className="mt-8 text-justify text-sm text-muted-foreground">
                <p>
                  Welcome to PicDB Admin Panel! Managing admin side of picdb.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:flex-1 bg-gradient-to-br from-blue-400 to-blue-600">
          <div className="h-full w-full flex items-center justify-center p-8">
            <div className="relative w-120 h-120">
            <div className="w-120 h-120" draggable={false}> {/* Adjust size as needed */}
                <Lottie animationData={uploadAniData} loop autoplay/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
