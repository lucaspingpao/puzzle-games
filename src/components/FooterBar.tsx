
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";

function FooterBar() {
    return (
        <Footer container>
        <div className="w-full text-center">
            <FooterCopyright href="#" by="Pao's Puzzles™" year={2024} />
        </div>
        </Footer>
    );
}

export default FooterBar