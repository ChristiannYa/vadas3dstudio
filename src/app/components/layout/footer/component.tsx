export default function Footer() {
  const externalLink = "https://christianwebdev.com/";

  const startYear = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pb-6">
      <div className="container-1600">
        <div className="font-montserrat-alternates flex justify-between items-center max-md:flex-col">
          <p className="text-center opacity-70">Terms & Conditions</p>
          <div className="md:gap-x-5 lg:gap-x-8 flex justify-center flex-wrap">
            <p>
              ©Copyright {startYear}{" "}
              {currentYear > startYear && ` - ${currentYear}`}
            </p>
            <p className="paragraph-lg">Vedas 3D Studio</p>
            <p className="paragraph-lg">All Rights Reserved</p>
          </div>
          <a href={externalLink} target="_blank" rel="noopener noreferrer">
            <p className="text-center opacity-80 hover:text-accent-1 hover:opacity-100">
              Designed by Chriswebdev
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}
