import IconAd from "../../../icons/ic_ad";
import IconBuilding from "../../../icons/ic_building";
import IconHome from "../../../icons/ic_home";
import IconMoney from "../../../icons/ic_money";
import IconMonitor from "../../../icons/ic_monitor";
import IconPeoples from "../../../icons/ic_peopels";
import NavItem from "./nav_item";
import IconSeting from "../../../icons/ic_setting";

export default function AdminNav(props){
    return(
        <>
            <NavItem href="/admins/operators" title="اپراتورهای سیستم" active={props.pUrl == '/admins/operators' ? true : false}>
                <IconMonitor></IconMonitor>
            </NavItem>
            <NavItem href="/admins/ads" title="آگهی ها" active={props.pUrl == '/admins/ads' ? true : false}>
                <IconAd></IconAd>
            </NavItem>
            <NavItem href="/admins/agencies" title="دفاتر املاک" active={props.pUrl == '/admins/agencies' ? true : false}>
                <IconBuilding></IconBuilding>
            </NavItem>
            <NavItem href="/admins/advisors" title="مشاورین املاک" active={props.pUrl == '/admins/advisors' ? true : false}>
                <IconHome></IconHome>
            </NavItem>
            <NavItem href="/admins/mentors" title="منتور امین" active={props.pUrl == '/admins/mentors' ? true : false}>
                <IconPeoples></IconPeoples>
            </NavItem>
            <NavItem href="/admins/payments" title="دریافتی‌ها" active={props.pUrl == '/admins/payments' ? true : false}>
                <IconMoney></IconMoney>
            </NavItem>
            <NavItem href="/admins/setting" title="تنظیمات سایت" active={props.pUrl == '/admins/setting' ? true : false}>
                <IconSeting></IconSeting>
            </NavItem>
        </>
    )
}