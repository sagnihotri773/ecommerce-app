import Link from 'next/link';

const CustomLink = ({ href, as, children, ...props }) => {
  return (
    <Link href={href} as={as} {...props}>
      {children} 
    </Link>
  );
};

export default CustomLink;
