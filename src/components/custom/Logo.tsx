import logo from "@/assets/logo-light.svg"
import Link from "next/link"
import Image from "next/image"

const Logo = () => {
  return (
    <Link href="/">
        <Image src={logo} alt="logo" />
    </Link>
  )
}

export default Logo