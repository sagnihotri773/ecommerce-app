import Img from "@/assets/Images/loginImg.jpg";
import Image from "next/image";
import CopyRight from "@/components/Common/Footer/copyRight";
import { SetNewPasswordForm } from "@/components/Util/Form/setNewPasswordForm";
import { StoreLogo } from "@/components/Common/StoreLogo/StoreLogo";
export async function generateMetadata({ params }) {
  return {
    title: "Create a New Password",
  };
}
export default function CreatePassword() {
 
  return (
    <div>
      <section className="md:h-screen md:py-36 flex items-center bg-orange-500/10 dark:bg-orange-500/20 justify-center">
        <div className="container relative xl:px-52 p-3">
          <div className="grid grid-cols-1">
            <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
              <div className="grid md:grid-cols-2 grid-cols-1 items-center lg:h-[768px]">
                <div className="relative md:shrink-0 h-full">
                  <Image
                    className="h-full w-full object-cover "
                    src={Img}
                    alt=""
                    priority={true} 
                  />
                </div>
                <div className="p-8 lg:px-20 lg:h-[768px]">
                  <div className="text-center">
                    <span>
                      <StoreLogo/>
                    </span>
                  </div>
                  <SetNewPasswordForm/>
                  <div className="text-center">
                    <CopyRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
