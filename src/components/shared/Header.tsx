import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';
import { Button } from "../ui/button";
import Link from "next/link";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { Menu, ChevronDown, Wallet } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuestionCircle, 
  faBook, 
  faComments, 
  faBug, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';
import { AccountSummary } from "../features/trading/account/AccountSummary";
import { getUsersnapApi } from "../../lib/usersnap";

export function Header() {
  return (
    <header className="flex items-center px-4 h-14">
      <div className="flex items-center space-x-4">
        <Link href="/" className="hover:opacity-80">
          {/* Desktop Logo */}
          <div className="hidden md:block">
            <Image
              src="/static/images/logo-large.png"
              alt="UniDex Logo"
              width={100}
              height={32}
              priority
            />
          </div>
          {/* Mobile Logo */}
          <div className="block md:hidden">
            <Image
              src="/static/images/logo-small.png"
              alt="UniDex Logo"
              width={32}
              height={32}
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="items-center hidden space-x-4 md:flex">
          <Link href="/">
            <Button variant="ghost">Trade</Button>
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="ghost" className="gap-1">
                Earn <ChevronDown size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Earn options"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
                title: "text-sm",
                description: "text-xs text-default-400"
              }}
            >
              <DropdownSection title="Earn with MOLTEN" showDivider>
                <DropdownItem
                  key="molten-staking"
                  description="Stake MOLTEN for rewards"
                  onClick={() => window.location.href = "/staking"}
                >
                  Stake MOLTEN
                </DropdownItem>
              </DropdownSection>
              
              <DropdownSection title="Earn with USD.m">
                <DropdownItem
                  key="mint-usdm"
                  description="Market make for traders and earn yield"
                  onClick={() => window.location.href = "/usdm"}
                >
                  Mint USD.m
                </DropdownItem>
                <DropdownItem
                  key="usdm-staking"
                  description="Stake USD.m for rewards"
                  onClick={() => window.location.href = "/usdm-staking"}
                >
                  Stake USD.m
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <Link href="/referrals">
            <Button variant="ghost">Referrals</Button>
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="ghost" className="gap-1">
                More <ChevronDown size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="More actions"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
                title: "text-sm",
                description: "text-xs text-default-400"
              }}
            >
              <DropdownItem
                key="help"
                description="Get help and support"
                startContent={<FontAwesomeIcon icon={faQuestionCircle} />}
                onClick={() => window.open("https://discord.gg/W2TByeuD7R", "_blank")}
              >
                Help & Support
              </DropdownItem>
              <DropdownItem
                key="documentation"
                description="Read the documentation"
                startContent={<FontAwesomeIcon icon={faBook} />}
                onClick={() => window.open("https://docs.unidex.exchange/introduction", "_blank")}
              >
                Documentation
              </DropdownItem>
              <DropdownItem
                key="feedback"
                description="Provide your feedback"
                startContent={<FontAwesomeIcon icon={faComments} />}
                onClick={() => {
                  const api = getUsersnapApi();
                  if (api) {
                    api.logEvent("feedback-button-clicked");
                  }
                }}
              >
                Give Feedback
              </DropdownItem>
              <DropdownItem
                key="bug-bounty"
                description="Participate in our bug bounty program"
                startContent={<FontAwesomeIcon icon={faBug} />}
                onClick={() => {
                  const api = getUsersnapApi();
                  if (api) {
                    api.logEvent("survey-button-clicked");
                  }
                }}
              >
                Bug Bounty
              </DropdownItem>
              <DropdownItem
                key="stats"
                description="View the latest stats"
                startContent={<FontAwesomeIcon icon={faChartLine} />}
                onClick={() => window.open("https://dune.com/supakawaiidesu/unidex-molten-stats", "_blank")}
              >
                Stats
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Mobile navigation"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
                title: "text-sm",
                description: "text-xs text-default-400"
              }}
            >
              <DropdownItem onClick={() => window.location.href = "/"}>
                Trade
              </DropdownItem>
              
              <DropdownSection title="Earn with MOLTEN" showDivider>
                <DropdownItem
                  key="molten-staking"
                  description="Stake MOLTEN for rewards"
                  onClick={() => window.location.href = "/staking"}
                >
                  Stake MOLTEN
                </DropdownItem>
              </DropdownSection>
              
              <DropdownSection title="Earn with USD.m">
                <DropdownItem
                  key="mint-usdm"
                  description="Market make for traders and earn yield"
                  onClick={() => window.location.href = "/usdm"}
                >
                  Mint USD.m
                </DropdownItem>
                <DropdownItem
                  key="usdm-staking"
                  description="Stake USD.m for rewards"
                  onClick={() => window.location.href = "/usdm-staking"}
                >
                  Stake USD.m
                </DropdownItem>
              </DropdownSection>
              <DropdownItem onClick={() => window.location.href = "/referrals"}>
                Referrals
              </DropdownItem>
              <DropdownItem
                key="help"
                description="Get help and support"
                onClick={() => window.open("https://discord.gg/W2TByeuD7R", "_blank")}
              >
                Help & Support
              </DropdownItem>
              <DropdownItem
                key="documentation"
                description="Read the documentation"
                onClick={() => window.open("https://docs.unidex.exchange/introduction", "_blank")}
              >
                Documentation
              </DropdownItem>
              <DropdownItem
                key="stats"
                description="View the latest stats"
                onClick={() => window.open("https://dune.com/supakawaiidesu/unidex-molten-stats", "_blank")}
              >
                Stats
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex items-center ml-auto space-x-2">
        <AccountSummary 
          buttonText="Deposit / Withdraw" 
          className="h-9"
        />
        
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <>
                        <Button 
                          onClick={openConnectModal} 
                          variant="outline"
                          className="hidden sm:inline-flex h-9 px-3 bg-[#1f1f29] hover:bg-[#1f1f29]/90 [&>*]:text-white [&>*]:font-normal [&>*]:!important"
                        >
                          Connect
                        </Button>
                        <Button 
                          onClick={openConnectModal} 
                          variant="outline"
                          size="icon"
                          className="sm:hidden h-9 w-9 bg-[#1f1f29] hover:bg-[#1f1f29]/90 [&>*]:text-white [&>*]:font-normal [&>*]:!important flex items-center justify-center"
                        >
                          <Wallet className="w-5 h-5 text-white" />
                        </Button>
                      </>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button 
                        onClick={openChainModal}
                        variant="destructive"
                        className="h-9 px-3 bg-[#1f1f29] hover:bg-[#1f1f29]/90 [&>*]:text-white [&>*]:font-normal [&>*]:!important"
                      >
                        Wrong Network
                      </Button>
                    );
                  }

                  return (
                    <div className="flex gap-2">
                      <Button
                        onClick={openAccountModal}
                        variant="outline"
                        className="hidden sm:inline-flex h-9 px-3 bg-[#1f1f29] hover:bg-[#1f1f29]/90 [&>*]:text-white [&>*]:font-normal [&>*]:!important"
                      >
                        {account.displayName}
                      </Button>
                      <Button
                        onClick={openAccountModal}
                        variant="outline"
                        size="icon"
                        className="sm:hidden h-9 w-9 bg-[#1f1f29] hover:bg-[#1f1f29]/90 [&>*]:text-white [&>*]:font-normal [&>*]:!important flex items-center justify-center"
                      >
                        <Wallet className="w-5 h-5 text-white" />
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}
