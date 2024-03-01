import Search from "@/components/Search";
import Nav from "@/components/Nav";
import { scaffoldType } from "@/types";

export default function Scaffold({
  children,
  removeSearch,
  activeIcon,
  activateSearch,
}: scaffoldType): React.JSX.Element {
  return (
    <div className="grid grid-rows-[7%_90%] lg:grid-cols-[7%_90%] gap-2">
      <div>
        <Nav activeIcon={activeIcon} />
      </div>
      <div>
        {!removeSearch && <Search onSearch={activateSearch} />}
        <div
          className={` ${
            !removeSearch ? "mt-16" : "mt-3 "
          } scrollable-container overflow-y-scroll h-[100vh] `}>
          {children}
        </div>
      </div>
    </div>
  );
}
