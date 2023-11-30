import Image from "next/image";

const Logo = () => {
    return ( 
        <Image 
            src='/logo.svg'
            alt="Logo"
            width={80}
            height={80}
        />
     );
}
 
export default Logo;