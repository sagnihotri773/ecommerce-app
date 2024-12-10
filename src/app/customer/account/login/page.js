import Img from "@/assets/Images/loginImg.jpg";
import CopyRight from "@/components/Common/Footer/copyRight";
import { StoreLogo } from "@/components/Common/StoreLogo/StoreLogo";
import LoginForm from "@/components/Util/Form/LoginForm";
export async function generateMetadata() {
  return {
    title: "Login",
    
  };
}
export default function Login() {
  return (
    <div>
      <section className="md:h-screen md:py-36 flex items-center bg-orange-500/10 dark:bg-orange-500/20 justify-center">
        <div className="container relative xl:px-52 p-3">
          <div className="grid grid-cols-1">
            <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
              <div className="grid md:grid-cols-2 grid-cols-1 items-center xl:min-h-[760px]">
                <div className="relative md:shrink-0 h-full">
                  <img
                    className="lg:h-full h-full w-full object-cover"
                    src={Img.src}
                    alt=""
                  />
                </div>
                <div className="p-8 lg:px-20 xl:min-h-[760px]">
                  <div className="text-center">
                    <StoreLogo />
                  </div>
                  <LoginForm />

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
