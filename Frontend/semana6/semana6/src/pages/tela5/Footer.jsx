function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001830] h-[60px] flex items-center justify-center">
      <p className="text-white text-base">
        COPYRIGHT © {currentYear} - SERRA JUNIOR ENGENHARIA
      </p>
    </footer>
  );
}

export default Footer;