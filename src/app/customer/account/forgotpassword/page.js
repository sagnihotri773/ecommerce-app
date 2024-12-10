import forgotPassword from "@/assets/Images/forgot_password.jpg";
import Image from "next/image";
import { homeUrl } from "@/components/RouteManager";
import CopyRight from "@/components/Common/Footer/copyRight";
import { StoreLogo } from "@/components/Common/StoreLogo/StoreLogo";
import { ForgotPasswordForm } from "@/components/Util/Form/forgotPasswordForm";
export async function generateMetadata({ params }) {
  return {
    title: "Forgot Your Password?",
  };
}
export default function ForgotPassword() {
  return (
    <section className="md:h-screen md:py-36 flex items-center bg-orange-500/10 dark:bg-orange-500/20 justify-center">
      <div className="container relative xl:px-52 p-3">
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center">
              <div className="relative md:shrink-0">
                <Image
                  className="lg:h-full h-full w-full object-cover md:h-[34rem]"
                  src={forgotPassword}
                  alt=""
                  priority={true}
                />
              </div>
              <div className="p-8 lg:px-20">
                <div className="text-center">
                  <a href={homeUrl}>
                    <StoreLogo />
                  </a>
                </div>
                <ForgotPasswordForm />
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
