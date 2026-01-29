import x21 from "./2-1.png";
import x41 from "./4-1.png";
import x51 from "./5-1.png";
import { Footer } from "./Footer";
import { Frame } from "./Frame";
import { FrameWrapper } from "./FrameWrapper";
import { Navbar } from "./Navbar";
import { Paragraph } from "./Paragraph";
import { SmartLivestock } from "./SmartLivestock";
import { WithAiAndIot } from "./WithAiAndIot";
import cow1 from "./cow-1.png";
import dashboardPympro1 from "./dashboard-pympro-1.png";
import livestockDetailsFs2Dhx1 from "./livestock-details-fs2dhx-1.png";
import pexelsPixabay4589911 from "./pexels-pixabay-458991-1.png";

export const HomePage = () => {
  return (
    <div className="bg-background w-full min-w-[1440px] min-h-[1024px] relative">
      <Footer />
      <div className="flex flex-col w-[1440px] h-[1024px] items-center absolute top-0 left-0">
        <div className="relative w-[1440px] h-[1024px]">
          <img
            className="absolute top-0 left-0 w-[1440px] h-[1021px] aspect-[1.41]"
            alt="Pexels pixabay"
            src={pexelsPixabay4589911}
          />

          <div className="bg-primary-95 absolute top-0 left-0 w-[1440px] h-[1024px]" />

          <img
            className="absolute top-[325px] left-[395px] w-[699px] h-[699px] aspect-[1]"
            alt="Cow"
            src={cow1}
          />

          <div className="flex flex-col items-center justify-between px-0 py-[124px] absolute top-0 left-0 w-[1440px] h-[1024px]">
            <SmartLivestock />
            <Paragraph />
            <WithAiAndIot />
          </div>
        </div>

        <div className="relative w-[1440px] h-[1024px] mb-[-1024.00px] bg-secondary">
          <div className="flex w-[1440px] h-[1024px] items-start justify-between px-[154px] py-[124px] relative">
            <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto] mb-[-13.00px]">
              <div className="inline-flex items-center justify-center gap-2.5 px-4 py-3 relative flex-[0_0_auto] bg-white rounded-[7px]">
                <div className="relative w-fit mt-[-1.00px] font-h3 font-[number:var(--h3-font-weight)] text-black text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] leading-[var(--h3-line-height)] whitespace-nowrap [font-style:var(--h3-font-style)]">
                  Our Product
                </div>
              </div>

              <div className="relative w-[569.42px] h-[714px]">
                <img
                  className="absolute top-[207px] left-0 w-[381px] h-[507px] aspect-[0.75]"
                  alt="Element"
                  src={x21}
                />

                <img
                  className="absolute top-0 left-[69px] w-[171px] h-[363px] aspect-[0.47]"
                  alt="Element"
                  src={x41}
                />

                <img
                  className="absolute top-[251px] left-[399px] w-[170px] h-[367px] aspect-[0.46]"
                  alt="Element"
                  src={x51}
                />
              </div>
            </div>

            <Frame />
          </div>
        </div>

        <div className="relative w-[1440px] h-[1024px] mb-[-2048.00px] bg-background">
          <div className="flex w-[1440px] h-[1024px] items-start justify-between px-[154px] py-[124px] relative">
            <FrameWrapper />
            <div className="inline-flex flex-col items-end gap-6 relative flex-[0_0_auto]">
              <div className="inline-flex items-center justify-end gap-2.5 px-4 py-3 relative flex-[0_0_auto] bg-secondary rounded-[7px]">
                <div className="relative w-fit mt-[-1.00px] font-h3 font-[number:var(--h3-font-weight)] text-black text-[length:var(--h3-font-size)] tracking-[var(--h3-letter-spacing)] leading-[var(--h3-line-height)] whitespace-nowrap [font-style:var(--h3-font-style)]">
                  Our System
                </div>
              </div>

              <div className="relative w-[576px] h-[692px]">
                <img
                  className="absolute top-0 left-0 w-[576px] h-[333px] aspect-[1.73] object-cover"
                  alt="Dashboard pympro"
                  src={dashboardPympro1}
                />

                <img
                  className="absolute top-[357px] left-0 w-[576px] h-[335px] aspect-[1.72] object-cover"
                  alt="Livestock details"
                  src={livestockDetailsFs2Dhx1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar
        className="!h-px !absolute !left-[calc(50.00%_-_512px)] !top-[72px]"
        frameClassName="!mt-[-37.50px] !mb-[-37.50px]"
        img="line-2-2.svg"
        line="line-1-2.svg"
      />
    </div>
  );
};