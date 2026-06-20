interface FooterProps {
  dark?: boolean
}

export default function Footer({ dark = false }: FooterProps) {
  return (
    <footer
      className="text-white py-4 px-8 text-center text-sm font-medium tracking-widest uppercase"
      style={{ backgroundColor: dark ? '#001830' : '#f97316' }}
    >
      <p>COPYRIGHT &copy; 2025 - Serra Junior Engenharia</p>
    </footer>
  )
}
