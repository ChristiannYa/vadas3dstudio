import { servicesList } from "@/app/constants/services";

export default function Services() {
  return (
    <section className="container-1600">
      <h1 className="section-title__mb">Services</h1>
      <div className="flex flex-wrap gap-x-4 gap-y-5">
        {servicesList.map((service, index) => (
          <div key={index} className="w-full md:w-[calc(50%-0.5rem)] space-y-2">
            <div>
              <h2 className="font-montserrat-alternates font-[400] text-2xl lg:text-3xl text-start uppercase">
                {service.category.map((part, i) =>
                  part.highlight ? (
                    <span key={i} className="text-accent-1">
                      {part.text}
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </h2>
              <p className="font-raleway font-[300] text-xl lg:text-2xl text-start opacity-90">
                {service.description}
              </p>
            </div>
            <ul className="space-y-1 border-l border-accent-1 px-2">
              {service.items.map((item) => (
                <li key={item.title}>
                  <h3 className="font-raleway font-[400] text-accent-1 text-xl lg:text-2xl text-start">
                    {item.title}
                  </h3>
                  <p className="font-raleway font-[300]">{item.description}</p>
                  {item.details && (
                    <ul className="font-raleway">
                      {item.details.map((detail) => (
                        <li key={detail} className="font-[200] opacity-80">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
