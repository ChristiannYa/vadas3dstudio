import { contactInfo } from "@/lib/constants/contact";

export default function GetInTouchSection() {
  return (
    <section className="container-1000">
      <div className="flex flex-col justify-center items-center">
        <h1 className="section-title__mb text-center">Get in Touch</h1>
        <div className="get-in-touch__banners flex flex-col gap-y-5">
          {contactInfo.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col items-center justify-center gap-y-2"
            >
              <div className="get-in-touch__btn flex items-center gap-x-2">
                <div className="bg-black dark:bg-white rounded-full p-1.5 inline-block">
                  <contact.icon className="w-3 md:w-5 h-3 md:h-5" />
                </div>
                <p className="font-poppins">{contact.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
