import Interaction from "./InteractionView";
import PhaserGame from "./PhaserGame";

export default function ViewConnectedMember() {
  return (
    <div className="flex flex-col items-center gap-2 max-w-screen-sm">
      <div className="h-16" />
      <div>
        <PhaserGame />
      </div>
      <div>
        <Interaction />
      </div>
    </div>
  );
}
