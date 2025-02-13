import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessDialog = () => {
  const router = useRouter();
  return (
    <Dialog open>
      <DialogContent>
        <h2 className="text-green-600 text-lg font-bold">Payment Successful!</h2>
        <p>Your payment has been processed successfully.</p>
        <Button className="mt-4 w-full" onClick={() => router.push("/tracking")}>
          Go to Tracking
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
