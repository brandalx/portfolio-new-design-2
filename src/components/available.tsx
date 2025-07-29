import { Card, CardHeader, CardTitle } from "./ui/card";
import { ContactForm } from "./contact-form";

export default function Available() {
  return (
    <div>
      <ContactForm>
        <div className="flex items-center justify-center border w-fit p-2 rounded-full  px-3 hover:bg-black/5 dark:hover:bg-white/10 gap-x-2 my-2 cursor-pointer ">
          {" "}
          <div className="flex justify-center  text-xs">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
            </span>
          </div>
          <div className=" glor-l text-xs">Available for work!</div>
        </div>
      </ContactForm>
    </div>
  );
}
