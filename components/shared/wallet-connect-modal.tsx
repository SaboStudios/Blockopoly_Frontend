import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { useEffect, useState } from "react";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { disconnect } = useWallet();
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear any previous error whenever the modal is (re)opened.
  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const handleCancel = () => {
    if (isDisconnecting) return;
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (isDisconnecting) return;
    setError(null);
    setIsDisconnecting(true);
    try {
      await disconnect();
      onClose();
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Failed to disconnect wallet. Please try again."
      );
    } finally {
      setIsDisconnecting(false);
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
        {error && (
          <p role="alert" aria-live="assertive" className="text-sm text-destructive">
            {error}
          </p>
        )}
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
