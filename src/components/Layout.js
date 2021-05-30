import { Navbar, Nav } from 'react-bootstrap';

export default function Layout ({ children}) {
  return (
    <main>
      <Navbar bg='light'>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
        </Nav>
      </Navbar>
      {children}
    </main>
  );
}
