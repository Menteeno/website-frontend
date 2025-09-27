import {
  BrainIcon,
  ChartColumnBigIcon,
  CompassIcon,
  HandshakeIcon,
  HeadsetIcon,
  MessagesSquareIcon,
  SwordsIcon,
} from "lucide-react";
import { Highlighter } from "../magicui/highlighter";
import { MagicCard } from "../magicui/magic-card";
import { Card, CardContent } from "../ui/card";

const HeroProblem = () => {
  return (
    <div className="min-h-screen flex gap-8 flex-col items-center justify-center max-w-7xl mx-auto">
      <h2 className="mt-4 font-bold text-xl text-center sm:text-3xl md:text-4xl leading-relaxed">
        یک باگ ساده در کد، با یک کامیت فیکس می‌شه.{" "}
        <Highlighter action="box" color="oklch(55.2% 0.016 285.938)">
          <span>یک باگ در ارتباط چطور؟</span>
        </Highlighter>{" "}
      </h2>
      <div className="relative px-4 z-10 col-span-7 text-center lg:text-start">
        <dl className="mt-10 grid grid-cols-12 w-full gap-4 items-stretch text-lg text-foreground/80">
          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <MessagesSquareIcon className="size-8 text-primary" />
                  </div>
                  <dt className="font-semibold text-2xl text-foreground">
                    منتورشیپ:
                  </dt>
                </div>
                <dd className="ps-1">
                  سه جلسه منتورشیپ خصوصی با متخصص‌های کار درست
                </dd>
              </CardContent>
            </MagicCard>
          </Card>

          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <CompassIcon className="size-8 text-primary" />
                  </div>
                  <dt className="font-semibold text-2xl text-foreground">
                    یادگیری:
                  </dt>
                </div>
                <dd className="ps-1">برنامه‌ی یادگیری کاملاً شخصی‌سازی‌شده</dd>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-4 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <HandshakeIcon className="size-8 text-primary" />
                  </div>
                  <dt className="font-semibold text-2xl text-foreground">
                    تمرین:
                  </dt>
                </div>
                <dd className="ps-1">
                  تمرین مهارت‌های تیمی، رهبری و شبکه‌سازی
                </dd>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-4 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <HeadsetIcon className="size-8 text-primary" />
                  </div>
                  <dt className="font-semibold text-2xl text-foreground">
                    پشتیبانی:
                  </dt>
                </div>
                <dd className="ps-1">پشتیبانی اختصاصی در طول مسیر رشد</dd>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-4 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <BrainIcon className="size-8 text-primary" />
                  </div>
                  <dt className="font-semibold text-2xl text-foreground">
                    بازخورد:
                  </dt>
                </div>
                <dd className="ps-1">
                  بازخورد واقعی از منتورها، مربی‌ها و تیم پشتیبان
                </dd>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <ChartColumnBigIcon className="size-8 text-primary" />
                  </div>
                  <dt className="font-semibold text-2xl text-foreground">
                    ارزیابی:
                  </dt>
                </div>
                <dd className="ps-1">
                  سنجش و ارزیابی پیشرفت با آزمون‌های طراحی‌شده
                </dd>
              </CardContent>
            </MagicCard>
          </Card>
          <Card className="p-0 col-span-6 shadow-none border-none">
            <MagicCard
              gradientColor="oklch(72.3% 0.219 149.579 / .15)"
              className="p-0 h-full"
              gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
              gradientTo="oklch(72.3% 0.219 149.579 / .4)"
            >
              <CardContent className="p-4">
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="absolute end-0 top-0 size-12 bg-primary/15 rounded-full p-2">
                    <SwordsIcon className="size-8 text-primary" />
                  </div>
                  <dt className="font-semibold text-2xl text-foreground">
                    چالش :
                  </dt>
                </div>
                <dd className="ps-1">
                  چالش‌های واقعی و تمرین‌های عملی در فضای شبیه‌سازی‌شده
                </dd>
              </CardContent>
            </MagicCard>
          </Card>
        </dl>
      </div>
    </div>
  );
};

export default HeroProblem;
