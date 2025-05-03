export default function CallToAction() {
  const externalLink = "https://form.jotform.com/251168329147157";

  return (
    <section className="w-[94%] mx-auto">
      <div className="w-full sm:w-md lg:w-xl">
        <div>
          <h3 className="font-poppins font-[500] text-accent-1 text-2xl lg:text-3xl mb-1">
            Have a unique vision?
          </h3>
          <p className="font-raleway font-[400] text-base lg:text-lg">
            We&apos;d love to hear what you have in mind. Whether it&apos;s a
            specific concept or just a rough idea, this short form helps us
            understand your goals, timeline, and budget. Once submitted,
            we&apos;ll review your details and get back to you with a tailored
            proposal.
          </p>
          <a href={externalLink} target="_blank" rel="noopener noreferrer">
            <button className="cta bg-accent-1 text-white rounded-full font-poppins hover:cursor-pointer overflow-hidden py-2 px-3 mt-3 relative">
              <span className="z-[2] relative">
                Let&apos;s Build Your Vision in 3D
              </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
