import Navbar from "./Navbar";
import NavbarSpacer from "./NavbarSpacer";
import ViewConnectedMember from "./ViewConnectedMember";
import ViewConnectedOnboarding from "./ViewConnectedOnboarding";

export default function ViewConnected() {
  const member = true;

  return (
    <div className="flex flex-col items-center gap-2 max-w-screen-sm">
      <Navbar />
      <NavbarSpacer />
      {member ? <ViewConnectedMember /> : <ViewConnectedOnboarding />}
    </div>
  );
}
