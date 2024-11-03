
import { 
  MegaMenu, 
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from 'flowbite-react';

function NavigationBar() {
  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
        <NavbarBrand href="/">
          <img alt="" src="/vite.svg" className="mr-3 h-6 sm:h-9" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pao's Puzzles</span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <MegaMenuDropdown toggle={<>Board</>}>
            <ul className="grid grid-cols-2">
              <div className="space-y-4 p-4">
                <li>
                  <a href="/queens" className="hover:text-primary-600 dark:hover:text-primary-500">
                    Queens
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    
                  </a>
                </li>
              </div>
              <div className="space-y-4 p-4">
                <li>
                  <a href="/queens" className="hover:text-primary-600 dark:hover:text-primary-500">
                    
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    
                  </a>
                </li>
              </div>
            </ul>
          </MegaMenuDropdown>
          <MegaMenuDropdown toggle={<>Word</>}>
            <ul className="grid grid-cols-2">
              <div className="space-y-4 p-4">
                <li>
                  <a href="/wordle" className="hover:text-primary-600 dark:hover:text-primary-500">
                    Wordle
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    
                  </a>
                </li>
              </div>
              <div className="space-y-4 p-4">
                <li>
                  <a href="/queens" className="hover:text-primary-600 dark:hover:text-primary-500">
                    
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                    
                  </a>
                </li>
              </div>
            </ul>
          </MegaMenuDropdown>
        </NavbarCollapse>
      </div>
    </MegaMenu>
  );
}

export default NavigationBar