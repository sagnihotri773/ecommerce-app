import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

export const ShareProduct = () => {
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

  return (
    <div className="flex justify-start items-center container pb-8">
      <div className={`flex gap-6 items-center group-hover:block bg-white z-10 flex w-[200px] h-[64px] justify-evenly`} >
        <p className="font-bold text-xl">Share:</p>
        <WhatsappShareButton
          url={url}
          title={"WhatsApp"}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
};
