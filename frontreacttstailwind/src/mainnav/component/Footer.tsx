import MenuFooterLinkY from "./MenuFooterLinkY";
import MenuFooterScrollY from "./MenuFooterScrollY";



type tyPropsFooter = {
};

export default function Footer(props: tyPropsFooter) {
  return (
    <div className="footerbase">
      <div className="footerborder">
        <div className="footer">
          <MenuFooterScrollY />
          <MenuFooterLinkY />
        </div>
      </div> 
    </div> 
  )
};
