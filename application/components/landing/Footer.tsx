import Container from '../shared/Container';
import Link from 'next/link';

interface Props {}

export const Footer: React.FC<Props> = ({}) => {
  return (
    <div className="mt-auto">
      <footer className="bg-alpha py-12 text-white ">
        <Container className="flex flex-col gap-12">
          <ul className="flex gap-6">
            <li className=" text-alpha-light-100 duration-150  hover:text-white">
              <Link href={'/terms-and-conditions'}>Terms & Conditions</Link>
            </li>
          </ul>
          <div className="flex flex-col justify-between md:flex-row">
            <p className="font-bold"> &copy; Reunitable {new Date().getFullYear()}</p>
            <div className="flex gap-2">
              <p>Designed and built by</p>

              <a className="font-bold underline " href="https://www.northlink.digital" target="_blank">
                Northlink Digital
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};
