import { type FunctionComponent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export const MapSwitcher: FunctionComponent = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="absolute bottom-5 left-5 z-10 bg-white p-5">Map Switcher</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="absolute bottom-5 left-20 z-10">
          <Dialog.Title>title</Dialog.Title>
          <Dialog.Content>content</Dialog.Content>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
