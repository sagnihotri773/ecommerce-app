import signUpImage from "@/assets/Images/signup.jpg";
import Image from "next/image";
import dynamic from "next/dynamic";
import { StoreLogo } from "@/components/Common/StoreLogo/StoreLogo";
const CopyRight = dynamic(
  () => import("@/components/Common/Footer/copyRight"),
  { ssr: false }
);
const RegisterForm = dynamic(
  () => import("@/components/Util/Form/RegisterForm"),
  { ssr: false }
);

export async function generateMetadata({ params }) {
  return {
    title: "Create New Customer Account",
  };
}


export default function page() {
  return (
    <section className="min-h-screen  flex items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800">
      <div className="container relative xl:px-52 p-3">
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center xl:min-h-[760px]">
              <div className="relative md:shrink-0 h-full">
                <Image
                  className="h-full w-full object-cover "
                  src={signUpImage}
                  alt=""
                  priority={true}
                />
              </div>
              <div className="p-8 lg:px-20 xl:min-h-[760px]">
                <div className="text-center min-h-[80px]">
                  {StoreLogo ? (
                    <StoreLogo />
                  ) : (
                    <div className="h-[80px] w-[80px] mx-auto"></div>
                  )}
                </div>
                <RegisterForm />
                <div className="text-center">
                  <CopyRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
