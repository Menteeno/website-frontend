import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import {
  BrainIcon,
  ChartColumnBigIcon,
  CompassIcon,
  HandshakeIcon,
  HeadsetIcon,
  MessagesSquareIcon,
  SwordsIcon,
} from "lucide-react";
import { AuroraText } from "../magicui/aurora-text";
import { Highlighter } from "../magicui/highlighter";

const HeroIntroduce = () => {
  return (
    <div className="min-h-screen grid grid-cols-12 gap-8 flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
      <div dir="ltr" className="lg:flex-1 col-span-5">
        <Terminal className="transition-transform duration-1000 ease-in-out scale-120 hover:scale-100 rotate-x-[30deg] -rotate-y-[30deg] -rotate-z-[0deg] hover:rotate-x-0 hover:rotate-y-0  hover:-rotate-z-0">
          <TypingAnimation>
            &gt; sudo apt install menteeno-soft-skills
          </TypingAnimation>

          <AnimatedSpan className="text-green-500">
            <span>✔ Three private mentorship sessions with real experts.</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ A fully personalized learning plan.</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ Practice teamwork, leadership, and networking skills.</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ Dedicated support throughout your growth journey.</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ Real feedback from mentors and coaches.</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ Progress tracking through tailored evaluations.</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            <span>✔ Real-life challenges in a simulated environment.</span>
          </AnimatedSpan>

          <AnimatedSpan className="text-blue-500">
            <span>ℹ Updated ∞ skils:</span>
            <span className="pl-2">- etc/skills/soft-skills.conf</span>
          </AnimatedSpan>

          <TypingAnimation className="text-muted-foreground">
            Your growth journey started!
          </TypingAnimation>
        </Terminal>
      </div>
      <div className="relative px-4 z-10 max-w-2xl col-span-7 text-center lg:text-start">
        <p className="text-[17px] md:text-lg">
          باگ‌های کدت رو با{" "}
          <Highlighter action="highlight">
            <span className="text-black">Debugger</span>
          </Highlighter>{" "}
          حل می‌کنی، باگ‌های ارتباطات رو چطور؟
        </p>
        <h2 className="mt-4 font-bold text-xl sm:text-3xl md:text-4xl leading-relaxed">
          ما توی منتینو{" "}
          <AuroraText className="font-black">فضای آزمایش کردن</AuroraText> خودت
          رو برات فراهم کردیم!
        </h2>
        <dl className="mt-10 max-w-xl space-y-3 text-lg text-foreground/80 lg:max-w-none">
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <MessagesSquareIcon className="absolute top-1 start-1 size-6 text-primary" />
              منتورشیپ:
            </dt>
            <dd className="inline ps-1">
              سه جلسه منتورشیپ خصوصی با متخصص‌های کار درست
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <CompassIcon className="absolute top-1 start-1 size-6 text-primary" />
              یادگیری:
            </dt>
            <dd className="inline ps-1">
              برنامه‌ی یادگیری کاملاً شخصی‌سازی‌شده
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <HandshakeIcon className="absolute top-1 start-1 size-6 text-primary" />
              تمرین:
            </dt>
            <dd className="inline ps-1">
              تمرین مهارت‌های تیمی، رهبری و شبکه‌سازی
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <HeadsetIcon className="absolute top-1 start-1 size-6 text-primary" />
              پشتیبانی:
            </dt>
            <dd className="inline ps-1">پشتیبانی اختصاصی در طول مسیر رشد</dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <BrainIcon className="absolute top-1 start-1 size-6 text-primary" />
              بازخورد:
            </dt>
            <dd className="inline ps-1">
              بازخورد واقعی از منتورها، مربی‌ها و تیم پشتیبان
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <ChartColumnBigIcon className="absolute top-1 start-1 size-6 text-primary" />
              ارزیابی:
            </dt>
            <dd className="inline ps-1">
              سنجش و ارزیابی پیشرفت با آزمون‌های طراحی‌شده
            </dd>
          </div>
          <div className="relative ps-9">
            <dt className="inline font-semibold text-foreground">
              <SwordsIcon className="absolute top-1 start-1 size-6 text-primary" />
              چالش :
            </dt>
            <dd className="inline ps-1">
              چالش‌های واقعی و تمرین‌های عملی در فضای شبیه‌سازی‌شده
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default HeroIntroduce;
