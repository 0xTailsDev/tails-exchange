import { Position } from "../../../../hooks/use-positions";
import { TriggerOrder } from "../../../../hooks/use-orders";
import { Button } from "../../../ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { usePrices } from "../../../../lib/websocket-price-context";
import { useState } from "react";
import { PositionDialog } from "./PositionDialog";

interface PositionsContentProps {
  positions: Position[];
  triggerOrders?: TriggerOrder[];
  loading: boolean;
  error: Error | null;
  closingPositions: { [key: number]: boolean };
  handleClosePosition: (position: Position) => void;
  setRef: (positionId: string) => (el: HTMLTableCellElement | null) => void;
  handleMouseEnter: (positionId: string) => void;
  setHoveredPosition: (positionId: string | null) => void;
}

export function PositionsContent({
  positions,
  triggerOrders = [],
  loading,
  error,
  closingPositions,
  handleClosePosition,
  setRef,
  handleMouseEnter,
  setHoveredPosition,
}: PositionsContentProps) {
  const { prices } = usePrices();
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calculateFinalPnl = (position: Position) => {
    const pnlWithoutFees = parseFloat(position.pnl.replace(/[^0-9.-]/g, ""));
    const totalFees =
      parseFloat(position.fees.positionFee) +
      parseFloat(position.fees.borrowFee) +
      parseFloat(position.fees.fundingFee);
    return (pnlWithoutFees - totalFees).toFixed(2);
  };

  const formatPnL = (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return numValue >= 0
      ? `$${numValue.toFixed(2)}`
      : `-$${Math.abs(numValue).toFixed(2)}`;
  };

  const calculatePnLPercentage = (pnl: number, margin: string) => {
    const marginValue = parseFloat(margin.replace(/[^0-9.-]/g, ""));
    return ((pnl / marginValue) * 100).toFixed(2);
  };

  const calculateLeverage = (size: string, margin: string) => {
    const sizeValue = parseFloat(size.replace(/[^0-9.-]/g, ""));
    const marginValue = parseFloat(margin.replace(/[^0-9.-]/g, ""));
    return (sizeValue / marginValue).toFixed(1);
  };

  const handleRowClick = (position: Position) => {
    setSelectedPosition(position);
    setIsDialogOpen(true);
  };

  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead>Pair</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Margin</TableHead>
          <TableHead>Entry Price</TableHead>
          <TableHead>Market/Liq. Price</TableHead>
          <TableHead>SL/TP</TableHead>
          <TableHead>uPnL</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              Loading positions...
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center text-red-500">
              {error.message}
            </TableCell>
          </TableRow>
        ) : positions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No open positions
            </TableCell>
          </TableRow>
        ) : (
          positions.map((position) => {
            const finalPnl = calculateFinalPnl(position);
            const pnlValue = parseFloat(finalPnl);
            const leverage = calculateLeverage(position.size, position.margin);
            const pnlPercentage = calculatePnLPercentage(pnlValue, position.margin);
            const basePair = position.market.split("/")[0].toLowerCase();
            const currentPrice = prices[basePair]?.price;
            const triggerOrder = triggerOrders.find(
              (order) => order.positionId === position.positionId
            );

            return (
              <TableRow 
                key={position.positionId}
                className="cursor-pointer hover:[background-color:#1f1f29]"
                onClick={() => handleRowClick(position)}
              >
                <TableCell>
                  <div>{position.market}</div>
                  <div className={position.isLong ? "text-green-500" : "text-red-500"}>
                    {leverage}x {position.isLong ? "Long" : "Short"}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{position.size}</div>
                  <div className="text-sm text-muted-foreground">
                    {(parseFloat(position.size) / parseFloat(position.entryPrice)).toFixed(6)} {basePair.toUpperCase()}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{position.margin}</div>
                </TableCell>
                <TableCell>
                  <div>{position.entryPrice}</div>
                </TableCell>
                <TableCell>
                  <div>{currentPrice?.toFixed(2) || "Loading..."}</div>
                  <div className="text-red-500">{position.liquidationPrice}</div>
                </TableCell>
                <TableCell>
                  <div className="text-red-500">
                    {triggerOrder?.stopLoss
                      ? `${triggerOrder.stopLoss.price} (${triggerOrder.stopLoss.size}%)`
                      : "-"}
                  </div>
                  <div className="text-green-500">
                    {triggerOrder?.takeProfit
                      ? `${triggerOrder.takeProfit.price} (${triggerOrder.takeProfit.size}%)`
                      : "-"}
                  </div>
                </TableCell>
                <TableCell
                  ref={setRef(position.positionId)}
                  className={pnlValue >= 0 ? "text-green-500" : "text-red-500"}
                  onMouseEnter={() => handleMouseEnter(position.positionId)}
                  onMouseLeave={() => setHoveredPosition(null)}
                >
                  <div>{formatPnL(finalPnl)}</div>
                  <div>{pnlPercentage}%</div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleClosePosition(position)}
                    disabled={closingPositions[Number(position.positionId)]}
                  >
                    {closingPositions[Number(position.positionId)]
                      ? "Closing..."
                      : "Close"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>

      <PositionDialog
        position={selectedPosition}
        triggerOrder={triggerOrders.find(
          (order) => order.positionId === selectedPosition?.positionId
        )}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedPosition(null);
        }}
        onClosePosition={handleClosePosition}
        isClosing={selectedPosition ? closingPositions[Number(selectedPosition.positionId)] : false}
      />
    </>
  );
}
