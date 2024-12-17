import { useState } from 'react';
import { useSmartAccount } from '../../use-smart-account';
import { useToast } from '../../use-toast';

interface CancelOrderResponse {
  calldata: string;
  vaultAddress: string;
}

export function useCancelOrderActions() {
  const [cancellingOrders, setCancellingOrders] = useState<{ [key: string]: boolean }>({});
  const { smartAccount, kernelClient } = useSmartAccount();
  const { toast } = useToast();

  const cancelOrder = async (positionId: string) => {
    if (!kernelClient || !smartAccount?.address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setCancellingOrders(prev => ({ ...prev, [positionId]: true }));

      const response = await fetch('https://unidexv4-api-production.up.railway.app/api/position/cancel-pending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          positionId,
          userAddress: smartAccount.address,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get cancel order data');
      }

      const data: CancelOrderResponse = await response.json();

      await kernelClient.sendTransaction({
        to: data.vaultAddress,
        data: data.calldata,
      });

      toast({
        title: "Success",
        description: "Order cancelled successfully",
      });

    } catch (err) {
      console.error('Error cancelling order:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to cancel order",
        variant: "destructive",
      });
    } finally {
      setCancellingOrders(prev => ({ ...prev, [positionId]: false }));
    }
  };

  return {
    cancelOrder,
    cancellingOrders,
  };
}
