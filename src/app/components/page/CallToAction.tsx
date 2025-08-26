import Button from "./Button";

export default function CallToAction() {
  const externalLink = "https://form.jotform.com/251168329147157";

  return (
    <div className="w-full sm:w-xl lg:w-3xl">
      <h3 className="font-syncopate font-[500] text-accent-1 text-2xl lg:text-3xl">
        Have a unique vision?
      </h3>
      <p className="font-syncopate font-[400] text-base lg:text-lg">
        We&apos;d love to hear what you have in mind. Whether it&apos;s a
        specific concept or just a rough idea, this short form helps us
        understand your goals, timeline, and budget. Once submitted, we&apos;ll
        review your details and get back to you with a tailored proposal.
      </p>
      <div className="flex flex-col justify-center items-start md:items-center">
        <a href={externalLink} target="_blank" rel="noopener noreferrer">
          <Button
            type="button"
            className="bg-accent-1 before:bg-accent-1-hover rounded-full mt-3"
          >
            <span className="font-medium font-poppins text-accent-2">
              Get your quote now
            </span>
          </Button>
        </a>
      </div>
    </div>
  );
}
