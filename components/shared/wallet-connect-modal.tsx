import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { useState } from "react";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { disconnect } = useWallet();
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleCancel = () => {
    if (isDisconnecting) return;
    onClose();
  };

  const handleConfirm = async () => {
    if (isDisconnecting) return;
    setIsDisconnecting(true);
    try {
      await disconnect();
    } finally {
      setIsDisconnecting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disconnect wallet</DialogTitle>
          <DialogDescription>
            Are you sure you want to disconnect your wallet? You can reconnect at any time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isDisconnecting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDisconnecting}>
            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
