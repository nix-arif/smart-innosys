"use client";

import {
  HandCoinsIcon,
  ShoppingCartIcon,
  LandmarkIcon,
  ChartLineIcon,
  ScrollTextIcon,
  Settings,
  ChevronDown,
  CircleDollarSignIcon,
  CaravanIcon,
  UsersRoundIcon,
  User2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { logout, setUserFromStorage } from "@/redux/features/user/userSlice";

// Menu items.
const operations = [
  {
    title: "Sale",
    url: "#",
    icon: CircleDollarSignIcon,
    submenu: [
      {
        title: "Cash Sale",
        url: "#",
      },
      {
        title: "Sale Invoice",
        url: "#",
      },
      {
        title: "Receipt",
        url: "#",
      },
      {
        title: "Delivery Order",
        url: "/dashboard/delivery-order",
      },
      {
        title: "Quotation",
        url: "/dashboard/quotation",
      },
      {
        title: "Proforma Invoice",
        url: "#",
      },
      {
        title: "Customer",
        url: "/dashboard/customer",
      },
      {
        title: "Credit Note",
        url: "#",
      },
    ],
  },
  {
    title: "Purchase",
    url: "#",
    icon: ShoppingCartIcon,
    submenu: [
      {
        title: "New Expense",
        url: "#",
      },
      {
        title: "Purchase Invoice",
        url: "#",
      },
      {
        title: "Payment Voucher",
        url: "#",
      },
      {
        title: "Goods Received",
        url: "#",
      },
      {
        title: "Purchase Order",
        url: "#",
      },
      {
        title: "Supplier",
        url: "#",
      },
      {
        title: "Debit Note",
        url: "#",
      },
    ],
  },
  {
    title: "Product",
    url: "#",
    icon: LandmarkIcon,
    submenu: [
      { title: "Product", url: "/dashboard/product" },
      { title: "Package", url: "#" },
      { title: "Inventory", url: "#" },
      { title: "Price", url: "/dashboard/product/price" },
      { title: "Cost", url: "#" },
    ],
  },
  {
    title: "Accounting",
    url: "#",
    icon: HandCoinsIcon,
    submenu: [
      { title: "Cash Book", url: "#" },
      { title: "Ledger Entry", url: "#" },
      { title: "Bank Reconciliantion", url: "#" },
      { title: "Overpayment", url: "#" },
      { title: "Cost of Sales", url: "#" },
    ],
  },
  {
    title: "Report",
    url: "#",
    icon: ChartLineIcon,
    submenu: [
      { title: "Profit & Loss", url: "#" },
      { title: "Trial Balance", url: "#" },
      { title: "Balance Sheet", url: "#" },
      { title: "General Ledger", url: "#" },
      { title: "Cash Book Statement", url: "#" },
      { title: "Aging Report", url: "#" },
      { title: "Stock Report", url: "#" },
      { title: "Bank Reconciliation", url: "#" },
      { title: "Sales Report", url: "#" },
      { title: "e-Filing & Zakat", url: "#" },
    ],
  },
  {
    title: "E-invoice",
    url: "#",
    icon: ScrollTextIcon,
    submenu: [
      { title: "Report", url: "#" },
      { title: "Self Billed Report", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    submenu: [
      { title: "General", url: "#" },
      { title: "User", url: "#" },
      { title: "Document", url: "#" },
      { title: "Product", url: "#" },
      { title: "Accounting", url: "#" },
    ],
  },
];

const humanResources = [
  {
    title: "Leave Management",
    url: "#",
    icon: CaravanIcon,
    submenu: [
      {
        title: "Application",
        url: "#",
      },
    ],
  },
  {
    title: "Payroll",
    url: "#",
    icon: UsersRoundIcon,
    submenu: [
      {
        title: "Payslip",
        url: "#",
      },
    ],
  },
];

export function AppSidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  const signout = async () => {
    await dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";

    if (username && email) {
      dispatch(setUserFromStorage({ username, email }));
    }
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Company</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Select Workspace
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem>
                      <span>Smart Innosys Sdn Bhd</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Affirma Sdn Bhd</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Bio Mech Supply Sdn Bhd</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operations.map((operation) => (
                <SidebarMenuItem key={operation.title}>
                  <Collapsible
                    open={openMenu === operation.title}
                    onOpenChange={() => toggleMenu(operation.title)}
                  >
                    <div className="flex items-center justify-between space-x-4 px-4">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full flex justify-between"
                        >
                          <h4 className="text-sm font-semibold flex items-center">
                            <operation.icon />
                            <div className="ml-4">{operation.title}</div>
                          </h4>
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    {operation.submenu?.map((menu) => (
                      <CollapsibleContent key={menu.title} className="px-4">
                        <Button
                          variant="ghost"
                          className="w-full relative h-7"
                          onClick={() => redirect(menu.url)}
                        >
                          <p className="absolute right-0 pr-4">{menu.title}</p>
                        </Button>
                      </CollapsibleContent>
                    ))}
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Human Resources</SidebarGroupLabel>
          <SidebarMenu>
            {" "}
            {humanResources.map((operation) => (
              <SidebarMenuItem key={operation.title}>
                <Collapsible
                  open={openMenu === operation.title}
                  onOpenChange={() => toggleMenu(operation.title)}
                >
                  <div className="flex items-center justify-between space-x-4 px-4">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full flex justify-between"
                      >
                        <h4 className="text-sm font-semibold flex items-center">
                          <operation.icon />
                          <div className="ml-4">{operation.title}</div>
                        </h4>
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  {operation.submenu?.map((menu) => (
                    <CollapsibleContent key={menu.title} className="px-4">
                      <Button
                        variant="ghost"
                        className="w-full relative h-7"
                        onClick={() => redirect(menu.url)}
                      >
                        <p className="absolute right-0 pr-4">{menu.title}</p>
                      </Button>
                    </CollapsibleContent>
                  ))}
                </Collapsible>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-popper-anchor-width)]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
